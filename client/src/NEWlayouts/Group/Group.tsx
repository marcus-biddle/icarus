import React, { useEffect, useMemo, useState } from 'react'
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import TwoColumnGrid from '../../components/Grid/TwoColumnGrid'
import { Separator } from '../../components/ui/separator'
import { Carousel } from 'react-responsive-carousel'
import { GroupUserTotal } from '../../components/Charts/GroupUserTotals'
import { addDays, addMonths, endOfMonth, format, parse, startOfMonth } from "date-fns"
import { DateRange } from "react-day-picker"
 
import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import { Calendar } from "../../components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"
import { userActions } from '../../api/users'
import GroupTable from '../../components/Tables/GroupTable'
import { DynamicIcon } from '../../components/Icons/DynamicIcon';
import { Show } from '../../helpers/functional';
import { leaderboardActions } from '../../api/leaderboard';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { getCurrentMonth, getCurrentYear } from '../../helpers/date';

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
    const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
    const currentEventId = useSelector((state: RootState) => state.user.currentUser?.currentEventId)
    const [date, setDate] = useState<DateRange | undefined>({
        from: firstDayOfMonth,
        to: today,
    });

    console.log(page)
    const labels = generateDateLabels(date);

    const fetchData = async () => {
        const response = await userActions.getAllUserXpGains();
        const leaderboardRes = await leaderboardActions.getMonthlyLeaderboard();
        setData(response);
        setLeaderboardData(leaderboardRes);
      }
    
    const memoizedFetchData = useMemo(() => fetchData, [userActions.getAllUserXpGains]);

        useEffect(() => {
        memoizedFetchData();
        }, [memoizedFetchData])

        console.log(leaderboardData);

  return (
    <>
        {/* <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tightcapitalize my-8 text-left bg-foreground text-primary rounded-sm">
            Group
        </h1> */}
        {/* <Separator className="my-6" /> */}
        {/* <div>
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
        </div> */}
        {/* <Carousel onChange={() => null} infiniteLoop showStatus={false} showThumbs={false} showArrows={false}>
                <GroupUserTotal date={date} data={data || []} labels={labels} />
                <GroupTable data={data || []} labels={labels} />
            </Carousel> */}
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
        <>
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-left mb-6">Your Position This Month</h2>
          <div className="grid grid-cols-2 gap-4 font-mono">
            <div className=' text-left'>
              <p className=' text-muted-foreground'>Rank</p>
              <p className=' font-mono text-xl font-bold'>4</p>
            </div>
            <div className=' text-left'>
              <p className=' text-muted-foreground'>Total Count</p>
              <p className=' font-mono text-xl font-bold'>1000</p>
            </div>
            <div className=' text-left'>
              <p className=' text-muted-foreground'>Active Days</p>
              <p className=' font-mono text-xl font-bold'>15</p>
            </div>
            <div className=' text-left'>
              <p className=' text-muted-foreground'>Active / Inactive Ratio</p>
              <p className=' font-mono text-xl font-bold'>50%</p>
            </div>
          </div>
        </>
        <div className=' flex flex-col gap-4 my-8'>
          <button onClick={() => setPage('leaderboard')} className=' border rounded-sm flex justify-between px-4 py-4 text-foreground bg-background shadow-lg items-center'>
            <p>View Leaderboard</p>
            <GoChevronRight className=' h-5 w-5' />
          </button>
          <button onClick={() => setPage('graph')} className=' border rounded-sm flex justify-between px-4 py-4 text-foreground bg-background shadow-lg items-center'>
            <p>View Group Graph</p>
            <GoChevronRight className=' h-5 w-5' />
          </button>
          <button onClick={() => setPage('table')} className=' border rounded-sm flex justify-between px-4 py-4 text-foreground bg-background shadow-lg items-center'>
            <p>View Group Table</p>
            <GoChevronRight className=' h-5 w-5' />
          </button>
          <button onClick={() => setPage('winners')} className=' border rounded-sm flex justify-between px-4 py-4 text-foreground bg-background shadow-lg items-center'>
            <p>Past Winners</p>
            <GoChevronRight className=' h-5 w-5' />
          </button>
        </div>
      </Show>
      <Show when={page === 'graph'}>
        <GroupUserTotal date={date} data={data || []} labels={labels} />
      </Show>
      <Show when={page === 'table'}>
        <GroupTable data={data || []} labels={labels} />
      </Show>
      <Show when={page === 'winners'}>
        No data available.
      </Show>
      <Show when={page === 'leaderboard'}>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{getCurrentMonth()} {getCurrentYear()} Leaderboard</h2>
      <div className='my-4'>
        {leaderboardData.filter(leaderboard => leaderboard.eventId === currentEventId).map((entry, index) => (
          <div className=' flex gap-2'>
            <div className=' min-w-28 min-h-28 bg-card rounded-md relative border flex justify-center text-center items-center'>
                {entry.userId.username[0].toUpperCase()}
                {/* <div className='bg-primary w-14 h-14 absolute right-0 bottom-0 rounded-tl-full text-right flex flex-col align-bottom pt-2 pr-1'>
                    <p className='text-white text-sm'>Rank</p>
                    <p className=' font-mono text-lg '>4</p>
                </div> */}
            </div>
            <div className=' text-left pl-4 w-full flex flex-col justify-around'>
                <div>
                    <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight"><span className=' text-primary pr-2'>#{index + 1}</span> {entry.userId.username}</h4>
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