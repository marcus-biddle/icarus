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
import { ExerciseSelection } from '../components/ExerciseSelection/ExerciseSelection';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { NavLink } from 'react-router-dom';

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
  const [page, setPage] = useState<'graph' | 'table' | 'winners' | 'leaderboard'>('leaderboard')
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

    console.log('stats', stats)
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

    console.log('leaderboardData', leaderboardData);

  return (
    <>
      <ExerciseSelection />
      <Select onValueChange={(e) => setPage(e)}>
        <SelectTrigger className="w-full mb-16 shadow-lg text-lg text-popever">
          <SelectValue placeholder="Leaderboard" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Directory</SelectLabel>
            <SelectItem value="leaderboard">Leaderboard</SelectItem>
            <SelectItem value="graph">Graph</SelectItem>
            <SelectItem value="winners">Past Winners</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* {page !== null && <div className=' mb-6'>
        <Button onClick={() => setPage(null)} variant="secondary" className=' items-center text-center content-center flex'>
          <GoChevronLeft className="h-5 w-5" />
          <p className=' text-md'>Go Back</p>
        </Button>
      </div>} */}
      {(page === 'table' || page === 'graph') && 
      <>
      <p className="text-sm text-muted-foreground text-left mb-1 capitalize">Select a date or date Range:</p>
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    id="date"
                    variant={"secondary"}
                    className={cn(
                    "w-full justify-start text-left font-normal mb-8 shadow-md",
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
            <PopoverContent className="w-full p-0" align="start">
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
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{getCurrentMonth()} {getCurrentYear()}</h2>
        <div className='my-4 flex flex-col gap-4'>
          {leaderboardData.filter(leaderboard => leaderboard.eventId === currentEventId).map((entry, index) => (
            <div className={`border py-2 px-4 rounded-lg w-full bg-secondary transform transition-transform duration-500 `} key={entry.userId.username}>
              <NavLink to={`/user/${entry.userId.id}`}>
                <div className=' text-left pl-4 w-full flex flex-col justify-around'>
                    <div className='flex justify-between items-center'>
                        <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight"><span className=' text-primary pr-2'>#{entry.rank}</span> {entry.userId.username}</h4>
                        <p className="text-lg font-semibold font-mono">{entry.eventCount}</p>
                    </div>
                </div>
              </NavLink>
              
            </div>
          ))}
        </div>
        
      </Show>
    </>
  )
}