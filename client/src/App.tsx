import React from 'react'
import { Camera } from './components/Camera'
import './App.css'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {
  // First things should be a sign in/up page using google chrome
  const googleLogin = useGoogleLogin({
    // https://react-oauth.vercel.app/
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
        console.log(codeResponse);
        const tokens = await axios.post(
            'http://localhost:3001/auth/google', {
                code: codeResponse.code,
            });

        console.log(tokens);
    },
    onError: errorResponse => console.log(errorResponse),
});
  return (
    <div>
      {false && <Camera />}
      test
      <button onClick={() => googleLogin()}>Google sign in</button>
    </div>
  )
}

export default App
