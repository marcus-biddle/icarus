import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router';
import { userActions } from '../../api/users';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "../../components/ui/avatar"
  import { Progress } from "../../components/ui/progress"
import { Separator } from '../../components/ui/separator';
import { getCurrentMonth } from '../../helpers/date';

export async function profileLoader({ params }) {
    const profile = await userActions.fetchUser(params.userId);
    return { profile };
  }

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
    const { profile }: any = useLoaderData();
    const [progress, setProgress] = useState(0)
    console.log(profile)

    useEffect(() => {
        const timer = setTimeout(() => setProgress(profile.levelCompletionRate * 100), 500)
        return () => clearTimeout(timer)
      }, [])

  return (
    <div className=' w-full'>
        <div className=' flex items-start md:gap-16 gap-8'>
            <Avatar className=' md:w-40 md:h-40 sm:w-40 sm:h-40 h-32 w-32 text-4xl'>
                <AvatarImage src={profile.username === 'mars' ? "https://github.com/shadcn.png" : ''} alt="@shadcn" />
                <AvatarFallback>{getInitials(profile.username)}</AvatarFallback>
            </Avatar>
            <div className='text-left w-full'>
                <div>
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{profile.username}</h1>
                    {/* <p className="text-sm text-muted-foreground font-normal px-0">Battle Code: 0001</p> */}
                </div>
                
                <div className=' flex flex-wrap gap-1 py-4'>
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">Level {profile.level}</code>
                    <div className='w-full'>
                        <Progress value={progress} className="w-[100%] h-[4px]"  />
                        <p className="text-sm text-muted-foreground text-right">{(profile.levelCompletionRate * 100).toFixed(2)}%</p>
                    </div>
                </div>
                
                <small className="text-sm font-medium leading-none">Joined <em className=' italic text-sm'>{formatTimestamp(profile.creationDate)}</em></small>
            </div>
        </div>
        <Separator className=' my-8' />
        <div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-left mb-4">{getCurrentMonth()} Tracker</h3>
            <div className=' flex flex-row justify-center gap-4 mb-8'>
                {profile.statistics.map((stat) => {
                    const metric = stat.eventId === 'running' ? 'miles' : 'reps'
                    return (
                        <div key={stat.eventId} className="rounded-[--radius] border px-4 py-2 font-mono text-sm shadow-sm">
                            <div className="text-lg font-semibold capitalize">{stat.eventId}</div>
                            <ul className="my-6 list-none [&>li]:mt-2">
                                <li><p className="text-sm text-muted-foreground">Ranking:</p> 1st</li>
                                <li><p className="text-sm text-muted-foreground">Count:</p> {stat.currentStreak} days</li>
                                {/* <li><p className="text-sm text-muted-foreground">Personal Best:</p> {stat.personalBest} {metric}</li> */}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
        <div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-left mb-4">Statistics</h3>
            <div className=' flex flex-wrap justify-center gap-8'>
                {profile.statistics.map((stat) => {
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
    </div>
  )
}

export default Profile