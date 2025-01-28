/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Button,
    Flex,
    Modal,
    Pagination,
    Table,
    TableColumnsType,
    TableProps,
} from "antd";
import { useState } from "react";
import { TUser } from "../../types/userManagement.types";
import { TProduct, TQueryParam, TResponse } from "../../types";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { toast } from "sonner";
import { toastStyles } from "../../constants/toaster";
import {
    useDeleteProductMutation,
    useGetAllProductsQuery,
} from "../../redux/features/admin/productManagement.api";
import { Link } from "react-router-dom";

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
                        toast.success("Deleted product", { id: toastId });
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
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Table
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                onChange={onChange}
                pagination={false}
            />
            <Flex justify="center" style={{ marginTop: "10px" }}>
                <Pagination
                    current={page}
                    onChange={(value) => setPage(value)}
                    pageSize={metaData?.limit}
                    total={metaData?.total}
                />
            </Flex>
        </>
    );
};

export default Products;
