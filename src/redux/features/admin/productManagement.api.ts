import { TQueryParam, TResponseRedux } from "../../../types/global.types";
import { baseApi } from "../../api/baseApi";
import { TUser } from "../auth/authSlice";

const productManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/products",
                    method: "GET",
                    params,
                };
            },
            transformResponse: (response: TResponseRedux<TUser[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
            providesTags: ["products"],
        }),
        addProduct: builder.mutation({
            query: (data) => {
                return {
                    url: "/products/create-product",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["products"],
        }),
        deleteProduct: builder.mutation({
            query: (productId) => {
                return {
                    url: `/products/${productId}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["products"],
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useAddProductMutation,
    useDeleteProductMutation,
} = productManagementApi;
