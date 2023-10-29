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
        {data.map((player, index) => (
          <tr key={player._id}>
            <td>{index + 1}</td>
            <td>{player.username}</td>
            <td>{player.totalPushups.length}</td>
            <td>View</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PlayerTable