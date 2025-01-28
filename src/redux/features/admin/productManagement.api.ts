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
        getAllAuthors: builder.query({
            query: () => {
                return {
                    url: "/products/authors",
                    method: "GET",
                };
            },
        }),
        getSingleProduct: builder.query({
            query: (productId) => {
                return {
                    url: `/products/${productId}`,
                    method: "GET",
                };
            },
            providesTags: ["singleProduct"],
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
        updateProduct: builder.mutation({
            query: (args) => {
                return {
                    url: `/products/${args.productId}`,
                    method: "PATCH",
                    body: args.data,
                };
            },
            invalidatesTags: ["singleProduct", "products"],
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
    useGetAllAuthorsQuery,
    useAddProductMutation,
    useDeleteProductMutation,
    useGetSingleProductQuery,
    useUpdateProductMutation,
} = productManagementApi;
