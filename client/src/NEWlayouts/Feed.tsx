import React, { useEffect, useState } from 'react';
import { logActions } from '../api/logs';

export const Feed = () => {
    const [ feedData, setFeedData ] = useState<any[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await logActions.getLogs();
            setFeedData(res);
        }

        fetchData();
    }, []);
    console.log(feedData);
  return (
    <div>Feed</div>
  )
}