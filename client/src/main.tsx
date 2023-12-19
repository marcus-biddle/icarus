import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google'; //https://github.com/MomenSherif/react-oauth#usegooglelogin-both-implicit--authorization-code-flow
import HomeLayout from './layouts/Home/HomeLayout';
import { userActions } from './api/users';
import { logsActions } from './api/recentChanges'
import PlayerActivityLayout from './layouts/Stats/PlayerActivityLayout';
import { LoginLayout } from './layouts/LoginLayout';
import LandingPageLayout from './layouts/LandingPage/LandingPageLayout';
import { FilterProvider } from './utilities/providers/FilterProvider';
import UserProfile from './layouts/UserProfile';
import ChartLayout from './layouts/Chart/ChartLayout';
import { ThemeProvider } from './utilities/providers/ThemeProvider';
import { pointsActions } from './api/points';
import { ChatLayout } from './layouts/Chat/ChatLayout';
import { messageActions } from './api/messages';
import { CategoryLayout } from './layouts/Stats/CategoryLayout';
import { eventActions } from './api/events';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <App />
    ),
    loader: async () => {
      const token = localStorage.getItem('idToken');
      return { token: token }
    },
    children: [
      // {
      //   path: '/',
      //   element: <LandingPageLayout />,
      // },
      {
        path: 'home',
        element: <HomeLayout />,
        loader: async () => {
          const [logRes, eventRes, pullRes, ] = await Promise.all([
            logsActions.getLogs(),
            eventActions.getEachEventForAllUsers(),
            userActions.getUser()
          ]);
        
          return {logs: logRes, events: eventRes};
        },
      },
      {
        path: 'leader-board',
        element: (
            <PlayerActivityLayout />
        ),
        loader: async () => {
          const response = await eventActions.getTodaysEventForEachUser();
          const yearResponse = await eventActions.getYearEventForEachUser();
          return { todayActivity: response, yearActivity: yearResponse };
        },
      },
      // {
      //   path: 'leader-board/:table',
      //   element: (
      //     <CategoryLayout />
      //   ),
      //   loader: async () => {
      //     const response = await pushupActions.getAllPushupStats();
      //     return { players: null, wins: null, activities: null, challenges: null};
      //   },
      // },
      // {
      //   path: 'user/:userId',
      //   element: <UserProfile />,
      // },
      // {
      //   path: 'charts',
      //   element: <ChartLayout />,
      //   loader: async () => {
      //     const users = await userActions.getAllUsers();
      //     const pushups = await pushupActions.getAllPushupStats();
      //     return { users,  pushups };
      //   },
      // },
      {
        path: 'login',
        element: <LoginLayout />,
      },
      {
        path: 'chat',
        element: <ChatLayout />,
        loader: async () => {
          const messagesRes = await messageActions.getAllMessages();
          const userRes = await userActions.createUser();
          return { messages: messagesRes.sort((a, b) => {
            const timestampA = new Date(a.timestamp).getTime();
            const timestampB = new Date(b.timestamp).getTime();
            return timestampA - timestampB;
          }), user: userRes };
        },
      },
    ]
  },
]);
// TODO Env variables && vite
ReactDOM.createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={'505006994945-636h437bsivgmdpqbae88urbgje1o0bu.apps.googleusercontent.com'}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
)
