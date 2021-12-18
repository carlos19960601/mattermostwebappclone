import { createApi } from "@reduxjs/toolkit/query/react";
import http from "../../http_common";

const axiosBaseQuery =
  (args, thunkApi, extraOptions) =>
  async ({ url, method, data }) => {
    try {
      const result = await http.doFetch({ url, method, data });
      if (result.headers["token"]) {
        http.setToken(result.headers["token"]);
      }
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: ({ user, token, inviteId, redirectTo }) => ({
        url: `/users?token=${token}&inviteId=${inviteId}`,
        method: "POST",
        data: user,
      }),
    }),
    loginById: builder.mutation({
      query: ({ id, password }) => ({
        url: "/users/login",
        method: "POST",
        data: {
          id,
          password,
        },
      }),
    }),
    login: builder.mutation({
      query: ({ loginId, password, token = "", deviceId = "" }) => ({
        url: "/users/login",
        method: "POST",
        data: {
          device_id: deviceId,
          login_id: loginId,
          password,
          token,
        },
      }),
    }),
    getRolesByNames: builder.mutation({
      query: ({ rolesNames }) => ({
        url: "/roles/names",
        method: "POST",
        data: rolesNames,
      }),
    }),
    checkIsTeamExists: builder.mutation({
      query: (teamName) => ({
        url: `/teams/name/${teamName}/exists`,
        method: "GET",
      }),
    }),
    createTeam: builder.mutation({
      query: (team) => ({
        url: "/teams",
        method: "POST",
        data: team,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginByIdMutation,
  useLoginMutation,
  useGetRolesByNamesMutation,
  useCheckIsTeamExistsMutation,
  useCreateTeamMutation,
} = api;
