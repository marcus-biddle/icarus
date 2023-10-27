import React from 'react'
import './style.css'

const PlayerTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Count</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>View</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PlayerTable