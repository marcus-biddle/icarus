import React, { useEffect, useState } from 'react'
import { GiGorilla, GiLaurelCrown, GiLibertyWing } from "react-icons/gi";
import { DynamicIcon } from '../components/Icons/DynamicIcon';
// import { useGoogleAuth } from '../../utilities/hooks/useGoogleAuth';
import { Show } from '../helpers/functional';
import { useDelayedDisplay } from '../utilities/hooks/useDelayedDisplay';
import { GoHourglass } from "react-icons/go";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
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
} from "../components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs"
import { AccountCreation } from '../components/Forms/AccountCreation';
import { LoginForm } from '../components/Forms/LoginForm';


const NewLogin = () => {
    const [ position, nextPosition ] = useState(0);
    const navigate = useNavigate();
    const creationDate = useSelector((state: RootState) => state.user.currentUser?.creationDate);

    useEffect(() => {
    if (creationDate) {
        navigate('/practice')
    }

    }, [creationDate, location.pathname])

  return (
        <div className=' w-full'>
            <Show when={position === 0}>
                <div className='w-full flex justify-center'>
                    <Card className=' w-full md:w-[600px] border-none'>
                        <CardHeader>
                        </CardHeader>
                        <CardContent className='flex justify-evenly mb-8'>
                            <Tabs defaultValue="signup" className="w-[400px]">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="signup">Create</TabsTrigger>
                                    <TabsTrigger value="login">Login</TabsTrigger>
                                </TabsList>
                                <TabsContent value="signup">
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
                                <TabsContent value="login">
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