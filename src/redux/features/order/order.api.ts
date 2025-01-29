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
        }),
    }),
});

export const { useCreatePaymentIntentMutation, useAddOrderMutation } =
    paymentApi;
