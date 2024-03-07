import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { useDispatch, useSelector } from 'react-redux'
import { createUser, fetchUserForLogin } from '../../features/user/userSlice'
import { RootState } from '../../app/store';
import { FaSpinner } from 'react-icons/fa';

const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email address format",
    }),
    password: z.string().min(5, {
        message: "Password must be at least 5 characters"
    }).refine((password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
    }, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
  })

export const LoginForm = () => {
    const dispatch = useDispatch();
    const [ isLoading, setIsLoading ] = useState(false);
    const creationDate = useSelector((state: RootState) => state.user.currentUser?.creationDate);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        dispatch(
            fetchUserForLogin({
                password: values.password,
                email: values.email,
            })
        )
    }

    useEffect(() => {
        if (creationDate) {
            setIsLoading(false);
        }
    }, [creationDate])

  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter a valid email.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                /> 
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>
                                Password must contain at least 5 characters.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className=' w-full flex justify-center'>
                    <Button
                    variant={"default"}
                    className={`relative text-foreground flex items-center justify-center px-4 py-2 w-32 h-10 text-sm  focus:outline-none focus:ring-2 focus:ring-offset-2  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <span className="flex items-center pl-3">
                                <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                <p>Loading...</p>
                            </span>
                        ) 
                        :
                        'Submit'}
                    </Button>
                </div>
            </form>
        </Form>
    </div>
  )
}
