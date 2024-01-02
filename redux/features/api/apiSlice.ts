import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: (data) => ({
        url: "refresh",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ accessToken: result.data.accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    loadUser: builder.query({
      query: (data) => ({
        url: "me",
        method: "GET",
        crendetials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              user: result.data.user,
            })
          );
        } catch (err: any) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useLoadUserQuery, useRefreshTokenQuery } = apiSlice;
