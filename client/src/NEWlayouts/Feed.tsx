import React, { useEffect, useRef, useState } from 'react';
import { logActions } from '../api/logs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { convertToLocalTime, formatTimestamp } from '../helpers/date';
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"

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

export const Feed = () => {
    const [ feedData, setFeedData ] = useState<GroupedLogs | null>(null);
    const currentEventId = useSelector((state: RootState) => state.user.currentUser?.currentEventId);
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.loading.loading);
    const containerRef = useRef<HTMLDivElement>(null);
    // const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [ refreshData, setRefreshData ] = useState<boolean>(false);

    const handleRefresh = () => {
      // Disable the button
      setRefreshData(true);
      setIsVisible(false);
      setFeedData(null);
      fetchData();

      // Enable the button after 5 seconds
      setTimeout(() => {
          setRefreshData(false);
      }, 3000); // 5 seconds in milliseconds
  };

  // need to move the function to add eventId filtering
    const fetchData = async () => {
        const res = await logActions.getLogs();
        setFeedData(groupLogsByDay(res));
    }

    useEffect(() => {
      fetchData();
    }, []);

    // useLoader(fetchData);

    //   if (loading) {
    //     return <Loader />
    // }

    useEffect(() => {
      if (feedData !== null) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 100); // Adjust the delay as needed
    
        // Clean up the timer to avoid memory leaks
        return () => clearTimeout(timer);
      }

    }, [feedData])

    console.log('isVisible', isVisible, feedData)
    

  return (
    <>
      <div className=' w-full text-right mb-2'>
        <Button disabled={refreshData} variant={"ghost"} onClick={() => handleRefresh()} className=' uppercase text-ring tracking-wide'>Refresh</Button>
      </div>
      {feedData && Object.entries(feedData).map(([date, logsInDay]) => (
        <div key={date}>
          <div className=' relative'>
            <h4 className=" min-w-24 text-md font-medium  leading-none absolute bottom-[-8px] lef-0 bg-background">{date}</h4>
            <Separator />
          </div>
          
          <ul className={`border p-4 my-6 rounded-lg w-full bg-primary-foreground transform transition-transform duration-200 ${isVisible ? 'scale-100' : 'scale-0'}`}>
            {logsInDay.map((log, index) => (
                <li className={`border p-4 my-6 rounded-lg w-full bg-background transform transition-transform duration-500 ${isVisible ? 'scale-100' : 'scale-0'}`} key={log._id}>
                  <div className='w-full flex flex-col'>
                      <div className=' flex justify-between'>
                          <div className=' text-left'>
                              <h4 className="scroll-m-20 text-2xl text-primary font-semibold font-mono tracking-tight">{log.username}</h4>
                              <p className="text-sm text-muted-foreground font-mono">{convertToLocalTime(log.timestamp)}</p>
                          </div>
                          <div className=''>
                              <div className=' text-green-600 font-mono'>{log.action.toUpperCase()}</div>
                              <div className='font-mono'>{log.amount} reps</div>
                          </div>
                      </div>
                  </div>
                </li>
            ))}
          </ul>
        </div>
      ))}
        {/* <Show when={feedData.filter(log => log.event === currentEventId).length > 0}>
          
            <div ref={containerRef} className="overflow-y-auto" style={{ height: 'calc(100vh - 18rem)' }}>
                {feedData?.filter(log => log.event === currentEventId).map((log, index) => {
                  console.log(convertToLocalTime(log.timestamp))
                    return (
                        <div className={`border p-4 my-6 rounded-lg w-full ${!visibleItems.includes(index) ? 'opacity-20' : ''} ${(feedData.length - 1) === index ? ' mb-16' : ''} bg-primary-foreground transform transition-transform duration-500 ${isVisible ? 'scale-100' : 'scale-0'}`} key={index}>
                            <div className='w-full flex flex-col'>
                                <div className=' flex justify-between'>
                                    <div className=' text-left'>
                                        <h4 className="scroll-m-20 text-2xl text-primary font-semibold tracking-tight">{log.username}</h4>
                                        <p className="text-sm text-muted-foreground">{convertToLocalTime(log.timestamp)}</p>
                                    </div>
                                    <div className=''>
                                        <div className=' text-green-600'>{log.action.toUpperCase()}</div>
                                        <div>{log.amount} reps</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            
        </Show>
        <Show when={feedData.filter(log => log.event === currentEventId).length === 0 && !refreshData}>
            {<p>No one has worked out today!</p>}
        </Show> */}
        
    </>
  )
}