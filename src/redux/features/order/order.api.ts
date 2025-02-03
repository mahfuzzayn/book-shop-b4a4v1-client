import { TOrder, TQueryParam, TResponseRedux } from "../../../types";
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
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.params.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: `/orders/${args.userId}`,
                    method: "GET",
                    params,
                };
            },
            transformResponse: (response: TResponseRedux<TOrder[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
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
