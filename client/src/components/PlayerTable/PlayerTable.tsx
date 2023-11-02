import React from 'react'
import './style.css'

const PlayerTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Ranking</th>
          <th>Name</th>
          <th>Count</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((player, index) => {
          const month = new Date().getMonth() + 1;
          const total = player.totalPushups.filter((entry) => entry.month === month);

          return (
          <tr key={player._id}>
            <td>{index + 1}</td>
            <td>{player.username}</td>
            <td>{total.length > 0 ? total[0].total : 0}</td>
            <td>View</td>
          </tr>
        )})}
      </tbody>
    </table>
  )
}

export default PlayerTable