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
import {usernameAction, RegisterLayout} from './layouts/RegisterLayout';
import { userActions } from './api/users';
import { recentChangesActions } from './api/recentChanges'
import PlayerActivityLayout from './layouts/PlayerActivityLayout';
import { LoginLayout } from './layouts/LoginLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      const token = localStorage.getItem('idToken');
      return { token: token }
    },
    children: [
      {
        path: 'home',
        element: <HomeLayout />,
        loader: async () => {
          const response = await recentChangesActions.getAllRecentChanges();
          return response;
        },
      },
      {
        path: 'create',
        element: <RegisterLayout />,
        action: usernameAction
      },
      {
        path: 'players',
        element: <PlayerActivityLayout />,
        loader: async () => {
          const response = await userActions.getAllUsers();
          return response;
        },
      },
      {
        path: 'login',
        element: <LoginLayout />,
      },
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
