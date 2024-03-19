import React, { useEffect, useState, Suspense } from 'react'
import { Await, defer, useLoaderData, useParams } from 'react-router';
import { userActions } from '../api/users';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "../components/ui/avatar"
  import { Progress } from "../components/ui/progress"
import { Separator } from '../components/ui/separator';
import { getCurrentMonth } from '../helpers/date';
import { Loader } from '../components/Loader/Loader';
import { Button } from '../components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../features/user/userSlice';
import { useLoader } from '../hooks/useLoader';
import { RootState } from '../app/store';
import { Show } from '../helpers/functional';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "../components/ui//table"

// export const profileLoader = async({ params }) => {
//     // await new Promise((resolve) => setTimeout(resolve, 1500));
//     const profilePromise = userActions.fetchUser(params.userId);
//     return defer({ profile: profilePromise });
//   }

  export function getInitials(name) {
    const words = name.split(' ');
    const initials = words.map(word => word.charAt(0));
  
    return initials.join('');
  }

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
  
    return `${month} ${year}`;
  }

  const prepareTableData = (data) => {
    if (data.length === 0) {
        return [];
    }
    // Get all unique event names
    const events = data.flatMap(item => item.monthSummary.map(summary => summary.monthName));
    const uniqueEvents = [...new Set(events)];
  
    // Create table data
    const tableData = uniqueEvents.map(month => {
      const rowData = {
        month: month,
      };
  
      data.forEach(item => {
        item.monthSummary.forEach(summary => {
          if (summary.monthName === month) {
            rowData[item.event] = summary.totalCount;
          }
        });
      });
  
      return rowData;
    });
  
    return tableData;
  };

const Profile = () => {
    const loading = useSelector((state: RootState) => state.loading.loading);
    const [progress, setProgress] = useState(0);
    const [ userData, setUserData ] = useState<any>({});
    const [ xpSummaries, setXpSummaries ] = useState<any[]>([])
    const { userId } = useParams();
    const id = useSelector((state: RootState) => state.user.currentUser?.id)
    const userXpSum = useSelector((state: RootState) => state.user.currentUser?.xpSummaries) || [];
    const xpSumTableData: any[] = prepareTableData(xpSummaries ? xpSummaries : []);
    console.log('xpSum', xpSumTableData)
    
    console.log('userData', userData)
    const fetchData = async() => {
        const res = await userActions.fetchUser(userId || '');
        setUserData(res);
        if (userId === id) {
            setXpSummaries(userXpSum);
        } else if (userId !== id) {
            setXpSummaries(res.xpSummaries)
        }
        const timer = setTimeout(() => setProgress((res ? res.levelCompletionRate : 0) * 100), 500)
        return () => clearTimeout(timer)
    }

    useEffect(() => {
        fetchData();
    }, [userId])

  return (
    <div >
        <Show when={Object.keys(userData).length === 0}>
            <Loader />
        </Show>
        <Show when={Object.keys(userData).length !== 0}>
            <div className=' text-left bg-primary-foreground border border-accent rounded-md mb-8 px-4 py-6'>
                <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight capitalize">{userData.username}</h1>
            </div>

            <h1 className="scroll-m-20 text-2xl text-left font-extrabold tracking-tight capitalize text-muted-foreground">Level {userData.level}</h1>
            <div className='w-full'>
                <Progress value={progress} className="w-[100%] h-[4px]"  />
                <p className="text-sm text-muted-foreground text-right">{(userData.levelCompletionRate * 100).toFixed(2)}%</p>
            </div>
            <div className=' flex items-start md:gap-16 gap-8'>
                <div className='text-left w-full'>
                    {/* <div>
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{userData.username}</h1>
                    </div> */}
                    
                    
                    
                    <small className="text-sm font-medium leading-none">Joined <em className=' italic text-sm'>{formatTimestamp(userData.creationDate)}</em></small>
                </div>
            </div>
            <Separator className=' my-8' />
            <Table className=' bg-primary-foreground rounded-lg shadow-sm'>
            {/* <TableCaption>A list of your recent records.</TableCaption> */}
            <TableHeader className=''>
                <TableRow>
                {xpSumTableData.length > 0 && Object.keys(xpSumTableData[0]).map(key => (
                    <TableHead key={key} className='text-left capitalize'>{key}</TableHead>
                ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                    {xpSumTableData.length > 0 && xpSumTableData.map((item, index) => (
                        <TableRow key={index}>
                            {Object.values(item).map((value: any) => (
                                <TableCell key={value} className='text-left'>{typeof value === 'number' ? value.toFixed(0) : value}</TableCell>
                            ))}
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
        </Show>
    </div>
  )
}

export default Profile