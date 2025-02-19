import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Profile, ProfileNoId } from "./profileUtils";

const HOST = "http://localhost:3001";
const API_BASE = `${HOST}/api/v1/`;

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  // note: went back and forth on having backend responses validated and decided for performance it would be better to fail on access
  // keep in mind that means there can be lots of "impossible" types in the frontend if the backend is misbehaving
  endpoints: (builder) => ({
    getProfiles: builder.query<Profile[], void>({ query: () => "profiles" }),
    getProfileById: builder.query<Profile, number>({
      query: (id) => `profile/${id}`,
    }),
    createProfile: builder.mutation<void, ProfileNoId>({
      query: (profile) => ({ url: "profile", method: "POST", body: profile }),
    }),
    editProfile: builder.mutation<void, { id: number; profile: ProfileNoId }>({
      query: ({ id, profile }) => ({
        url: `profile/${id}`,
        method: "PUT",
        body: profile,
      }),
    }),
  }),
});

export const {
  useGetProfilesQuery,
  useGetProfileByIdQuery,
  useCreateProfileMutation,
  useEditProfileMutation,
} = profileApi;

export default profileApi;
