import { TCartData, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query({
            query: (userId) => ({
                url: `/carts/${userId}`,
                method: "GET",
            }),
            transformResponse: (response: TResponseRedux<TCartData[]>) => {
                return {
                    data: response.data,
                };
            },
            providesTags: ["cart"],
        }),
        addItem: builder.mutation({
            query: (data) => ({
                url: "/carts",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["cart"],
        }),
        removeItem: builder.mutation({
            query: (data) => ({
                url: "/carts",
                method: "DELETE",
                body: data,
            }),
            invalidatesTags: ["cart"],
        }),
        updateQuantity: builder.mutation({
            query: (data) => ({
                url: "/carts",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["cart"],
        }),
        clearCart: builder.mutation({
            query: (data) => ({
                url: "/carts/clear",
                method: "DELETE",
                body: data,
            }),
            invalidatesTags: ["cart"],
        }),
    }),
});

export const {
    useGetCartQuery,
    useAddItemMutation,
    useRemoveItemMutation,
    useUpdateQuantityMutation,
    useClearCartMutation,
} = cartApi;
