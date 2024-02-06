
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { createAxiosInstance } from '../../api/config/axios';
import { useDispatch } from 'react-redux';
import { createUser } from '../../features/user/userSlice';
// import { setGoogleId } from '../../features/user/userSlice';

export const useGoogleAuth = ({ selectedItems, username }: {selectedItems: string[], username: string}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const axiosInstance = createAxiosInstance();

    const handleGoogleSignIn = async (googleId: string) => {
            if (selectedItems.length >= 1) {
                dispatch(
                    createUser({
                        googleId: googleId, 
                        selectedItems: selectedItems, 
                        username: username
                    })
                )
            } else {
                navigate('/duo/login')
            }
    };

    const handleSignOut = () => {
        // localStorage.removeItem('idToken'); // Remove the token from localStorage
        // setToken(null);
        navigate('/');
    };

    const handleSignin = useGoogleLogin({
        // https://react-oauth.vercel.app/
        flow: 'auth-code',
        onSuccess: async (codeResponse) => {
        // MOve to api folder
            const response = await axiosInstance.post(
                'https://icarus-server.onrender.com/auth/google', {
                    code: codeResponse.code,
                });

                console.log('RESPONSE', response)

            await handleGoogleSignIn(await response.data.id_token);
        },
        onError: errorResponse => console.log(errorResponse),
    });

  return { handleSignOut, handleSignin }
}