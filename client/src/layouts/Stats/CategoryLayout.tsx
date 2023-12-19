import React from 'react';
import './PlayerActivityLayout.css'
import { useLocation } from 'react-router';
import { formatPathname } from '../../helpers/format';

// React router - These params are passed to the loader with keys 
// that match the dynamic segment.
// export const loader = ({ params }) => {
//     const
// }

export const CategoryLayout = () => {
    const location = useLocation();
  return (
    <div>
        <h3 style={{ lineHeight: '50px', padding: '24px 60px', textAlign: 'left', textTransform: 'capitalize'}}>{formatPathname(location.pathname)} Table</h3>
        <section style={{ margin: '0 60px' }}>
        <table className='your-ranking-table'>
          <thead>
            <tr>
              <th>Months</th>
              <th>Pushup Entries</th>
              <th>Pushup Ranking</th>
              <th>Pushup Totals</th>
              <th>Pullup Entries</th>
              <th>Pullup Ranking</th>
              <th>Pullup Totals</th>
              <th>Running Entries</th>
              <th>Running Ranking</th>
              <th>Running Totals</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>November</td>
                <td>210</td>
                <td>210</td>
                <td>210</td>
                <td>210</td>
                <td>210</td>
                <td>210</td>
                <td>210</td>
                <td>10</td>
                <td>30</td>
              </tr>
              <tr>
                <td>November</td>
                <td>210</td>
                <td>210</td>
                <td>210</td>
                <td>210</td>
                <td>210</td>
                <td>210</td>
                <td>210</td>
                <td>10</td>
                <td>30</td>
              </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}