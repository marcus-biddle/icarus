import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../components/ui//table"
import { timestampToDateTime } from './RecordTable'
import { formatDateFromTimestamp } from '../Charts/GroupUserTotals'
import { RootState } from '../../app/store'
import { useSelector } from 'react-redux'

const GroupTable = ({ data, labels }) => {
    const currentEventId = useSelector((state: RootState) => state.user.currentUser?.currentEventId) || '';
  return (
    <div className=' mt-8'>
        <Table>
            {/* <TableCaption>A list of your recent records.</TableCaption> */}
            <TableHeader>
                <TableRow>
                <TableHead className="w-[0]">User</TableHead>
                <TableHead className='text-center'>Records</TableHead>
                {/* <TableHead className='text-center'>Reward</TableHead> */}
                {/* <TableHead className="text-right">Count</TableHead> */}
                </TableRow>
            </TableHeader>
            <TableBody>
            {data.filter(user => user.xpGains.length > 0).map((user, userIndex) => (
                <TableRow key={userIndex}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                        <Table>
                            <TableBody>
                                {user.xpGains.filter(entry => entry.event === currentEventId && labels.includes(formatDateFromTimestamp(entry.time))).map((entry, entryIndex) => (
                                <TableRow key={entryIndex}>
                                    {/* <TableCell className="font-medium"></TableCell> */}
                                    <TableCell>{formatDateFromTimestamp(entry.time)}</TableCell>
                                    <TableCell className="text-center">{entry.totalReps}</TableCell>
                                </TableRow>))}
                            </TableBody>
                        </Table>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </div>
  )
}

export default GroupTable