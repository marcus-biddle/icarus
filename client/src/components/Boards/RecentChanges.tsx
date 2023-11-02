import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router';

export const RecentChanges = () => {
  const data: any = useLoaderData();

  return (
    <>
      <h2>Recent Changes</h2>
      {data.length === 0 ? (
        <p>No activity in the last week.</p>
      ) : (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {item.action} 
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
