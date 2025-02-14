import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const HOST = "http://localhost:3001"
const API_BASE = `${HOST}/api/v1/`

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
    endpoints: (builder) => ({
        getProfiles: builder.query<unknown, void>({ query: () => 'profiles' }),
        getProfileById: builder.query({ query: (id) => `profile/${id}` }),
        createProfile: builder.mutation({ query: (profile) => ({ url: 'profile', method: 'POST', body: profile }) }),
    }),
});

export const { useGetProfilesQuery, useGetProfileByIdQuery, useCreateProfileMutation } = profileApi;

export default profileApi;