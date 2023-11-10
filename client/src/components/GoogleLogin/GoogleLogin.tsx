import React, { useState, useEffect } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { createAxiosInstance } from '../../api/config/axios';
import './style.css'
import { userActions } from '../../api/users';
import { isUserLoggedIn, showIfOrElse } from '../../helpers/functional';
// import { redirect } from 'react-router-dom';
// import { userActions } from '../../api/users';

// DEPRECATED
export const GoogleAuth = () => {
    const navigate = useNavigate();
    const axiosInstance = createAxiosInstance();

  const [token, setToken] = useState(localStorage.getItem('idToken'));

  const handleGoogleSignIn = async (googleId: string) => {
    localStorage.setItem('idToken', googleId); // Store the token in localStorage
    setToken(googleId);
    const response = await userActions.createUser(googleId);
    console.log('handleGsignIN', response)
    navigate('/home');
  };

  const handleSignOut = () => {
    localStorage.removeItem('idToken'); // Remove the token from localStorage
    setToken(null);
    navigate('/login');
  };

  const googleLogin = useGoogleLogin({
    // https://react-oauth.vercel.app/
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      // MOve to api folder
        const response = await axiosInstance.post(
            'http://localhost:3001/auth/google', {
                code: codeResponse.code,
            });

            console.log('RESPONSE', response)

        handleGoogleSignIn(await response.data.id_token);
    },
    onError: errorResponse => console.log(errorResponse),
});

// remove?
useEffect(() => {

}, [token])

const logoutButton = (
  <div style={{ width: '100%', maxWidth: '100px', position: 'relative' }}>
    <button className='google-logout' onClick={() => handleSignOut()}>Logout</button>
  </div>
)

const loginButton = (
  <div style={{ width: '100%', maxWidth: '200px', position: 'relative'}}>
    <button className='google-signin' onClick={() => googleLogin()}>Login with Google</button>
  </div>
)

  return (
    <>
      {/* {token && 'successful'} */}
      {showIfOrElse(isUserLoggedIn())(logoutButton)(loginButton)}      
    </>
  )
}
