import React, { useEffect, useMemo, useState } from 'react'
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import TwoColumnGrid from '../components/Grid/TwoColumnGrid'
import { Separator } from '../components/ui/separator'
import { Carousel } from 'react-responsive-carousel'
import { GroupUserTotal } from '../components/Charts/GroupUserTotals'
import { addDays, addMonths, endOfMonth, format, parse, startOfMonth } from "date-fns"
import { DateRange } from "react-day-picker"
 
import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import { Calendar } from "../components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover"
import { userActions } from '../api/users'
import GroupTable from '../components/Tables/GroupTable'
import { DynamicIcon } from '../components/Icons/DynamicIcon';
import { Show } from '../helpers/functional';
import { leaderboardActions } from '../api/leaderboard';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { getCurrentMonth, getCurrentYear } from '../helpers/date';

function areDatesLessThan30DaysApart(dates) {
    // Calculate the difference in milliseconds between the two dates
    const differenceInMs = Math.abs(dates.to - dates.from);
  
    // Convert milliseconds to days
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
  
    // Check if the difference is more than 30 days
    return differenceInDays <= 31;
  }

  function formatDateToString(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  function generateDateLabels(dates) {
    const dateArray: string[] = [];
    const currentDate = new Date(dates.from);
  
    // Iterate over the range of dates and add each date to the array
    while (currentDate <= dates.to) {
      dateArray.push(formatDateToString(new Date(currentDate)));
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
  
    return dateArray;
  }

export const Group = () => {
  const [page, setPage] = useState<null | 'graph' | 'table' | 'winners' | 'leaderboard'>(null)
    const today = new Date();
    const firstDayOfMonth = startOfMonth(today);
    const lastDayOfMonth = endOfMonth(today);

    const [data, setData] = useState([]);
    const [userPosition, setUserPosition] = useState<any>({});
    const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
    const currentEventId = useSelector((state: RootState) => state.user.currentUser?.currentEventId);
    const stats = useSelector((state: RootState) => state.user.currentUser?.statistics);
    const username = useSelector((state: RootState) => state.user.currentUser?.username);
    const [date, setDate] = useState<DateRange | undefined>({
        from: firstDayOfMonth,
        to: today,
    });

    console.log(stats)
    const labels = generateDateLabels(date);

    const fetchData = async () => {
      // needs a better name
        const response = await userActions.getAllUserXpGains();
        const leaderboardRes = await leaderboardActions.getMonthlyLeaderboard();
        console.log(response);
        setData(response);
        setLeaderboardData(leaderboardRes);

        const user = leaderboardRes.find(entry => entry.userId.username === username && entry.eventId === currentEventId);
        console.log(user);
        setUserPosition(user);
      }
    
    const memoizedFetchData = useMemo(() => fetchData, [userActions.getAllUserXpGains, leaderboardActions.getMonthlyLeaderboard, currentEventId]);

    useEffect(() => {
      memoizedFetchData();
    }, [memoizedFetchData])

    console.log(leaderboardData);

  return (
    <>
      {page !== null && <div className=' mb-6'>
        <Button onClick={() => setPage(null)} variant="secondary" className=' items-center text-center content-center flex'>
          <GoChevronLeft className="h-5 w-5" />
          <p className=' text-md'>Go Back</p>
        </Button>
      </div>}
      {(page === 'table' || page === 'graph') && 
      <>
        <Popover>
            <PopoverTrigger asChild>
            <Button
                id="date"
                variant={"outline"}
                className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
                )}
            >
                {date?.from ? (
                date.to ? (
                    <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                    </>
                ) : (
                    format(date.from, "LLL dd, y")
                )
                ) : (
                <span>Pick a date</span>
                )}
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
            <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(e) => {
                  
                  if (!e?.to) {
                    setDate({
                      from: e?.from,
                      to: e?.from
                    })
                  }
                  if (!date?.to || !date.from || date === e || !e) {
                    setDate({
                      from: date?.from,
                      to: date?.from
                    })
                  } else {
                    const shouldSelect = areDatesLessThan30DaysApart(e);
                    if (shouldSelect) {
                      setDate(e)
                    }
                  }
                }}
                numberOfMonths={1}
            />
            </PopoverContent>
        </Popover>
      </>}
      <Show when={page === null}>
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-left mb-6">Your Month Recap</h2>
        <div className=' border py-6 rounded-md bg-primary-foreground flex justify-evenly'>
          <div className=' text-left flex flex-col gap-2'>
            <p className=' text-muted-foreground'>Rank</p>
            <p className=' font-mono text-3xl font-bold text-foreground'>{userPosition && userPosition.rank ? userPosition.rank : '-'}</p>
          </div>
          <div className='border border-ring border-r-1 h-[65px]' />
          <div className=' text-left flex flex-col gap-2'>
            <p className=' text-muted-foreground'>Total Count</p>
            <p className=' font-mono text-3xl font-bold text-foreground'>{userPosition && userPosition.eventCount ? userPosition.eventCount : '-'}</p>
          </div>
          <div className='border border-ring border-r-1 h-[65px]' />
          <div className=' text-left flex flex-col gap-2'>
            <p className=' text-muted-foreground'>Streak</p>
            <p className=' font-mono text-3xl font-bold text-foreground'>{stats?.filter(stat => stat.eventId === currentEventId)[0].currentStreak}</p>
          </div>
          <div className='border border-ring border-r-1 h-[65px]' />
          <div className=' text-left flex flex-col gap-2'>
            <p className=' text-muted-foreground'>Personal Best</p>
            <p className=' font-mono text-3xl font-bold text-foreground'>{stats?.filter(stat => stat.eventId === currentEventId)[0].personalBest}</p>
          </div>
        </div>
        {/* <>
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-left mb-6">Your Position This Month</h2>
          <div className="grid grid-cols-2 gap-4 font-mono p-4">
            <div className=' text-left'>
              <p className=' text-muted-foreground'>Rank</p>
              <p className=' font-mono text-xl font-bold'>{userPosition && userPosition.rank ? userPosition.rank : '-'}</p>
            </div>
            <div className=' text-left'>
              <p className=' text-muted-foreground'>Total Count</p>
              <p className=' font-mono text-xl font-bold'>{userPosition && userPosition.eventCount ? userPosition.eventCount : '-'}</p>
            </div>
            <div className=' text-left'>
              <p className=' text-muted-foreground'>Streak</p>
              <p className=' font-mono text-xl font-bold'>{stats?.filter(stat => stat.eventId === currentEventId)[0].currentStreak}</p>
            </div>
            <div className=' text-left'>
              <p className=' text-muted-foreground'>Personal Best</p>
              <p className=' font-mono text-xl font-bold'>{stats?.filter(stat => stat.eventId === currentEventId)[0].personalBest}</p>
            </div>
          </div>
        </> */}
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-left mt-6">Group Statistics</h3>
        <div className=' flex flex-col gap-6 my-8'>
          <Button variant={"default"} className={`flex justify-between py-6 bg-primary-foreground text-primary border shadow-md ${page === 'leaderboard' ? 'border-ring' : ''}`} onClick={() => setPage('leaderboard')} >
            <p>Leaderboard</p>
            <GoChevronRight className=' h-5 w-5' />
          </Button>
          <Button variant={"default"} className={`flex justify-between py-6 bg-primary-foreground text-primary border shadow-md ${page === 'graph' ? 'border-ring' : ''}`} onClick={() => setPage('graph')}>
            <p>Group Graph</p>
            <GoChevronRight className=' h-5 w-5' />
          </Button>
          <Button variant={"default"} className={`flex justify-between py-6 bg-primary-foreground text-primary border shadow-md ${page === 'table' ? 'border-ring' : ''}`} onClick={() => setPage('table')} >
            <p>Group Table</p>
            <GoChevronRight className=' h-5 w-5' />
          </Button>
          <Button variant={"default"} className={`flex justify-between py-6 bg-primary-foreground text-primary border shadow-md ${page === 'winners' ? 'border-ring' : ''}`} onClick={() => setPage('winners')} >
            <p>Winners</p>
            <GoChevronRight className=' h-5 w-5' />
          </Button>
        </div>
      </Show>
      <Show when={page === 'graph'}>
        <GroupUserTotal date={date} data={data || []} labels={labels} />
      </Show>
      <Show when={page === 'table'}>
        <GroupTable data={data || []} labels={labels} />
      </Show>
      <Show when={page === 'winners'}>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Past Winners</h2>
      <div className=' my-[50%]'>
        No data available.
      </div>
      </Show>
      <Show when={page === 'leaderboard'}>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{getCurrentMonth()} {getCurrentYear()} Leaderboard</h2>
        <div className='my-4 flex flex-col gap-4'>
          {leaderboardData.filter(leaderboard => leaderboard.eventId === currentEventId).map((entry, index) => (
            <div className=' flex gap-2' key={entry.userId.username}>
              <div className=' min-w-28 min-h-28 bg-card rounded-md relative border flex justify-center text-center items-center text-2xl'>
                  {entry.userId.username[0].toUpperCase()}
                  {/* <div className='bg-primary w-14 h-14 absolute right-0 bottom-0 rounded-tl-full text-right flex flex-col align-bottom pt-2 pr-1'>
                      <p className='text-white text-sm'>Rank</p>
                      <p className=' font-mono text-lg '>4</p>
                  </div> */}
              </div>
              <div className=' text-left pl-4 w-full flex flex-col justify-around'>
                  <div>
                      <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight"><span className=' text-primary pr-2'>#{entry.rank}</span> {entry.userId.username}</h4>
                      <p className="text-sm text-muted-foreground">Total {entry.eventId} completed: {entry.eventCount}</p>
                  </div>
                  <div className='flex justify-between text-lg font-semibold'>
                      {/* <div className=' text-green-600'>{log.action.toUpperCase()}</div> */}
                      {/* <div>{log.amount} reps</div> */}
                  </div>
              </div>
            </div>
          ))}
        </div>
        
      </Show>
    </>
  )
}