import React from 'react';
import { useLoaderData } from 'react-router';
import { isArrayEmpty, showIfOrElse } from '../../helpers/functional';
import './RecentChanges.css';
import { formatDateString } from '../../helpers/date';

export const RecentChanges = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = useLoaderData();
  const noDataMsg = '';

  return (
    <>
      {showIfOrElse(data.length === 0)(<p style={{ color: 'white'}}>When a competitor adds an event, it will be listed here</p>)(
        <></>
      )}
    </>
  );
};
