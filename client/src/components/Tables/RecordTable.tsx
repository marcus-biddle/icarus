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

  export function timestampToDateTime(timestamp) {
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
    const eventEntries = useSelector((state: RootState) => state.user.currentUser?.eventEntries) || [];

    const today = new Date();
    const firstDayOfMonth = startOfMonth(today);
    const lastDayOfMonth = endOfMonth(today);

    const [date, setDate] = useState<DateRange | undefined>({
        from: firstDayOfMonth,
        to: lastDayOfMonth,
    });

    

    const entriesByDateSelected = eventEntries.filter(entry => {
        const entryDate = new Date(entry.time);
        if (entry.event === currentEventId) {
            return entryDate >= (date?.from || today) && entryDate <= (date?.to || today);
        }
    })
    console.log(date, entriesByDateSelected )
    const totals = sumXpAndReps(entriesByDateSelected);

  return (
    <>
        <div className=" ">
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
                    numberOfMonths={1}
                />
                </PopoverContent>
            </Popover>
        </div>
        <Table className=' bg-primary-foreground rounded-lg shadow-sm'>
            {/* <TableCaption>A list of your recent records.</TableCaption> */}
            <TableHeader className=''>
                <TableRow>
                <TableHead className='text-left'>Entry</TableHead>
                <TableHead className="text-right">Count</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {entriesByDateSelected.sort((a:any, b: any) => b.time - a.time).map((entry, index) => (
                <TableRow key={index}>
                    {/* <TableCell className="font-medium"></TableCell> */}
                    <TableCell className='text-left'>{timestampToDateTime(entry.time)}</TableCell>
                    <TableCell className="text-right">{entry.reps}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </>
  )
}

export default RecordTable