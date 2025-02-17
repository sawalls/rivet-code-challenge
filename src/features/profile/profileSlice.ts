import { createAsyncThunk } from "@reduxjs/toolkit";

// const HOST = "https://codechallenge.rivet.work"
const HOST = "http://localhost:3001";
const API_BASE = `${HOST}/api/v1`;

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
  };
  const outProfile = { ...defaultProfile, ...profile };

  console.log("createNetworkProfile is about to make a POST", profile);
  const returnvalue = await fetch(`${API_BASE}/profile`, {
    method: "POST",
    headers: {
      token: process.env.REACT_APP_API_TOKEN || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(outProfile),
  })
    .then((response) => response.json())
    .then((data) => {
      // do something with the data
      console.log("inside the last then", data);
      return data;
    });

  console.log("got some data", returnvalue);
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

  console.log("updateNetworkProfile is about to make a PUT", profile);
  console.log("stringified version", JSON.stringify(profile));
  const returnvalue = await fetch(`${API_BASE}/profile/${id}`, {
    method: "PUT",
    headers: {
      token: process.env.REACT_APP_API_TOKEN || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  })
    .then((response) => response.json())
    .then((data) => {
      // do something with the data
      console.log("inside the last then", data);
      return data;
    });

  console.log("got some data", returnvalue);
  return returnvalue;
}

export const createProfile = createAsyncThunk(
  "profiles/createProfile",
  (profile: any) => {
    console.log("createProfile called with", profile);
    return createNetworkProfile(profile);
  },
);

export const updateProfile = createAsyncThunk(
  "profiles/updateProfile",
  (args: any) => {
    const { id, profile } = args;
    console.log("updateProfile called with", profile);
    return updateNetworkProfile(id, profile);
  },
);
