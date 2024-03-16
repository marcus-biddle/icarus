import React, { useEffect, useRef, useState } from 'react';
import { logActions } from '../api/logs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { formatTimestamp } from '../helpers/date';
import { Show } from '../helpers/functional';
import { useLoader } from '../hooks/useLoader';
import { Loader } from '../components/Loader/Loader';
import { Button } from "../components/ui/button"

export const Feed = () => {
    const [ feedData, setFeedData ] = useState<any[]>([]);
    const currentEventId = useSelector((state: RootState) => state.user.currentUser?.currentEventId);
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.loading.loading);
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [ refreshData, setRefreshData ] = useState<boolean>(false);

    const handleRefresh = () => {
      // Disable the button
      setRefreshData(true);
      setIsVisible(false);
      setFeedData([]);
      fetchData();

      // Enable the button after 5 seconds
      setTimeout(() => {
          setRefreshData(false);
      }, 3000); // 5 seconds in milliseconds
  };

    const fetchData = async () => {
        const res = await logActions.getLogs();
        setFeedData(res);
    }

    useLoader(fetchData);

    useEffect(() => {
        const handleScroll = () => {
          if (!containerRef.current) return;
          
          const container = containerRef.current;
          const { scrollTop, clientHeight } = container;
    
          const items = Array.from(container.children) as HTMLElement[];
          const newVisibleItems: number[] = [];
    
          items.forEach((item, index) => {
            const itemTop = item.offsetTop;
            const itemBottom = itemTop + item.offsetHeight;
            const itemHeight = item.offsetHeight;
            const x = scrollTop + clientHeight;

            if (scrollTop - itemTop <= (-160) && itemBottom <= scrollTop + clientHeight + 150) {
              newVisibleItems.push(index);
            }
          });
    
          setVisibleItems(newVisibleItems);
        };
    
        const container = containerRef.current;
        if (container) {
          container.addEventListener('scroll', handleScroll);
          handleScroll(); // Initial calculation
        }
    
        return () => {
          if (container) {
            container.removeEventListener('scroll', handleScroll);
          }
        };
      }, [feedData, currentEventId]);

      useEffect(() => {
        if (feedData.length > 0) {
          setIsVisible(true);
        }
      }, [feedData]);

      if (loading) {
        return <Loader />
    }

    console.log(refreshData)

  return (
    <>
      <div className=' w-full text-right'>
        <Button disabled={refreshData} variant={"ghost"} onClick={() => handleRefresh()} className=' uppercase text-ring tracking-wide'>Refresh</Button>
      </div>
        <Show when={feedData.filter(log => log.event === currentEventId).length > 0}>
          
            <div ref={containerRef} className="overflow-y-auto" style={{ height: 'calc(100vh - 18rem)' }}>
                {feedData?.filter(log => log.event === currentEventId).map((log, index) => {
                    return (
                        <div className={`border p-4 my-6 rounded-lg w-full ${!visibleItems.includes(index) ? 'opacity-20' : ''} ${(feedData.length - 1) === index ? ' mb-16' : ''} bg-primary-foreground transform transition-transform duration-500 ${isVisible ? 'scale-100' : 'scale-0'}`} key={index}>
                            <div className='w-full flex flex-col'>
                                <div className=' flex justify-between'>
                                    <div className=' text-left'>
                                        <h4 className="scroll-m-20 text-2xl text-primary font-semibold tracking-tight">{log.username}</h4>
                                        <p className="text-sm text-muted-foreground">{formatTimestamp(log.timestamp)}</p>
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
        </Show>
        
    </>
  )
}