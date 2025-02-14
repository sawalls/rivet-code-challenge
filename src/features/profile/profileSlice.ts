import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ProfileState } from './profileUtils'

// const HOST = "https://codechallenge.rivet.work"
const HOST = "http://localhost:3001"
const API_BASE = `${HOST}/api/v1`

const fetchAPI = async (path: string) => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "token": process.env.REACT_APP_API_TOKEN || ''
    }
  });
  if (!response.ok) {
    throw new Error('API fetch returned but with non-OK status');
  }
  return response.json();
}

async function returnNetworkProfile(id: number) {
  // I think this might not be the case, but in imaginary-land, the full profile is bigger than the profile returned by /profiles
  return await fetchAPI(`profile/${id}`);
}

// TODO: clean all these network requests to use try except instead of .then chaining
async function createNetworkProfile(profile: any) {
  const defaultProfile = {
    first_name: null,
    last_name: null,
    phone: null,
    email: "foo@foo.com",
    address: null,
    city: null,
    state: null,
    zip: 48188,
    photo: null,
    notes: null,
  }
  const outProfile = {...defaultProfile, ...profile};

  console.log('createNetworkProfile is about to make a POST', profile)
  const returnvalue = await fetch(`${API_BASE}/profile`, {
    method: 'POST',
    headers: {
      "token": process.env.REACT_APP_API_TOKEN || '',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(outProfile),
  })
  .then((response) => response.json())
  .then((data) => {
    // do something with the data
    console.log('inside the last then', data)
    return data;
  })

  console.log('got some data', returnvalue);
  return returnvalue;
}

async function updateNetworkProfile(id: number, profile: any) {
  // const defaultProfile = {
  //   first_name: null,
  //   last_name: null,
  //   phone: null,
  //   email: "foo@foo.com",
  //   address: null,
  //   city: null,
  //   state: null,
  //   zip: 48188,
  //   photo: null,
  //   notes: null,
  // }
  // const outProfile = {...defaultProfile, ...profile};

  console.log('updateNetworkProfile is about to make a PUT', profile)
  console.log('stringified version', JSON.stringify(profile))
  const returnvalue = await fetch(`${API_BASE}/profile/${id}`, {
    method: 'PUT',
    headers: {
      "token": process.env.REACT_APP_API_TOKEN || '',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  })
  .then((response) => response.json())
  .then((data) => {
    // do something with the data
    console.log('inside the last then', data)
    return data;
  })

  console.log('got some data', returnvalue);
  return returnvalue;
}

export const fetchProfile = createAsyncThunk('profiles/fetchProfile', (id: number) => {
  console.log('fetchProfile called with', id);
  return returnNetworkProfile(id);
});

export const createProfile = createAsyncThunk('profiles/createProfile', (profile: any) => {
  console.log('createProfile called with', profile);
  return createNetworkProfile(profile);
});

export const updateProfile = createAsyncThunk('profiles/updateProfile', (args: any) => {
  const { id, profile } = args;
  console.log('updateProfile called with', profile);
  return updateNetworkProfile(id, profile);
});

const initialState = {
  profiles: [],
  inFocus: null,
  status: null,
  error: null,
} as ProfileState;

export const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      return {
        ...state,
        inFocus: action.payload,
      }
    });
  },
});

export default profileSlice.reducer;
