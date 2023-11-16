import React from 'react';
import { useLoaderData } from 'react-router';
import { isArrayEmpty, showIfOrElse } from '../../helpers/functional';
import './RecentChanges.css';
import { formatDateString } from '../../helpers/date';

export const RecentChanges = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = useLoaderData();
  const noDataMsg = (<p>When a competitor updates their score this week, we'll display it here.</p>);

  if (data === null) return noDataMsg;
  return (
    <>
      {showIfOrElse(isArrayEmpty(data))(noDataMsg)(
        <ul className='scrollbar'>
          {data.logs.map((item, index) => (
            <li key={index}>
              <p>{formatDateString(item.timestamp)}</p>
              <span>{item.action} </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
