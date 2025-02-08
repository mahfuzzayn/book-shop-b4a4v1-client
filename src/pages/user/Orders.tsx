/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Table,
    Select,
    Spin,
    Tag,
    Button,
    Pagination,
    Flex,
    TableProps,
} from "antd";
import { useState } from "react";
import { toast } from "sonner";
import { toastStyles } from "../../constants/toaster";
import {
    useGetUserOrdersQuery,
    useUpdateOrderStatusByUserMutation,
} from "../../redux/features/order/order.api";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useGetUserQuery } from "../../redux/features/auth/authApi";
import { TOrder, TQueryParam, TResponse } from "../../types";
import { Helmet } from "react-helmet-async";

type TTableData = Pick<
    TOrder,
    | "_id"
    | "items"
    | "total"
    | "userId"
    | "transactionId"
    | "status"
    | "createdAt"
>;

const statusColors: Record<string, string> = {
    pending: "gold",
    confirmed: "blue",
    shipped: "purple",
    delivered: "green",
    cancelled: "red",
};

const validStatusTransitions: Record<string, string[]> = {
    pending: ["cancelled"],
    confirmed: ["cancelled"],
    shipped: ["cancelled"],
    delivered: [],
    cancelled: [],
};

const Orders = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [page, setPage] = useState(1);
    const user = useAppSelector(selectCurrentUser);
    const userId = user?.userId;
    const { data: userInfo } = useGetUserQuery(userId);

    const userData = userInfo?.data;

    const {
        data: ordersData,
        isLoading,
        isFetching,
        isError,
    } = useGetUserOrdersQuery({
        userId,
        params: [
            { name: "limit", value: 5 },
            { name: "page", value: page },
            { name: "sort", value: "-createdAt" },
            ...params,
        ],
    });

    const metaData = ordersData?.meta;

    const [updateOrder] = useUpdateOrderStatusByUserMutation(undefined);
    const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

    const handleStatusChange = async (
        orderId: string,
        currentStatus: string,
        newStatus: string
    ) => {
        if (!validStatusTransitions[currentStatus]?.includes(newStatus)) {
            toast.error(
                `Cannot change status from ${currentStatus} to ${newStatus}`,
                { style: toastStyles.error }
            );
            return;
        }

        setUpdatingOrderId(orderId);

        const toastId = toast.loading("Updating order status...", {
            style: toastStyles.loading,
        });

        try {
            (await updateOrder(orderId).unwrap()) as TResponse<any>;
            toast.success(`Order has been ${newStatus}`, {
                id: toastId,
                style: toastStyles.success,
            });
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update status", {
                id: toastId,
                style: toastStyles.error,
            });
        } finally {
            setUpdatingOrderId(null);
        }
    };

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
                    <title>Orders ‣ Book Shop</title>
                    <meta
                        name="description"
                        content="View your past and current orders. Track order status, payment details, and estimated delivery time."
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
                    <title>Orders ‣ Book Shop</title>
                    <meta
                        name="description"
                        content="View your past and current orders. Track order status, payment details, and estimated delivery time."
                    />
                </Helmet>
                <div className="flex flex-col justify-center items-center min-h-screen gap-y-5">
                    <h2 className="text-2xl font-semibold">
                        Failed to load your Orders
                    </h2>
                    <Link to="/products">
                        <Button type="primary" className="!bg-primary">
                            Back to Products
                        </Button>
                    </Link>
                </div>
            </>
        );

    const columns = [
        {
            title: "No.",
            dataIndex: "serial",
            key: "serial",
            render: (_: any, __: any, index: number) => (
                <span>{index + 1}</span>
            ),
        },
        {
            title: "Order ID",
            dataIndex: "_id",
            key: "_id",
            render: (id: string) => (
                <span className="font-medium">{id.slice(-6)}</span>
            ),
        },
        {
            title: "Customer Name",
            dataIndex: "userName",
            key: "userName",
            render: () => <span>{userData?.name}</span>,
        },
        {
            title: "Items",
            dataIndex: "items",
            key: "items",
            render: (items: any[]) => (
                <ul className="list-disc pl-4">
                    {items.map((item) => (
                        <li key={item.productId} className="text-sm">
                            {item.title} ({item.quantity}x) - $
                            {item.totalPrice.toFixed(2)}
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
            render: (total: number) => (
                <span className="font-bold">${total.toFixed(2)}</span>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>
            ),
        },
        {
            title: "Update Status",
            key: "updateStatus",
            render: (order: any) => (
                <Select
                    value={
                        order.status === "cancelled"
                            ? "Cancel"
                            : order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)
                    }
                    style={{ width: 150 }}
                    onChange={(newStatus) =>
                        handleStatusChange(order._id, order.status, newStatus)
                    }
                    disabled={
                        updatingOrderId === order._id ||
                        validStatusTransitions[order.status].length === 0
                    } // Disable if no options
                >
                    {validStatusTransitions[order.status].map((status) => (
                        <Select.Option key={status} value={status}>
                            {status === "cancelled"
                                ? "Cancel"
                                : status.charAt(0).toUpperCase() +
                                  status.slice(1)}
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
    ];

    return (
        <>
            <Helmet>
                <title>Orders {ordersData?.data?.length ? `(${ordersData?.data?.length})` : ""} ‣ Book Shop</title>
                <meta
                    name="description"
                    content="View your past and current orders. Track order status, payment details, and estimated delivery time."
                />
            </Helmet>
            <div className="p-8 mb-20">
                <div className="flex flex-col md:flex-row items-start gap-y-3 gap-x-3 mb-16">
                    <Link to="/user/dashboard">
                        <Button type="primary" className="!bg-primary">
                            <ArrowLeftOutlined /> Dashboard
                        </Button>
                    </Link>
                    <h2 className="text-2xl md:text-3xl !font-bold">
                        Orders of{" "}
                        <span className="text-primary">{userData?.name}</span>
                    </h2>
                </div>
                <Table
                    loading={isFetching}
                    dataSource={ordersData?.data}
                    columns={columns}
                    onChange={onChange}
                    pagination={false}
                    rowKey="_id"
                    scroll={{ x: "max-content" }}
                />
                <Flex justify="center" className="!my-10">
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

export default Orders;
