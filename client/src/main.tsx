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
import { pushupActions } from './api/pushups';
import { ThemeProvider } from './utilities/providers/ThemeProvider';
import { pointsActions } from './api/points';
import { ChatLayout } from './layouts/Chat/ChatLayout';
import { messageActions } from './api/messages';

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
          const [logRes, pushupRes, pushupListRes, userExpRes, userInfoRes] = await Promise.all([
            logsActions.getLogs(), 
            pushupActions.getUserPushupStats(),
            pushupActions.getAllPushupStats(),
            pointsActions.getUserPoints(),
            userActions.getUser()
          ]);
          const sortedResponse = logRes !== null && [...logRes].sort((a, b) => {
            const dateA = new Date(a.timestamp).getTime();
            const dateB = new Date(b.timestamp).getTime();
        
            // Sort in descending order (most recent first)
            return dateB - dateA;
          }) || null;
        
          return {user: userInfoRes, logs: sortedResponse, pushups: pushupRes[0], expPoints: userExpRes, users: pushupListRes.sort((a, b) => a.totalPushupsThisMonth - b.totalPushupsThisMonth ) };
        },
      },
      {
        path: 'leader-board',
        element: (
          <FilterProvider>
            <PlayerActivityLayout />
          </FilterProvider>
        ),
        loader: async () => {
          const response = await pushupActions.getAllPushupStats();
          return { players: null, wins: null, activities: null, challenges: null};
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
          const pushups = await pushupActions.getAllPushupStats();
          return { users,  pushups };
        },
      },
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
