import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer, { UserState } from '../features/user/userSlice.ts'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const reduxPersistActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];
 
const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  user: userReducer,
  // Add more reducers as needed
});
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
 
  export const store = configureStore({ 
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [...reduxPersistActions],
      },
    }),
  });
  export const persistor = persistStore(store)

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// })

// Infer the `RootState` and `AppDispatch` types from the store itself
export interface RootState {
  user: UserState;
  // ... other slices if you have them
}
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch