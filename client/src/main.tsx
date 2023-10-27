import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google'; //https://github.com/MomenSherif/react-oauth#usegooglelogin-both-implicit--authorization-code-flow
import HomeLayout from './layouts/HomeLayout';
import UserNameLayout from './layouts/UserNameLayout';
import { userActions } from './api/users';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: 'home',
        element: <HomeLayout />,
        loader: async () => {
          const googleId = localStorage.getItem('idToken') || '';
          return await userActions.findByGoogleId(googleId);
        }
      },
      {
        path: '/create',
        element: <UserNameLayout />,
      }
    ]
  },
]);
// TODO Env variables && vite
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={'505006994945-636h437bsivgmdpqbae88urbgje1o0bu.apps.googleusercontent.com'}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
