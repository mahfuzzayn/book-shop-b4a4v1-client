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
        getUser: builder.query({
            query: (userId) => ({
                url: `/users/me/${userId}`,
                method: "GET",
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

export const {
    useLoginUserMutation,
    useGetUserQuery,
    useRegisterUserMutation,
} = authApi;
