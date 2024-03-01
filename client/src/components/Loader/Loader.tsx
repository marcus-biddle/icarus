import React, { useEffect, useState } from 'react'
import { Progress } from '../ui/progress'
import { useNavigation } from 'react-router';

export const Loader = () => {
  const [progress, setProgress] = useState(1.67);
  const { state } = useNavigation();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        // Increase progress by 20, making sure it doesn't exceed 100
        const newProgress = prevProgress + 1.67;
        return newProgress <= 100 ? newProgress : 100;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className=' fixed top-[50%] left-0 w-full flex flex-col justify-center items-center align-middle content-center'>
      <Progress value={progress} className="w-[90%] h-[6px]" />
      <p className=' text-foreground py-8'>Database is loading <br /> this should take less than a minute...</p>
    </div>
  )
}