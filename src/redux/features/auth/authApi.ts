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
            providesTags: ["user"],
        }),
        updateUser: builder.mutation({
            query: (args) => ({
                url: `/users/update-user/${args.userId}`,
                method: "PATCH",
                body: args.data,
            }),
            invalidatesTags: ["user"],
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
    useUpdateUserMutation,
    useRegisterUserMutation,
} = authApi;
