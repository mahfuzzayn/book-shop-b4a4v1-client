/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Button,
    Flex,
    Modal,
    Pagination,
    Spin,
    Table,
    TableColumnsType,
    TableProps,
} from "antd";
import { useState } from "react";
import { TUser } from "../../types/userManagement.types";
import { TProduct, TQueryParam, TResponse } from "../../types";
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    ExclamationCircleFilled,
} from "@ant-design/icons";
import { toast } from "sonner";
import { toastStyles } from "../../constants/toaster";
import {
    useDeleteProductMutation,
    useGetAllProductsQuery,
} from "../../redux/features/admin/productManagement.api";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

type TTableData = Pick<
    TProduct,
    "_id" | "title" | "author" | "quantity" | "inStock"
>;

const Products = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [page, setPage] = useState(1);
    const [deleteProduct] = useDeleteProductMutation();
    const { confirm } = Modal;

    const showDeleteConfirm = (productId: string) => {
        confirm({
            title: "Are you sure delete this product?",
            icon: <ExclamationCircleFilled />,
            content: "This cannot be undone",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            async onOk() {
                try {
                    const toastId = toast.loading("Deleting product...", {
                        style: toastStyles.loading,
                    });

                    const res = (await deleteProduct(
                        productId
                    )) as TResponse<TUser>;

                    if (res.error) {
                        toast.error(res.error.data.message, {
                            id: toastId,
                            style: toastStyles.loading,
                        });
                    } else {
                        toast.success("Product deleted", { id: toastId });
                    }
                } catch (error) {
                    toast.error("Something went wrong", {
                        style: toastStyles.error,
                    });
                }
            },
        });
    };

    const {
        data: productsData,
        isLoading,
        isFetching,
        isError,
    } = useGetAllProductsQuery([
        { name: "limit", value: 5 },
        { name: "page", value: page },
        { name: "sort", value: "-quantity" },
        ...params,
    ]);

    const metaData = productsData?.meta;

    const tableData = productsData?.data?.map(
        ({ _id, title, author, quantity, inStock }) => ({
            key: _id,
            _id,
            title,
            author,
            quantity,
            inStock: inStock ? `${quantity} left` : "Unavailable",
        })
    );

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "Author",
            dataIndex: "author",
        },
        {
            title: "Availability",
            dataIndex: "inStock",
        },
        {
            title: "Action",
            key: "x",
            render: (item) => {
                return (
                    <Flex gap={10}>
                        <Button type="primary" className="!bg-primary">
                            <Link to={`detail/${item._id}`}>View Details</Link>
                        </Button>
                        <Button type="primary" className="!bg-dark">
                            <Link to={`update/${item._id}`}>Update</Link>
                        </Button>
                        <Button
                            onClick={() => showDeleteConfirm(item._id)}
                            type="primary"
                            className="!bg-red-500"
                        >
                            Delete
                        </Button>
                    </Flex>
                );
            },
            width: "1%",
        },
    ];

    const onChange: TableProps<TTableData>["onChange"] = (
        pagination,
        filters,
        sorter,
        extra
    ) => {
        if (extra.action === "filter") {
            const queryParams: TQueryParam[] = [];

            filters.name?.forEach((item) =>
                queryParams.push({ name: "name", value: item })
            );
            filters.year?.forEach((item) =>
                queryParams.push({ name: "year", value: item })
            );

            setParams(queryParams);
        }

        if (pagination || sorter) return;
    };

    if (isLoading)
        return (
            <>
                <Helmet>
                    <title>Products ‣ Book Shop</title>
                    <meta
                        name="description"
                        content="Admin dashboard for managing your book store inventory. Edit, update, or remove books from your store anytime."
                    />
                </Helmet>
                <div className="flex justify-center items-center min-h-screen">
                    <Spin size="large" />
                </div>
            </>
        );

    if (isError)
        return (
            <>
                <Helmet>
                    <title>Products ‣ Book Shop</title>
                    <meta
                        name="description"
                        content="Admin dashboard for managing your book store inventory. Edit, update, or remove books from your store anytime."
                    />
                </Helmet>
                <div className="flex flex-col justify-center items-center min-h-screen gap-y-5">
                    <h2 className="text-2xl font-semibold">
                        Failed to load your Orders
                    </h2>
                    <Link to="/admin/dashboard">
                        <Button type="primary" className="!bg-primary">
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>
            </>
        );

    return (
        <>
            <Helmet>
                <title>
                    Products{" "}
                    {productsData ? `(${productsData?.data?.length})` : ""} ‣
                    Book Shop
                </title>
                <meta
                    name="description"
                    content="Admin dashboard for managing your book store inventory. Edit, update, or remove books from your store anytime."
                />
            </Helmet>
            <div className="p-8 mb-16">
                <div className="flex flex-col md:flex-row items-start gap-y-3 gap-x-3 mb-4">
                    <Link to="/admin/dashboard">
                        <Button type="primary" className="!bg-primary">
                            <ArrowLeftOutlined />
                            Dashboard
                        </Button>
                    </Link>
                    <h2 className="text-3xl !font-bold">Products</h2>
                    <Link to="create-product">
                        <Button type="primary" className="!bg-secondary">
                            Create Product <ArrowRightOutlined />
                        </Button>
                    </Link>
                </div>
                <Table
                    loading={isFetching}
                    columns={columns}
                    dataSource={tableData}
                    onChange={onChange}
                    pagination={false}
                    className="mt-10"
                    scroll={{ x: "max-content" }}
                />
                <Flex justify="center" className="!mt-5 !my-10">
                    <Pagination
                        current={page}
                        onChange={(value) => setPage(value)}
                        pageSize={metaData?.limit}
                        total={metaData?.total}
                    />
                </Flex>
            </div>
        </>
    );
};

export default Products;
