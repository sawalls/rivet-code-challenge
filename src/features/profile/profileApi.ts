import type { TypedUseMutationResult } from "@reduxjs/toolkit/query/react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Profile, ProfileNoId } from "./profileUtils";

const HOST = "http://localhost:3001";
const API_BASE = `${HOST}/api/v1/`;

const baseQuery = fetchBaseQuery({ baseUrl: API_BASE });

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQuery,
  tagTypes: ["Profile"],
  // note: went back and forth on having backend responses validated and decided for performance it would be better to fail on access
  // keep in mind that means there can be lots of "impossible" types in the frontend if the backend is misbehaving
  endpoints: (builder) => ({
    getProfiles: builder.query<Profile[], void>({
      query: () => "profiles",
      providesTags: (result) =>
        result
          ? [
              { type: "Profile", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Profile" as const, id })),
            ]
          : [{ type: "Profile", id: "LIST" }],
    }),
    getProfileById: builder.query<Profile, number>({
      query: (id) => `profile/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Profile", id }],
    }),
    createProfile: builder.mutation<void, ProfileNoId>({
      query: (profile) => ({ url: "profile", method: "POST", body: profile }),
      invalidatesTags: [{ type: "Profile", id: "LIST" }],
    }),
    editProfile: builder.mutation<void, { id: number; profile: ProfileNoId }>({
      query: ({ id, profile }) => ({
        url: `profile/${id}`,
        method: "PUT",
        body: profile,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Profile", id },
        { type: "Profile", id: "LIST" },
      ],
    }),
  }),
});

// TypedUseMutationResult is provided because type inference fails if you try ReturnType<typeof useCreateProfileMutation> or similar
// https://github.com/reduxjs/redux-toolkit/pull/2276
// So I manually make types for these two mutations since I'll pass them to ProfileCreateEdit
export type UseCreateProfileResult = TypedUseMutationResult<
  void,
  ProfileNoId,
  typeof baseQuery
>;
export type UseEditProfileResult = TypedUseMutationResult<
  void,
  { id: number; profile: ProfileNoId },
  typeof baseQuery
>;
export type UseCreateProfileMutation = Readonly<
  [ReturnType<typeof useCreateProfileMutation>[0], UseCreateProfileResult]
>;
export type UseEditProfileMutation = Readonly<
  [ReturnType<typeof useEditProfileMutation>[0], UseEditProfileResult]
>;

export const {
  useGetProfilesQuery,
  useGetProfileByIdQuery,
  useCreateProfileMutation,
  useEditProfileMutation,
} = profileApi;

export default profileApi;
