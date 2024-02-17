import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './features/profile/profileSlice'

const store = configureStore({
  reducer: {
    profile: profileReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export default store;
