import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../components/ui//table"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
// import * as React from "react"
// import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, endOfMonth, format, startOfMonth } from "date-fns"
import { DateRange } from "react-day-picker"
 
import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import { Calendar } from "../../components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"
import { IoCalendarOutline } from "react-icons/io5";

  function timestampToDateTime(timestamp) {
    // Create a new Date object with the provided timestamp (in milliseconds)
    const date = new Date(timestamp);
  
    // Extract the date components
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
  
    // Extract the time components
    const hours = ('0' + date.getHours()).slice(-2); // Add leading zero if needed
    const minutes = ('0' + date.getMinutes()).slice(-2); // Add leading zero if needed
    const seconds = ('0' + date.getSeconds()).slice(-2); // Add leading zero if needed
  
    // Construct the date and time string
    const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return dateTimeString;
  }

  function sumXpAndReps(entries) {
    // Initialize variables to store the total sums
    let totalXp = 0;
    let totalReps = 0;
  
    // Iterate through each entry in the array
    entries.forEach(entry => {
      // Add the xp and reps of the current entry to the total sums
      totalXp += entry.xp;
      totalReps += entry.reps;
    });
  
    // Return an object containing the total sums
    return { totalXp, totalReps };
  }

const RecordTable = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.currentUser);
    const userId = user?.id || '';
    const currentEventId = useSelector((state: RootState) => state.user.currentUser?.currentEventId) || '';
    const xpGains = useSelector((state: RootState) => state.user.currentUser?.xpGains) || [];

    const today = new Date();
    const firstDayOfMonth = startOfMonth(today);
    const lastDayOfMonth = endOfMonth(today);

    const [date, setDate] = useState<DateRange | undefined>({
        from: firstDayOfMonth,
        to: lastDayOfMonth,
    });

    

    const entriesByDateSelected = xpGains.filter(entry => {
        const entryDate = new Date(entry.time);
        if (entry.event === currentEventId) {
            return entryDate >= (date?.from || today) && entryDate <= (date?.to || today);
        }
    })
    console.log(date, entriesByDateSelected )
    const totals = sumXpAndReps(entriesByDateSelected);

  return (
    <div>
        <div className=" my-10">
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
                    <IoCalendarOutline className="mr-2 h-4 w-4" />
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
                    onSelect={setDate}
                    numberOfMonths={2}
                />
                </PopoverContent>
            </Popover>
        </div>
        <Table>
            {/* <TableCaption>A list of your recent records.</TableCaption> */}
            <TableHeader>
                <TableRow>
                <TableHead className="w-[0]"></TableHead>
                <TableHead className='text-center'>Day</TableHead>
                <TableHead className='text-center'>Reward</TableHead>
                <TableHead className="text-right">Count</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {entriesByDateSelected.sort((a:any, b: any) => b.time - a.time).map((entry, index) => (
                <TableRow key={index}>
                    <TableCell className="font-medium"></TableCell>
                    <TableCell>{timestampToDateTime(entry.time)}</TableCell>
                    <TableCell>{entry.xp}</TableCell>
                    <TableCell className="text-right">{entry.reps}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                <TableCell colSpan={1} className=' max-w-10'>Total</TableCell>
                <TableCell className="text-center">{entriesByDateSelected.length} Days</TableCell>
                <TableCell className="text-center min-w-[100px]">{totals.totalXp} XP</TableCell>
                <TableCell className="text-right min-w-[100px]">{totals.totalReps} Reps</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    </div>
  )
}

export default RecordTable