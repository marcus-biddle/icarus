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
import { logsActions } from './api/recentChanges'
import PlayerActivityLayout from './layouts/PlayerActivityLayout';
import { LoginLayout } from './layouts/LoginLayout';
import LandingPageLayout from './layouts/LandingPageLayout';
import { FilterProvider } from './utilities/providers/FilterProvider';
import UserProfile from './layouts/UserProfile';
import ChartLayout from './layouts/ChartLayout';
import { pushupActions } from './api/pushups';
import { ThemeProvider } from './utilities/providers/ThemeProvider';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ThemeProvider>
        <App />
      </ThemeProvider>
    ),
    loader: async () => {
      const token = localStorage.getItem('idToken');
      return { token: token }
    },
    children: [
      {
        path: '/',
        element: <LandingPageLayout />,
      },
      {
        path: 'home',
        element: <HomeLayout />,
        loader: async () => {
          // const token = localStorage.getItem('idToken') || '';
          const response = await logsActions.getLogs();
          const pushups = await pushupActions.getPushupStats();
          if (response === null || !pushups) return null;
          const sortedResponse = [...response].sort((a, b) => {
            const dateA = new Date(a.timestamp).getTime();
            const dateB = new Date(b.timestamp).getTime();
        
            // Sort in descending order (most recent first)
            return dateB - dateA;
          });
        
          return {recentChanges: sortedResponse, pushups: pushups };
        },
      },
      {
        path: 'create',
        element: <RegisterLayout />,
        action: usernameAction
      },
      {
        path: 'leader-board',
        element: (
          <FilterProvider>
            <PlayerActivityLayout />
          </FilterProvider>
        ),
        loader: async () => {
          const response = await pushupActions.getPushupStats();
          return response;
        },
      },
      {
        path: 'user/:userId',
        element: <UserProfile />,
      },
      {
        path: 'charts',
        element: <ChartLayout />,
        loader: async () => {
          const users = await userActions.getAllUsers();
          const pushups = await pushupActions.getPushupStats();
          return { users,  pushups };
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
