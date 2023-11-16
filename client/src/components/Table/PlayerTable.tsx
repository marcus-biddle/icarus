import React, { useEffect} from 'react'
import './style.css'
import { CiMedal } from "react-icons/ci";
import { useFilterContext } from '../../utilities/hooks/useFilterContext';

const PlayerTable = ({ data }) => {

  return (
    <table>
      <thead>
        <tr>
          <th>Ranking</th>
          <th>Name</th>
          <th>Total</th>
          <th>Last 7 Days</th>
          <th>This Month</th>
        </tr>
      </thead>
      <tbody>
        {data.map((player, index) => {
          
          return (
          <tr key={player._id}>
            <td>{index +1}</td>
            <td>{player.userName}</td>
            <td>{player.totalPushups}</td>
            <td>{player.pushupsThisWeek}</td>
            <td>{player.pushupsThisMonth}</td>
          </tr>
        )})}
      </tbody>
    </table>
  )
}

export default PlayerTable