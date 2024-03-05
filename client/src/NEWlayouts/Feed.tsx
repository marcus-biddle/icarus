import React, { useEffect, useState } from 'react';
import { logActions } from '../api/logs';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { formatTimestamp } from '../helpers/date';

export const Feed = () => {
    const [ feedData, setFeedData ] = useState<any[] | null>(null);
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
        {feedData?.filter(log => log.event === currentEventId).map((log, index) => {
            return (
                <div className='flex' key={index}>
                    <div className=' min-w-28 min-h-28 bg-card rounded-md relative border flex justify-center text-center items-center'>
                        {log.username[0].toUpperCase()}
                        <div className='bg-primary w-14 h-14 absolute right-0 bottom-0 rounded-tl-full text-right flex flex-col align-bottom pt-2 pr-1'>
                            <p className='text-white text-sm'>Rank</p>
                            <p className=' font-mono text-lg '>4</p>
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
    </div>
  )
}