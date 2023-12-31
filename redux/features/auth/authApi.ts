import { apiSlice } from "../api/apiSlice";
import { userRegistration, userLoggedIn, userLoggedOut } from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "activate-user",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => {
        return {
          url: "login",
          method: "POST",
          body: { email, password },
          credentials: "include" as const,
        };
      },
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    SocialAuth: builder.mutation({
      query: ({ email, name, avatar }) => {
        return {
          url: "social-auth",
          method: "POST",
          body: { email, name, avatar },
          credentials: "include" as const,
        };
      },

      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    logOut: builder.query({
      query: () => {
        return {
          url: "logout",
          method: "GET",
          credentials: "include" as const,
        };
      },

      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogOutQuery,
} = authApi;
