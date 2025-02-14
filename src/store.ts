import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from "react-redux";

import { profileApi } from './features/profile/profileApi';

const store = configureStore({
  reducer: {
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(profileApi.middleware),
})

// This AppDispatch stuff is needed because the `redux-thunk` middleware adds thunk dispatch to `dispatch`
// However, TypeScript doesn't know about this, so we have to tell it about it
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export default store;
