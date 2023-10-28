import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const RecentChanges = () => {
  const [recentChanges, setRecentChanges] = useState([0]);
  const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Fetch recent changes data from your backend API
//     axios
//       .get('/api/recentChanges') // Adjust the API endpoint
//       .then((response) => {
//         setRecentChanges(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching recent changes:', error);
//         setLoading(false);
//       });
//   }, []);

  return (
    <>
      <h2>Recent Changes</h2>
      {loading ? (
        <p>Loading...</p>
      ) : recentChanges.length === 0 ? (
        <p>No recent changes to display.</p>
      ) : (
        <ul>
          {recentChanges.map((change, index) => (
            <li key={index}>
              <strong>Marcus</strong> completed <em>20</em> pushups at ({new Date().toLocaleString()})
            </li>
          ))}
          <li>
              <strong>Marcus</strong> completed <em>20</em> pushups at ({new Date().toLocaleString()})
            </li><li>
              <strong>Marcus</strong> completed <em>20</em> pushups at ({new Date().toLocaleString()})
            </li><li>
              <strong>Marcus</strong> completed <em>20</em> pushups at ({new Date().toLocaleString()})
            </li><li>
              <strong>Marcus</strong> completed <em>20</em> pushups at ({new Date().toLocaleString()})
            </li><li>
              <strong>Marcus</strong> completed <em>20</em> pushups at ({new Date().toLocaleString()})
            </li><li>
              <strong>Marcus</strong> completed <em>20</em> pushups at ({new Date().toLocaleString()})
            </li><li>
              <strong>Marcus</strong> completed <em>20</em> pushups at ({new Date().toLocaleString()})
            </li><li>
              <strong>Marcus</strong> completed <em>20</em> pushups at ({new Date().toLocaleString()})
            </li><li>
              <strong>Marcus</strong> completed <em>20</em> pushups at ({new Date().toLocaleString()})
            </li><li>
              <strong>Marcus</strong> completed <em>20</em> pushups at ({new Date().toLocaleString()})
            </li><li>
              <strong>Marcus</strong> completed <em>20</em> pushups at ({new Date().toLocaleString()})
            </li><li>
              <strong>Marcus</strong> completed <em>20</em> pushups at ({new Date().toLocaleString()})
            </li><li>
              <strong>Marcus</strong> completed <em>20</em> pushups at ({new Date().toLocaleString()})
            </li><li>
              <strong>Marcus</strong> completed <em>20</em> pushups at ({new Date().toLocaleString()})
            </li><li>
              <strong>Marcus</strong> completed <em>20</em> pushups at ({new Date().toLocaleString()})
            </li><li>
              <strong>Marcus</strong> completed <em>20</em> pushups at ({new Date().toLocaleString()})
            </li><li>
              <strong>Marcus</strong> completed <em>20</em> pushups at ({new Date().toLocaleString()})
            </li><li>
              <strong>Marcus</strong> completed <em>20</em> pushups at ({new Date().toLocaleString()})
            </li>
        </ul>
      )}
    </>
  );
};
