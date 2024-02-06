
import { useGoogleLogin } from '@react-oauth/google';
import { createAxiosInstance } from '../../api/config/axios';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../features/user/userSlice';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { RootState } from '@/app/store';
import { useNavigate } from 'react-router';

function isWithinLastTwoMinutes(timestamp: number) {
    // Get the current timestamp in milliseconds
    const currentTimestamp = Date.now();
    
    // Calculate the difference between the current timestamp and the given timestamp
    const difference = currentTimestamp - timestamp;
  
    // Convert 2 minutes to milliseconds
    const twoMinutesInMillis = 30 * 1000;
  
    // Check if the difference is within the last 2 minutes
    return difference <= twoMinutesInMillis;
  }

export const useGoogleAuth = () => {
    const [googleId, setGoogleId] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const creationDate = useSelector((state: RootState) => state.user.currentUser?.creationDate) || 0;
    const userId = useSelector((state: RootState) => state.user.currentUser?.id);
    const axiosInstance = createAxiosInstance();

    useEffect(() => {
        if (googleId && username) {
            dispatch(
                createUser({
                    googleId: googleId, 
                    selectedItems: ['pushups', 'pullups', 'running'], 
                    username: username
                })
            )

            if (creationDate) {
                navigate(`/user/${userId}`)
            }
        }

        if (isWithinLastTwoMinutes(creationDate)) {
            toast.success(`${username} successfully joined the group.`)
        }
    }, [googleId, username, creationDate])

    const handleGoogleSignIn = (userName: string) => {
        console.log('handlesignin')
        openGoogleModal();
        setUsername(userName);
    };

    const openGoogleModal = useGoogleLogin({
        // https://react-oauth.vercel.app/
        flow: 'auth-code',
        onSuccess: async (codeResponse) => {
        // MOve to api folder
            const response = await axiosInstance.post(
                'http://localhost:3000/auth/google', {
                    code: codeResponse.code,
                });

                console.log('GOOGLE RESPONSE', response)

                setGoogleId(await response.data.id_token)
        },
        onError: errorResponse => console.log('this fail', errorResponse),
    });

  return { handleGoogleSignIn }
}