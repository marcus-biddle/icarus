import { useState} from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { redirect, useNavigate } from 'react-router-dom';
import { createAxiosInstance } from '../../api/config/axios';
import { userActions } from '../../api/users';

export const useGoogleAuth = () => {
    const navigate = useNavigate();
    const axiosInstance = createAxiosInstance();
    const [token, setToken] = useState<string | null>(localStorage.getItem('idToken'));

    const handleGoogleSignIn = async (googleId: string) => {
        if (token === null) {
            localStorage.setItem('idToken', googleId); // Store the token in localStorage
            setToken(googleId);
            const response = await userActions.createUser(googleId);
            console.log('handleGsignIN', response)
        } 
        
        redirect('/home');
    };

    const handleSignOut = () => {
        localStorage.removeItem('idToken'); // Remove the token from localStorage
        setToken(null);
        navigate('/login');
    };

    const handleSignin = useGoogleLogin({
        // https://react-oauth.vercel.app/
        flow: 'auth-code',
        onSuccess: async (codeResponse) => {
        // MOve to api folder
            const response = await axiosInstance.post(
                'http://localhost:3001/auth/google', {
                    code: codeResponse.code,
                });

                console.log('RESPONSE', response)

            await handleGoogleSignIn(await response.data.id_token);
        },
        onError: errorResponse => console.log(errorResponse),
    });

  return { handleSignOut, handleSignin }
}