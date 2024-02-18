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
  const profiles = await fetch("https://codechallenge.rivet.work/api/v1/profile/{number}", {
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


export const fetchProfiles = createAsyncThunk('users/fetchProfiles', () => {
  //return returnFakeProfiles();
  return returnNetworkProfiles();
})


export const fetchProfile = createAsyncThunk('users/fetchProfile', (id: number) => {
  return returnNetworkProfile(id);
})

export const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setActiveProfile: (state, action) => {
      const id = action.payload;
      
      const found = state.profiles.find((item)=>item.id==id);
      state.inFocus = found || null;
      // TODO: I do not know what the line below this is
      // state.settings.customTopics.topicsSortType.name = action.payload.name;
    },
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
        profile: action.payload
      }
    });
  },
})

// Action creators are generated for each case reducer function
export const { setActiveProfile } = profileSlice.actions;
export const profileList = (state: RootState) => state.profile.profiles;
export const countProfiles = (state: RootState) => state.profile.profiles.length as number;
export const currentProfile = (state: RootState) => state.profile.inFocus;

export default profileSlice.reducer;