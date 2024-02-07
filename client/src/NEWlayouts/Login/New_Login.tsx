import React, { useEffect, useState } from 'react'
import { GiGorilla, GiLaurelCrown, GiLibertyWing } from "react-icons/gi";
import { DynamicIcon } from '../../components/Icons/DynamicIcon';
import { useIsMobile } from '../../utilities/hooks/useIsMobile';
// import { useGoogleAuth } from '../../utilities/hooks/useGoogleAuth';
import { Show } from '../../helpers/functional';
import { useDelayedDisplay } from '../../utilities/hooks/useDelayedDisplay';
import { GoHourglass } from "react-icons/go";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
  import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs"
import { AccountCreation } from '../../components/Forms/accountCreation';
import { LoginForm } from '../../components/Forms/LoginForm';

const NewLogin = () => {
    const [ position, nextPosition ] = useState(0);
    const [ isVisible, setIsVisibile ] = useState(true);
    const navigate = useNavigate();
    const creationDate = useSelector((state: RootState) => state.user.currentUser?.creationDate);

    const handlePositionChange = () => {
        setIsVisibile(false);
        setTimeout(() => {
            nextPosition(position + 1);
            setIsVisibile(true);
          }, 1000);
    };

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
        console.log('onsubmit')
        // handleGoogleSignIn(values.userName);
      }

      useEffect(() => {
        if (creationDate) {
            navigate('/practice')
        }

      }, [creationDate, location.pathname])

  return (
        <div className=' w-full'>
            <div className='flex text-baseline gap-2 text-primary w-full justify-center items-end md:justify-start '>
                <DynamicIcon icon={GiGorilla} width='50px' height='50px' color='text-accent' />
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">FitWars</h1>
            </div>
            <Show when={position === 0}>
                <div className='w-full flex justify-center my-24'>
                    <Card className=' w-full md:w-[600px] border-none'>
                        <CardHeader>
                            <CardTitle className=' scroll-m-20 text-2xl font-semibold tracking-tight'>Track. Compete. Improve.</CardTitle>
                            {/* <CardDescription>Sign in below or create an account.</CardDescription> */}
                        </CardHeader>
                        <CardContent className='flex justify-evenly mb-8'>
                            <Tabs defaultValue="account" className="w-[400px]">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="account">Account</TabsTrigger>
                                    <TabsTrigger value="password">Password</TabsTrigger>
                                </TabsList>
                                <TabsContent value="account">
                                    <Card>
                                    <CardHeader>
                                        <CardTitle>Create Account</CardTitle>
                                        <CardDescription>
                                        Fill in the form to create an account. Click create when you're done.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <AccountCreation />
                                    </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="password">
                                    <Card>
                                    <CardHeader>
                                        <CardTitle>Login</CardTitle>
                                        <CardDescription>
                                        
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <LoginForm />
                                    </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
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