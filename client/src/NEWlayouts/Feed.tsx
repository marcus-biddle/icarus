import React, { useEffect, useState } from 'react';
import { logActions } from '../api/logs';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { formatTimestamp } from '../helpers/date';
import { Show } from '../helpers/functional';

export const Feed = () => {
    const [ feedData, setFeedData ] = useState<any[]>([]);
    const currentEventId = useSelector((state: RootState) => state.user.currentUser?.currentEventId)

    useEffect(() => {
        const fetchData = async () => {
            const res = await logActions.getLogs();
            setFeedData(res);
        }

        fetchData();
    }, []);
    console.log(feedData);
  return (
    <div className='flex flex-col gap-10'>
        <Show when={feedData.length > 0}>
            {feedData?.filter(log => log.event === currentEventId).map((log, index) => {
                return (
                    <div className='flex' key={index}>
                        <div className=' min-w-28 min-h-28 bg-card rounded-md relative border flex justify-center text-center items-center text-2xl'>
                            {log.username[0].toUpperCase()}
                            <div className='bg-primary-foreground text-primary w-14 h-5 absolute right-0 bottom-0 text-right flex flex-row items-center rounded-tl-md justify-around'>
                                <p className=' text-sm'>Rank</p>
                                <p className=' font-mono text-lg '>{log.rank ? log.rank : 0}</p>
                            </div>
                        </div>
                        <div className=' text-left pl-4 w-full flex flex-col justify-around'>
                            <div>
                                <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">{log.username}</h4>
                                <p className="text-sm text-muted-foreground">{formatTimestamp(log.timestamp)}</p>
                            </div>
                            <div className='flex justify-between text-lg font-semibold'>
                                <div className=' text-green-600'>{log.action.toUpperCase()}</div>
                                <div>{log.amount} reps</div>
                            </div>
                            
                        </div>
                    </div>
                )
            })}
        </Show>
        <Show when={feedData.length === 0}>
            <p>No one has worked out today!</p>
        </Show>
        
    </div>
  )
}