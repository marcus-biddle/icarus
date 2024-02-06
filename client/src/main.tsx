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
import LandingPageLayout from './layouts/LandingPage/LandingPageLayout';
import { ChatLayout } from './layouts/Chat/ChatLayout';
import { messageActions } from './api/messages';
import { eventActions } from './api/events';
import { UserLayout } from './layouts/User/UserLayout';
import HomeLevel1 from './NEWlayouts/Sections/HomeLevel1';
import Leaderboard from './NEWlayouts/Leaderboard/Leaderboard';
import Details from './NEWlayouts/Sections/Details/Details';
import Workout from './NEWlayouts/Sections/Workouts/Workout';
import History from './NEWlayouts/History/History';
import HistoryWeek from './NEWlayouts/History/HistoryWeek';
import Practice from './NEWlayouts/Practice/Practice';

import { Provider } from 'react-redux';
import { store, persistor } from './app/store'
import { PersistGate } from 'redux-persist/integration/react';
import NewLogin from './NEWlayouts/Login/New_Login';
import HistoryYear from './NEWlayouts/History/HistoryYear';
import HistoryMonth from './NEWlayouts/History/HistoryMonth';
import Profile, { profileLoader } from './NEWlayouts/Profile/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <App />
    ),
    // loader: async () => {
    //   const token = localStorage.getItem('idToken');
    //   return { token: token }
    // },
    children: [
      {
        path: '/',
        element: <LandingPageLayout />,
      },
      {
        path: '/login',
        element: <NewLogin />,
      },
      {
        path: '/sections',
        element: <HomeLevel1 />,
      },
      {
        path: '/workout',
        element: <Workout />,
      },
      {
        path: '/practice',
        element: <Practice />,
      },
      {
        path: '/history',
        element: <History />,
      },
      {
        path: '/history/week',
        element: <HistoryWeek />,
      },
      {
        path: '/history/year',
        element: <HistoryYear />,
      },
      {
        path: '/history/month',
        element: <HistoryMonth />,
      },
      {
        path: '/sections/details/:sectionId',
        element: <Details />,
      },
      {
        path: '/leaderboard',
        element: <Leaderboard />,
      },
      {
        path: '/user/:userId',
        element: <Profile />,
        loader: profileLoader,
      },
    ]
  },
]);
// TODO Env variables && vite
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId={'505006994945-636h437bsivgmdpqbae88urbgje1o0bu.apps.googleusercontent.com'}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
)
