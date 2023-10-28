import React, { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { createAxiosInstance } from '../../api/config/axios'
// import { redirect } from 'react-router-dom';
// import { userActions } from '../../api/users';

export const GoogleAuth = () => {
    const navigate = useNavigate();
    const axiosInstance = createAxiosInstance();
//   const [user, setUser] = useState({
//       access_token: 'ya29.a0AfB_byCJ--iXgMp5CBEeN5AJbdaeUT6qoES0cb1cb0OwkPJeeDQniTvWfO4EAuDiF8AyBDwYJb5oWLE83cGJ4VAh6PgqC52sJX3U5MZ87WdU0XN031-Qq6Vo1ICCaZjh3uhfKzby2liyuqWz-d2Az-fUHDCPkEqmcW5KaCgYKATISARISFQGOcNnCqhvTIno5_1lXxt6_DYVdlA0171',
//       refresh_token: '1//06DgZv91KXp3QCgYIARAAGAYSNwF-L9IrNwuza3mvVY5yKiKpUD8YA34DtlKBdFYB7OoeG7zfYhZG2JA0Oh8Z-wf_reQwhZppqUs',
//       scope: 'https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email',
//       token_type: 'Bearer',
//       id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImEwNmFmMGI2OGEyMTE5ZDY5MmNhYzRhYmY0MTVmZjM3ODgxMzZmNjUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1MDUwMDY5OTQ5NDUtNjM2aDQzN2JzaXZnbWRwcWJhZTg4dXJiZ2plMW8wYnUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1MDUwMDY5OTQ5NDUtNjM2aDQzN2JzaXZnbWRwcWJhZTg4dXJiZ2plMW8wYnUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDk2Nzg5MjYxOTY1NDU3MTMxNDciLCJlbWFpbCI6Im1hcmN1c2JpZGRsZTE2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiUmE0Y0NpcTVoV0ZtZVJJTnBsREYtUSIsIm5hbWUiOiJNYXJjdXMgQmlkZGxlIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lUcXJ1N0xqOHdFOGdVeHRWWXBGcU54OXhTVDBiWG9YOU9yZ1Q0S083N3dwMD1zOTYtYyIsImdpdmVuX25hbWUiOiJNYXJjdXMiLCJmYW1pbHlfbmFtZSI6IkJpZGRsZSIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjk4NDIzMTQ1LCJleHAiOjE2OTg0MjY3NDV9.xGXXwko_mAoJLQbbtJ4Z_w85bQWUQC3iqLT2FAN__jJlnl8Z20qIdDTQOvLvwbAvAov37__6OBaURQAQbUzV3FF_47PiC4Trk4H7a8_5HTPFjBI4TwAutVTwwFlDmlUCuHNLYIKhXyHCRDzWIt-IyMG5_F67iIuofLl3DaDrpw35-60oheZSsNdOwQuyqQlESMz4wOILBwDcRXMSNIU_sRvhK6aOJoDnZbI3bWLFxulO4fmFWXOCPjhjHkt-zB8Zv5skoSnI-5yZjD79d2vF4VbZAtXvlPpMcymeweoZMMICjjloYrxuHxCK5IvCcqFfFit8l5Yu2VNji8UqmutusA',
//       expiry_date: 1698426744714
//   });
  const [token, setToken] = useState(localStorage.getItem('idToken'));

  const handleGoogleSignIn = async (googleId: string) => {
    localStorage.setItem('idToken', googleId); // Store the token in localStorage
    setToken(googleId);
    navigate('/home');
    // We can shove all of this in router dom loader
    // const res = await userActions.findByGoogleId(googleId);
    // console.log(res);
    // if (res) {
    //     redirect('/home');
    // } else {
    //     // user enters a username and create the User.
    //     // redirect back to /home
    //     redirect('/create');
    // }
  };

  const handleSignOut = () => {
    localStorage.removeItem('idToken'); // Remove the token from localStorage
    setToken(null);
    navigate('/');
  };

  // First things should be a sign in/up page using google chrome
  const googleLogin = useGoogleLogin({
    // https://react-oauth.vercel.app/
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
        const response = await axiosInstance.post(
            'http://localhost:3000/auth/google', {
                code: codeResponse.code,
            });

        handleGoogleSignIn(await response.data.id_token);
    },
    onError: errorResponse => console.log(errorResponse),
});
  return (
    <>
      {/* {token && 'successful'} */}
      {token ? 
        <button onClick={() => handleSignOut()}>Sign Out</button>
        :
        <button onClick={() => googleLogin()}>Google sign in</button>
      }
      
    </>
  )
}
