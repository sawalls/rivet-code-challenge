import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isArray } from 'lodash'

import { ProfileState, makeFakeUserList } from './profileUtils'
import { RootState } from '../../store';

const initialState = {
  profiles: [],
  inFocus: null,
} as ProfileState;

function returnFakeProfiles() {
  const profiles = makeFakeUserList();
  console.log('got some [fake] data', profiles);
  return profiles;
}

async function returnNetworkProfiles() {
  const profiles = await fetch("https://codechallenge.rivet.work/api/v1/profiles", {
    headers: {
      "token": process.env.REACT_APP_API_TOKEN || ''
    }
  })
  .then((response) => response.json())
  .then((data) => {
    // do something with the data
    return data;
  })

  console.log('got some data', profiles);
  if (isArray(profiles)) {
    return profiles;
  }
  return [profiles];
}

async function returnNetworkProfile(id: number) {
  // I think this might not be the case, but in imaginary-land, the full profile is bigger than the profile returned by /profiles
  console.log('returnNetworkProfile is about to await', id)
  const profile = await fetch(`https://codechallenge.rivet.work/api/v1/profile/${id}`, {
    headers: {
      "token": process.env.REACT_APP_API_TOKEN || ''
    }
  })
  .then((response) => response.json())
  .then((data) => {
    // do something with the data
    console.log('inside the last then', data)
    return data;
  })

  console.log('got some data', profile);
  return profile;
}


export const fetchProfiles = createAsyncThunk('users/fetchProfiles', () => {
  //return returnFakeProfiles();
  return returnNetworkProfiles();
})


export const fetchProfile = createAsyncThunk('users/fetchProfile', (id: number) => {
  console.log('fetchProfile called with', id);
  return returnNetworkProfile(id);
})

export const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(fetchProfiles.fulfilled, (state, action) => {
      return {
        ...state,
        profiles: action.payload
      }
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      return {
        ...state,
        inFocus: action.payload,
      }
    });
  },
})

// Action creators are generated for each case reducer function
export const { } = profileSlice.actions;
export const profileList = (state: RootState) => state.profile.profiles;
export const countProfiles = (state: RootState) => state.profile.profiles.length as number;
export const currentProfile = (state: RootState) => state.profile.inFocus;

export default profileSlice.reducer;