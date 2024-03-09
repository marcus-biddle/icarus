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
import { useDispatch } from 'react-redux';
import { removeUser } from '../features/user/userSlice';
import { useLoader } from '../hooks/useLoader';

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

const Profile = () => {
    const user: any = useLoaderData();
    const [progress, setProgress] = useState(0);
    const [ userData, setUserData ] = useState<any>(null);
    const dispatch = useDispatch();
    const { userId } = useParams();

    const fetchData = async() => {
        const res = await userActions.fetchUser(userId || '');
        setUserData(res);
    }

    const setProgressBarLength = async () => {
        const timer = setTimeout(() => setProgress((userData ? userData.levelCompletionRate : 0) * 100), 500)
        return () => clearTimeout(timer)
    }

    useLoader(fetchData);

    useEffect(() => {
        setProgressBarLength();
      }, [])

  return (
    <div className=' w-full'>
        {userData && <>
            <div className=' w-full text-right'>
                <Button variant="ghost" onClick={() => dispatch(removeUser())}>Logout</Button>
            </div>
            <div className=' flex items-start md:gap-16 gap-8'>
                <Avatar className=' md:w-40 md:h-40 sm:w-40 sm:h-40 h-32 w-32 text-4xl'>
                    <AvatarImage src={userData.username === 'mars' ? "https://github.com/shadcn.png" : ''} alt="@shadcn" />
                    <AvatarFallback>{getInitials(userData.username)}</AvatarFallback>
                </Avatar>
                <div className='text-left w-full'>
                    <div>
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{userData.username}</h1>
                        {/* <p className="text-sm text-muted-foreground font-normal px-0">Battle Code: 0001</p> */}
                    </div>
                    
                    <div className=' flex flex-wrap gap-1 py-4'>
                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">Level {userData.level}</code>
                        <div className='w-full'>
                            <Progress value={progress} className="w-[100%] h-[4px]"  />
                            <p className="text-sm text-muted-foreground text-right">{(userData.levelCompletionRate * 100).toFixed(2)}%</p>
                        </div>
                    </div>
                    
                    <small className="text-sm font-medium leading-none">Joined <em className=' italic text-sm'>{formatTimestamp(userData.creationDate)}</em></small>
                </div>
            </div>
            <Separator className=' my-8' />
            <div>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-left mb-4">Statistics</h3>
                <div className=' flex flex-wrap justify-center gap-8'>
                    {userData.statistics.map((stat) => {
                        const metric = stat.eventId === 'running' ? 'miles' : 'reps'
                        return (
                            <div key={stat.eventId} className="rounded-[--radius] border px-4 py-2 font-mono text-sm shadow-sm w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                                <div className="text-lg text-primary font-semibold capitalize text-left">{stat.eventId}</div>
                                <ul className="my-6 list-none [&>li]:mt-2 text-left">
                                    <li className=' flex justify-between'><span className="text-sm text-muted-foreground">Total Count:</span> {stat.weeklyAverage.toFixed(2)} {metric}</li>
                                    <li className=' flex justify-between'><span className="text-sm text-muted-foreground">Total Active Days:</span> {stat.weeklyAverage.toFixed(2)} {metric}</li>
                                    <li className=' flex justify-between'><span className="text-sm text-muted-foreground">Weekly average:</span> {stat.weeklyAverage.toFixed(2)} {metric}</li>
                                    <li className=' flex justify-between'><span className="text-sm text-muted-foreground">Current streak:</span> {stat.currentStreak} days</li>
                                    <li className=' flex justify-between'><span className="text-sm text-muted-foreground">Months Won:</span> {stat.currentStreak} days</li>
                                    <li className=' flex justify-between'><span className="text-sm text-muted-foreground">Personal Best:</span> {stat.personalBest} {metric}</li>
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>}
    </div>
  )
}

export default Profile