import { createApi } from "@reduxjs/toolkit/query/react";
import http from "../../http_common";

const axiosBaseQuery =
  () =>
  async ({ url, method, data }) => {
    try {
      const result = await http({ url, method, data });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export const apiSlice = createApi({
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
  }),
});

export const { useCreateUserMutation, useLoginByIdMutation, useLoginMutation } =
  apiSlice;
