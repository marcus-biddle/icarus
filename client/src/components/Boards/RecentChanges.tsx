import React from 'react';
import { useLoaderData } from 'react-router';
import { isArrayEmpty, showIfOrElse } from '../../helpers/functional';

export const RecentChanges = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = useLoaderData();
  const noDataMsg = (<p>When a competitor updates their score this week, we'll display it here.</p>);

  if (data === null) return noDataMsg;
  return (
    <>
      <h2>Recent Changes</h2>
      {showIfOrElse(isArrayEmpty(data))(noDataMsg)(
        <ul>
          {data.recentChanges.map((item, index) => (
            <li key={index}>
              {item.action} 
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
