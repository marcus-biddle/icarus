import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google'; //https://github.com/MomenSherif/react-oauth#usegooglelogin-both-implicit--authorization-code-flow
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
    children: [
      {
        path: '/',
        element: <NewLogin />,
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
      <GoogleOAuthProvider clientId={'352965571009-thr1jubafej7u7k33rft4gtn73l57scv.apps.googleusercontent.com'}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
)
