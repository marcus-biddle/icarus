import React, { useEffect, useRef, useState } from 'react';
import { logActions } from '../api/logs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { formatTimestamp } from '../helpers/date';
import { Show } from '../helpers/functional';
import { useLoader } from '../hooks/useLoader';
import { Loader } from '../components/Loader/Loader';

export const Feed = () => {
    const [ feedData, setFeedData ] = useState<any[]>([]);
    const currentEventId = useSelector((state: RootState) => state.user.currentUser?.currentEventId);
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.loading.loading);
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleItems, setVisibleItems] = useState<number[]>([]);

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
      }, [feedData]);

      useEffect(() => {
        console.log('Visible Items:', visibleItems);
      }, [visibleItems]);

      if (loading) {
        return <Loader />
    }

  return (
    <div >
        <Show when={feedData.length > 0}>
            <div ref={containerRef} className="overflow-y-auto h-[635px]">
                {feedData?.filter(log => log.event === currentEventId).map((log, index) => {
                    return (
                        <div className={`border p-4 my-6 rounded-lg w-full ${!visibleItems.includes(index) ? 'opacity-20' : ''} ${(feedData.length - 1) === index ? ' mb-16' : ''}`} key={index}>
                            <div className='w-full flex flex-col'>
                                <div className=' flex justify-between'>
                                    <div className=' text-left'>
                                        <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">{log.username}</h4>
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
        <Show when={feedData.length === 0}>
            <p>No one has worked out today!</p>
        </Show>
        
    </div>
  )
}