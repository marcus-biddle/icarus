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

export async function profileLoader({ params }) {
    const profile = await userActions.fetchUser(params.userId);
    return { profile };
  }

  function getInitials(name) {
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
        <div className=' flex items-start gap-16'>
            <Avatar className=' w-52 h-52'>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
            </Avatar>
            <div className='text-left w-full'>
                <div>
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{profile.username}</h1>
                    <p className="text-sm text-muted-foreground font-normal px-0">{profile.name}</p>
                </div>
                
                <div className=' flex flex-wrap gap-1 py-4'>
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">Level {profile.level}</code>
                    <Progress value={progress} className="w-[100%] h-[4px]"  />
                </div>
                
                <small className="text-sm font-medium leading-none">Joined <em className=' italic text-sm'>{formatTimestamp(profile.creationDate)}</em></small>
            </div>
        </div>
        <Separator className=' my-8' />
        <div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-left mb-4">Statistics</h3>
            <div className=' flex flex-wrap justify-center gap-8'>
                {profile.statistics.map((stat) => {
                    return (
                        <div key={stat.eventId} className="rounded-[--radius] border px-4 py-2 font-mono text-sm shadow-sm w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                            <div className="text-lg font-semibold capitalize">{stat.eventId}</div>
                            <ul className="my-6 list-disc [&>li]:mt-2">
                                <li><p className="text-sm text-muted-foreground">Weekly average:</p> {stat.weeklyAverage} reps</li>
                                <li><p className="text-sm text-muted-foreground">Current streak:</p> {stat.currentStreak} days</li>
                                <li><p className="text-sm text-muted-foreground">Personal Best:</p> {stat.personalBest} reps</li>
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