import { baseApi } from "../../api/baseApi";

const orderManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => ({
                url: `/orders/`,
                method: "GET",
            }),
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
