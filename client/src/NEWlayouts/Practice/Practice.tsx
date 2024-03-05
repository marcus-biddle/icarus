import React, { useEffect, useState } from 'react'
import TwoColumnGrid from '../../components/Grid/TwoColumnGrid'
import { useIsMobile } from '../../utilities/hooks/useIsMobile';
import { useDispatch, useSelector } from 'react-redux';
import { updateGraphs, updateUser, updateUserPractice } from '../../features/user/userSlice';
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

import { RepFrequency } from '../../components/Charts/RepFrequency';
import RecordTable from '../../components/Tables/RecordTable';
import { Label } from "../../components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet"



const Practice = () => {
    const [inputValue, setInputValue] = useState<number | null>(null);
    const [error, setError] = useState('');
    const isMobile = useIsMobile({});
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.currentUser);
    const userId = user?.id || '';
    const currentEventId = useSelector((state: RootState) => state.user.currentUser?.currentEventId) || '';
    const xpGains = useSelector((state: RootState) => state.user.currentUser?.xpGains) || [];
    const graphs = useSelector((state: RootState) => state.user.currentUser?.graphs) || [];

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

  const formSchema = z.object({
    userCount: z.string().min(1),
  })


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userCount: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(Number(values.userCount))
    if (Number(values.userCount)) {
      dispatch(
        updateUserPractice((Number(values.userCount)))
      )
  
      dispatch(
        updateUser({ userCount: Number(values.userCount), eventId: currentEventId, userId: userId, username: user?.username })
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

  const handleTabChange = (tab: string) => {
    if (tab === 'graphs') {
      dispatch(
        updateGraphs()
      )
    }
  }

  useEffect(() => {
    if (graphs.length === 0 || (graphs[0].graphData.userData.length === 0 && xpGains.filter(entry => entry.event === currentEventId).length > 0)) {
      console.log('graphs updated')
      dispatch(
        updateGraphs()
      )
    }
  }, [graphs, xpGains, currentEventId])

  return (
    <>
      {/* <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl capitalize my-8">
        Training Exercise: <br /> <span className=' text-primary text-5xl'>{currentEventId}</span>
      </h1> */}
      <RecordTable />
      <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className=" fixed bottom-[125px] right-[25px] rounded-full text-[30px] bg-muted text-primary shadow-md items-center text-center h-16 w-16">+</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Entry</SheetTitle>
          <SheetDescription>
            Update your exercise count here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form className="space-y-8">
              <FormField
                control={form.control}
                name="userCount"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Update Exercise </FormLabel> */}
                    <FormControl>
                      <Input placeholder={''} {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      Enter the total amount performed for this exercise.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <Button type="submit">Submit</Button> */}
            </form>
          </Form>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Save</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
      {/* <Separator className="my-6" /> */}
      {/* <Tabs defaultValue="update" className="" onValueChange={(e) => handleTabChange(e)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="update">Update</TabsTrigger>
          <TabsTrigger value="password">Records</TabsTrigger>
          <TabsTrigger value="graphs">Graphs</TabsTrigger>
        </TabsList>
        <TabsContent value="update" className=' my-24'>
          
        </TabsContent>
        <TabsContent value="password">
          
        </TabsContent>
        <TabsContent value="graphs">
          <RepFrequency />
        </TabsContent>
      </Tabs> */}
      
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
    </>
  )
}

export default Practice