import { TOrder, TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const orderManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: `/orders/`,
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
        updateOrderStatusByAdmin: builder.mutation({
            query: (args) => ({
                url: `/orders/${args.orderId}`,
                method: "PATCH",
                body: args.data,
            }),
            invalidatesTags: ["orders"],
        }),
        deleteOrder: builder.mutation({
            query: (orderId) => ({
                url: `/orders/${orderId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["orders"],
        }),
    }),
});

export const {
    useGetAllOrdersQuery,
    useUpdateOrderStatusByAdminMutation,
    useDeleteOrderMutation,
} = orderManagementApi;
