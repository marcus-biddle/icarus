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
import Details from './NEWlayouts/Sections/Details/Details';
import Workout from './NEWlayouts/Sections/Workouts/Workout';
import History from './NEWlayouts/History/History';
import HistoryWeek from './NEWlayouts/History/HistoryWeek';

import { Provider } from 'react-redux';
import { store, persistor } from './app/store'
import { PersistGate } from 'redux-persist/integration/react';
import HistoryYear from './NEWlayouts/History/HistoryYear';
import HistoryMonth from './NEWlayouts/History/HistoryMonth';
import { Feed } from './NEWlayouts/Feed';
import NewLogin from './NEWlayouts/New_Login';
import Practice from './NEWlayouts/Practice';
import { Group } from './NEWlayouts/Group';
import Profile, { profileLoader } from './NEWlayouts/Profile';

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
        path: '/feed',
        element: <Feed />,
      },
      {
        path: '/group',
        element: <Group />,
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
        <RouterProvider router={router} />
    </PersistGate>
  </Provider>
)
