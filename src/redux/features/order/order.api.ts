import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPaymentIntent: builder.mutation({
            query: (data) => ({
                url: "/orders/create-payment-intent",
                method: "POST",
                body: data,
            }),
        }),
        addOrder: builder.mutation({
            query: (data) => ({
                url: "/orders",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["products", "orders"],
        }),
        getUserOrders: builder.query({
            query: (userId) => ({
                url: `/orders/${userId}`,
                method: "GET",
            }),
            providesTags: ["orders"],
        }),
        updateOrderStatusByUser: builder.mutation({
            query: (orderId) => ({
                url: `/orders/cancel/${orderId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["orders"],
        }),
    }),
});

export const {
    useAddOrderMutation,
    useGetUserOrdersQuery,
    useUpdateOrderStatusByUserMutation,
    useCreatePaymentIntentMutation,
} = paymentApi;
