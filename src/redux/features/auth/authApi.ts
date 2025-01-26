import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (userData) => ({
                url: "/auth/login",
                method: "POST",
                body: userData,
            }),
        }),
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "/users/register-user",
                method: "POST",
                body: userData,
            }),
        }),
    }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
