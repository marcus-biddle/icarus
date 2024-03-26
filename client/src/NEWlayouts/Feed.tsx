import React, { useCallback, useEffect, useState } from 'react';
import { logActions } from '../api/logs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { convertToLocalTime, formatTimestamp } from '../helpers/date';
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import { Skeleton } from "../components/ui/skeleton"
import { startLoading, stopLoading } from '../features/loading/loadingSlice';
import { Loader } from '../components/Loader/Loader';
import { Show } from '../helpers/functional';
import { SlArrowRight } from "react-icons/sl";

interface Log {
  _id: string;
  action: string;
  amount: number;
  event: string;
  username: string;
  rank: number;
  timestamp: number;
  __v: number;
}

interface GroupedLogs {
  [key: string]: Log[];
}

const isToday = (someDate: Date) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

const isYesterday = (someDate: Date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    someDate.getDate() === yesterday.getDate() &&
    someDate.getMonth() === yesterday.getMonth() &&
    someDate.getFullYear() === yesterday.getFullYear()
  );
};

function groupLogsByDay(logs: Log[]): GroupedLogs {
  const grouped: GroupedLogs = {};

  logs.forEach((log) => {
    const date = new Date(log.timestamp);
    const dateString = isToday(date) ? 'Today' : isYesterday(date) ? 'Yesterday' : `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

    if (!grouped[dateString]) {
      grouped[dateString] = [];
    }

    grouped[dateString].push(log);
  });

  return grouped;
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const Feed = () => {
    const [ feedData, setFeedData ] = useState<GroupedLogs | null>(null);
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.loading.loading);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [ refreshData, setRefreshData ] = useState<boolean>(false);
    const skeletons = Array.from({ length: 10 }, (_, index) => index);

    const handleRefresh = () => {
      // Disable the button
      setRefreshData(true);
      setIsVisible(false);
      setFeedData(null);
      fetchData();

      // Enable the button after 5 seconds
      setTimeout(() => {
          setRefreshData(false);
      }, 3000); 
  };

  const fetchData = useCallback(async () => {
    dispatch(startLoading());
    try {
      const res = await logActions.getLogs();
      setFeedData(groupLogsByDay(res));
    } catch (error) {
      // Handle any errors here
      console.error('Error fetching data:', error);
    } finally {
      dispatch(stopLoading());
    }
  }, [logActions, dispatch, setFeedData]);

    useEffect(() => {
      fetchData();
    }, []);

    useEffect(() => {
      if (feedData !== null) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 100); // Adjust the delay as needed
    
        // Clean up the timer to avoid memory leaks
        return () => clearTimeout(timer);
      }

    }, [feedData])

    console.log('feedData', feedData)

  return (
    <>
    <Show when={loading}>
      {/* <Loader /> */}
      <div className='w-full flex justify-end mt-2 mb-8'>
        <Skeleton className="h-10 w-16 rounded-lg" />
      </div>
      
      <div className=' flex flex-col gap-8'>
        {skeletons.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
          </div>
        ))}
      </div>
      
      
      
    </Show>
    <Show when={feedData !== null && Object.keys(feedData).length !== 0 && !loading}>
      <div className=' w-full text-right mb-2'>
        <Button disabled={refreshData} variant={"ghost"} onClick={() => handleRefresh()} className=' uppercase text-ring tracking-wide'>Refresh</Button>
      </div>
      {feedData && Object.entries(feedData).map(([date, logsInDay]) => (
        <div key={date}>
          <div className=' relative my-6'>
            <h4 className=" min-w-24 text-md text-left font-medium  leading-none absolute bottom-[-8px] left-0 bg-background">{date}</h4>
            <Separator />
          </div>
          
          <ul className={`transform transition-transform duration-200 ${isVisible ? 'scale-100' : 'scale-0'}`}>
            {logsInDay.map((log, index) => (
                <li className='border bg-secondary my-4 rounded-lg flex' key={log._id}>
                  <div className=' min-w-[25%] bg-primary-foreground rounded-tl-lg rounded-bl-lg flex flex-col items-center text-center justify-center'>
                    <p className=' text-3xl font-mono font-extrabold'>{log.amount}</p>
                    <p className=' text-muted-foreground'>{log.event === 'running' ? 'miles' : 'reps'}</p>
                  </div>
                  <div className='w-full flex flex-col h-full ml-4'>
                      <div className=' flex justify-between h-full'>
                          <div className=' text-left h-full'>
                              <h4 className="scroll-m-20 text-2xl text-primary font-semibold font-mono tracking-tight">{log.username}</h4> 
                              <span className='text-md text-muted-foreground capitalize italic'>Event: {log.event}</span>
                            <p className="text-sm text-muted-foreground font-mono">{convertToLocalTime(log.timestamp)}</p>
                          </div>
                          <div className=' min-w-[20%] border border-l-primary-foreground my-2 flex justify-center items-center'>
                              <SlArrowRight className=' text-muted-foreground h-6 w-6' />
                          </div>
                      </div>
                  </div>
                </li>
            ))}
          </ul>
        </div>
      ))}
    </Show>
      
    </>
  )
}