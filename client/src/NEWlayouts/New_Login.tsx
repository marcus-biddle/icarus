import React, { useEffect, useState } from 'react'
import { Show } from '../helpers/functional';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
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
    const navigate = useNavigate();
    const creationDate = useSelector((state: RootState) => state.user.currentUser?.creationDate);

    useEffect(() => {
    if (creationDate) {
        navigate('/train')
    }

    }, [creationDate, location.pathname])

  return (
        <div className=' w-full'>
                <div className='w-full flex justify-center'>
                    <Card className=' w-full md:w-[600px] border-none'>
                        <CardHeader>
                        </CardHeader>
                        <CardContent className='flex justify-evenly mb-8'>
                            <Tabs defaultValue="login" className="w-[400px]">
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
        </div>
  )
}

export default NewLogin