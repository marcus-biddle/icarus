import React, { useEffect, useMemo, useState } from 'react'
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
    const today = new Date();
    const firstDayOfMonth = startOfMonth(today);
    const lastDayOfMonth = endOfMonth(today);

    const [data, setData] = useState([]);
    const [date, setDate] = useState<DateRange | undefined>({
        from: firstDayOfMonth,
        to: today,
    });

    const labels = generateDateLabels(date);

    const fetchData = async () => {
        const response = await userActions.getAllUserXpGains();
        setData(response);
      }
    
    const memoizedFetchData = useMemo(() => fetchData, [userActions.getAllUserXpGains]);

        useEffect(() => {
        memoizedFetchData();
        }, [memoizedFetchData])

  return (
    <TwoColumnGrid showSecondColumnInMobile={true}>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl capitalize mt-8">
            The <br /> <span className=' text-primary text-5xl'>Colosseum</span>
        </h1>
        <Separator className="my-6" />
        <div>
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
                    {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
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
                      const shouldSelect = areDatesLessThan30DaysApart(e);
                      if (shouldSelect) {
                        setDate(e)
                      }
                    }}
                    numberOfMonths={1}
                />
                </PopoverContent>
            </Popover>
        </div>
        <Carousel onChange={() => null} infiniteLoop showStatus={false} showThumbs={false} showArrows={false}>
                <GroupUserTotal date={date} data={data || []} labels={labels} />
                <GroupTable data={data || []} labels={labels} />
                {/* <GroupUserTotal /> */}
                {/* <div>
                Test 2
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    Test
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    Test
                    <p className="legend">Legend 4</p>
                </div>
                <div>
                    Test
                    <p className="legend">Legend 5</p>
                </div>
                <div>
                    Test
                    <p className="legend">Legend 6</p>
                </div> */}
            </Carousel>
    </TwoColumnGrid>
  )
}