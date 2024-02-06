import React, { useEffect, useState } from 'react'
import { GiGorilla, GiLaurelCrown, GiLibertyWing } from "react-icons/gi";
import { DynamicIcon } from '../../components/Icons/DynamicIcon';
import { useIsMobile } from '../../utilities/hooks/useIsMobile';
import { useGoogleAuth } from '../../utilities/hooks/useGoogleAuth';
import { Show } from '../../helpers/functional';
import { useDelayedDisplay } from '../../utilities/hooks/useDelayedDisplay';
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../../features/user/userSlice';
import { RootState } from '../../app/store';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../components/ui/card"
import { Button } from '../../components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../../components/ui/form"
  import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Input } from '../../components/ui/input';

const NewLogin = () => {
    const [ position, nextPosition ] = useState(0);
    const [ isVisible, setIsVisibile ] = useState(true);
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const isMobile = useIsMobile({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { handleSignin  } = useGoogleAuth({ username });
    const DelayedDisplay = useDelayedDisplay({ delay: 5000 });
    const creationDate = useSelector((state: RootState) => state?.user.currentUser?.creationDate);
    const leaderboard = useSelector((state: RootState) => state.leaderboard.currentLeaderboard);

    const handlePositionChange = () => {
        setIsVisibile(false);
        setTimeout(() => {
            nextPosition(position + 1);
            setIsVisibile(true);
          }, 1000);
    };

    // const handleCheckboxChange = (item: string) => {
    //     if (selectedItems.includes(item)) {
    //         setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    //     } else {
    //         setSelectedItems([...selectedItems, item]);
    //     }
    // };

    const handleUsernameChange = (event) => {
        const newUsername = event.target.value;
    
        // Check for special characters in the username
        const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharacters.test(newUsername)) {
          setErrorMessage('Username cannot contain special characters.');
        } else {
          setErrorMessage('');
          setUsername(newUsername);
        }
      };

      const handleEventSelectionNextClick = () => {
        // dispatch(
        //     addEvent(selectedItems)
        // )
        handlePositionChange();
      }

      const formSchema = z.object({
        userName: z.string().min(1),
      })
    
    
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          userName: "",
        },
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(Number(values.userName))
        handleSignin();
    
          toast("Achievement Unlocked!", {
            description: `${values.userName} successfully joined the group.`,
            // action: {
            //   label: "Undo",
            //   onClick: () => console.log("Undo"),
            // },
          })
      }

      useEffect(() => {
        if (creationDate) {
            navigate('/practice')
        }

        if (!leaderboard || !leaderboard?.leagueIds) {
            // dispatch(
            //     fetchLeaderboard()
            // )
        };
      })

  return (
    <div className=' w-full'>
        <div className='flex text-baseline gap-2 text-primary w-full justify-center items-end md:justify-start '>
            <DynamicIcon icon={GiGorilla} width='50px' height='50px' color='text-accent' />
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">FitWars</h1>
        </div>
        <Show when={position === 0}>
            <div className='w-full flex justify-center my-24'>
                <Card className=' w-full md:w-[600px]'>
                    <CardHeader>
                        <CardTitle className=' scroll-m-20 text-2xl font-semibold tracking-tight'>Track. Compete. Improve.</CardTitle>
                        <CardDescription>Sign in below or create an account.</CardDescription>
                    </CardHeader>
                    <CardContent className='flex justify-evenly mt-16 mb-8'>
                        <Button onClick={() => handlePositionChange()}>Create Account</Button>
                        <Button variant="secondary" onClick={() => handleSignin()}>Login</Button>
                    </CardContent>
                    <CardFooter>
                    <p className="text-sm text-muted-foreground">*Loading times could vary up to a few minutes in the beginning due to our third party cloud hosting provider.</p>
                    </CardFooter>
                </Card>
            </div>
        </Show>
        <Show when={position === 1}>
        <div className='w-full flex justify-center my-24'>
                <Card className=' w-full md:w-[600px]'>
                    <CardHeader>
                        <CardTitle className=' scroll-m-20 text-2xl font-semibold tracking-tight'>Track. Compete. Improve.</CardTitle>
                        <CardDescription>Sign in below or create an account.</CardDescription>
                    </CardHeader>
                    <CardContent className='flex justify-evenly mt-16 mb-8'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 min-w-[50%]">
                                <FormField
                                    control={form.control}
                                    name="userName"
                                    render={({ field }) => (
                                    <FormItem>
                                        {/* <FormLabel>Update Exercise </FormLabel> */}
                                        <FormControl>
                                        <Input placeholder={''} {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Please enter a username.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <Button type="submit">Create Account</Button>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter>
                    <p className="text-sm text-muted-foreground">*Loading times could vary up to a few minutes in the beginning due to our third party cloud hosting provider.</p>
                    </CardFooter>
                </Card>
            </div>
        </Show>
    </div>
  )
}

export default NewLogin