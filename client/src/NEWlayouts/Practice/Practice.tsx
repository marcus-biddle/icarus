import React, { useState } from 'react'
import TwoColumnGrid from '../../components/Grid/TwoColumnGrid'
import './Practice.css'
import { useIsMobile } from '../../utilities/hooks/useIsMobile';
import { useDispatch, useSelector } from 'react-redux';
import { UserState, updateCounts, updateUserPractice } from '../../features/user/userSlice';
import { updateLeaderboardXp } from '../../features/leaderboard/leaderboardSlice'
import { RootState } from '../../app/store';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Separator } from "../../components/ui/separator"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { toast } from "sonner"



const Practice = () => {
    const [inputValue, setInputValue] = useState<number | null>(null);
    const [error, setError] = useState('');
    const isMobile = useIsMobile({});
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.currentUser);
    const userId = user?.id || '';
    const currentEventId = useSelector((state: RootState) => state.user.currentUser?.currentEventId);
    // const eventTotalIndex = useSelector((state: RootState) => state.user.currentUser?.eventTotals?.findIndex(eventTotal => eventTotal.event === currentEventId)) || -1
    

    const handleInputChange = (e) => {
    const value = e.target.value;

    // Allow only positive numbers
    if (/^\d*\.?\d*$/.test(value)) {
      setInputValue(Number(value));
      console.log(Number(value))
      setError('');
    } else {
      setError('Please enter a positive number');
    }
  };

  // const handleSubmit = () => {
  //   // Perform submit action here (e.g., send the positive number to an API)
  //   console.log('Submitted value:', inputValue);
  //   const numericValue = Number(inputValue);

  //   // redo lol
  //   dispatch(
  //     updateUserPractice(numericValue)
  //   )

  //     dispatch(
  //       updateLeaderboardXp({xpGain: (numericValue + (user?.monthlyXp || 0)), userId: userId })
  //     )

  //   // dispatch(
  //   //   updateUserYearCount({ userCount: numericValue, eventId: currentEventId, userId: userId })
  //   // )

  //   dispatch(
  //     updateCounts({ userCount: numericValue, eventId: currentEventId, userId: userId })
  //   )
    
  //   // setInputValue('');
  // };

  const formSchema = z.object({
    userCount: z.string().min(1),
  })

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userCount: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(Number(values.userCount))
    if (Number(values.userCount)) {
      dispatch(
        updateUserPractice((Number(values.userCount)))
      )
  
      dispatch(
        updateCounts({ userCount: Number(values.userCount), eventId: currentEventId, userId: userId })
      )

      toast("Event has been updated", {
        description: new Date().toDateString(),
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
    }
  }

  return (
    <TwoColumnGrid showSecondColumnInMobile={true}>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl capitalize">
        Practice Your Craft: <br /> {currentEventId}
      </h1>
      <Separator className="my-6" />
      <Tabs defaultValue="update" className="">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="update">Update</TabsTrigger>
          <TabsTrigger value="password">History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="update" className=' my-24'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="userCount"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Update Exercise </FormLabel> */}
                    <FormControl>
                      <Input placeholder={''} {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the total amount performed for this exercise.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
      
        {/* <div style={{ padding: isMobile ? '120px 0' : '40px 0'}}>
            <p style={{ fontSize: '18px', padding: '24px'}}>Please enter a number below for how many reps you performed.</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : ''}}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter a positive number"
                    className='practice-input'
                />
                <button onClick={handleSubmit} className='practice-input-btn'>Submit</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div> */}
    </TwoColumnGrid>
  )
}

export default Practice