import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, updateUserEventEntries } from '../features/user/userSlice';
import { RootState } from '../app/store';

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"
import { toast } from "sonner"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet"
import { useIsMobile } from '../hooks/useIsMobile';
import { FaPlus } from "react-icons/fa6";
import { FaSpinner } from 'react-icons/fa';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "../components/ui//table"
// import * as React from "react"
// import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, endOfMonth, format, startOfMonth } from "date-fns"
import { DateRange } from "react-day-picker"
 
import { cn } from "../lib/utils"
import { Calendar } from "../components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover"
import { IoCalendarOutline } from "react-icons/io5";
import { ExerciseSelection } from '../components/ExerciseSelection/ExerciseSelection';
import { startLoading } from '../features/loading/loadingSlice';


const isDateBetween = (startDate, endDate, targetDate) => {
  const startMillis = startDate.getTime();
  const endMillis = endDate.getTime();
  const targetMillis = targetDate.getTime();

  return targetMillis >= startMillis && targetMillis <= endMillis;
};

const Practice = () => {
    // const [inputValue, setInputValue] = useState<number | null>(null);
    // const [error, setError] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ open, setOpen ] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.currentUser);
    const userId = user?.id || '';
    const currentEventId = useSelector((state: RootState) => state.user.currentUser?.currentEventId) || '';

    const eventEntries = useSelector((state: RootState) => state.user.currentUser?.eventEntries) || [];
    
    // const graphs = useSelector((state: RootState) => state.user.currentUser?.graphs) || [];

    const today = new Date();
    const firstDayOfMonth = startOfMonth(today);
    const lastDayOfMonth = endOfMonth(today);

    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: firstDayOfMonth,
        to: lastDayOfMonth,
    });

    console.log(dateRange)

    const groupAndSumByDay = (data) => {
      const groupedData = {};
    
      data.forEach((item) => {
        if (item.event === currentEventId) {
          const date = new Date(item.time);
          const formattedDate = date.toDateString(); // Convert to "Sun Mar 31 2024" format
      
          if (dateRange && dateRange.from && isDateBetween(
            new Date(dateRange.from),
            new Date(dateRange.to || dateRange.from),
            new Date(formattedDate)
          )) {
            if (!groupedData[formattedDate]) {
              groupedData[formattedDate] = {
                reps: item.reps,
                xp: item.xp,
              };
            } else {
              groupedData[formattedDate].reps += item.reps;
              groupedData[formattedDate].xp += item.xp;
            }
          }
        }
      });
    
      return groupedData;
    };

    const groupedEntries = groupAndSumByDay(eventEntries);
    const sortedGroupedEntries = Object.entries(groupedEntries).map(([date, { reps, xp }]: any[]) => ({
      date,
      totalReps: reps,
      totalXP: xp,
    }));

    const totalXP = sortedGroupedEntries.reduce((acc, curr) => acc + curr.totalXP, 0).toFixed(0);
    const totalReps = sortedGroupedEntries.reduce((acc, curr) => acc + curr.totalReps, 0).toFixed(0);
    const highestTotalReps = sortedGroupedEntries.reduce((maxReps, { totalReps }) => (totalReps > maxReps ? totalReps : maxReps), 0).toFixed(0);
    console.log('eventEntries', sortedGroupedEntries)

    const formSchema = z.object({
      userCount: z.number().positive({
        message: "User count must be a number greater than 0",
      }),
    });
    
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        userCount: 1, // Set default value as a positive number greater than 0
      },
    });
    
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(startLoading());
    console.log(values)
      try {
        dispatch(
          updateUserEventEntries(values.userCount)
        )
    
        dispatch(
          updateUser({ userCount: values.userCount, eventId: currentEventId, userId: userId, username: user?.username })
        )

        
      } finally {
        setOpen(false);
        setIsLoading(false);
      }
      
      toast.success("", {
        description:`Successfully Updated! ${ new Date().toDateString()}`,
        classNames: {
          description: ''
        },
        style: {
          backgroundColor: '#1E4E38', // Custom green color
          color: '#000000 !important', // Black text color with !important
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)', // Shadow for depth
          textAlign: 'center', // Center the text
        },
      })
  }

  return (
    <>
      <ExerciseSelection />
      <div className=' border py-4 rounded-md bg-primary-foreground flex justify-evenly'>
          <div className=' text-left flex flex-col gap-2'>
            <p className=' text-muted-foreground'>Entries</p>
            <p className=' font-mono text-2xl font-bold text-foreground'>{sortedGroupedEntries.length}</p>
          </div>
          <div className='border border-ring border-r-1 h-[65px] mx-2' />
          <div className=' text-left flex flex-col gap-2'>
            <p className=' text-muted-foreground'>Count</p>
            <p className=' font-mono text-2xl font-bold text-foreground'>{totalReps}</p>
          </div>
          <div className='border border-ring border-r-1 h-[65px] mx-2' />
          <div className=' text-left flex flex-col gap-2'>
            <p className=' text-muted-foreground'>XP</p>
            <p className=' font-mono text-2xl font-bold text-foreground'>{totalXP}</p>
          </div>
          <div className='border border-ring border-r-1 h-[65px] mx-2' />
          <div className=' text-left flex flex-col gap-2'>
            <p className=' text-muted-foreground'>Best</p>
            <p className=' font-mono text-2xl font-bold text-foreground'>{highestTotalReps}</p>
          </div>
        </div>
      
      <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"default"} className=' w-full my-8'>
          <FaPlus className='h-full w-full' />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Entry</SheetTitle>
          <SheetDescription>
            Update your exercise count here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form className="space-y-8">
              <FormField
                control={form.control}
                name="userCount"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Update Exercise </FormLabel> */}
                    <FormControl>
                    <Input
                      {...field}
                      type="number" // Set input type to number
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10); // Parse input value as integer
                        field.onChange(value); // Update form field value
                      }}
                    />
                    </FormControl>
                    {/* <FormDescription>
                      Enter the total amount performed for this exercise.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <Button type="submit">Submit</Button> */}
            </form>
          </Form>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" disabled={isLoading} onClick={form.handleSubmit(onSubmit)}>
              {isLoading ? 
                (
                  <span className="flex items-center pl-3">
                      <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      <p>Updating...</p>
                  </span>
                )  
                : 'Save'}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    {/* <RecordTable /> */}
    <>
        <div className=" ">
        <p className="text-sm text-muted-foreground text-left mb-1 capitalize">Select a date or date Range:</p>
            <Popover>
                <PopoverTrigger asChild>
                <Button
                    id="date"
                    variant={"secondary"}
                    className={cn(
                    "w-full justify-start text-left font-normal mb-8 shadow-md",
                    !dateRange && "text-muted-foreground"
                    )}
                >
                    <IoCalendarOutline className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                    dateRange.to ? (
                        <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                        </>
                    ) : (
                        format(dateRange.from, "LLL dd, y")
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
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
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
                <TableHead className="text-right text-muted-foreground">XP</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sortedGroupedEntries.map((entry, index) => (
                <TableRow key={index}>
                    <TableCell className='text-left'>{entry.date}</TableCell>
                    <TableCell className="text-right">{entry.totalReps}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{entry.totalXP.toFixed(0)}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </>
    </>
  )
}

export default Practice