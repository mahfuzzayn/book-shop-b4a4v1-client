/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Select, Spin, Tag, Button } from "antd";
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
    const user = useAppSelector(selectCurrentUser);
    const { data: userInfo } = useGetUserQuery(user?.userId);

    const {
        data: orders,
        isLoading,
        isError,
    } = useGetUserOrdersQuery(user?.userId);
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

        try {
            await updateOrder(orderId).unwrap();
            toast.success(`Order has been ${newStatus}`, {
                style: toastStyles.success,
            });
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update status", {
                style: toastStyles.error,
            });
        } finally {
            setUpdatingOrderId(null);
        }
    };

    if (isLoading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );

    if (isError)
        return (
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
        );

    const columns = [
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
            render: () => <span>{userInfo?.data?.name}</span>,
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
        <div className="p-8">
            <div className="flex items-center gap-x-3 mb-4">
                <Link to="/products">
                    <Button type="primary" className="!bg-primary">
                        <ArrowLeftOutlined /> Products
                    </Button>
                </Link>
                <h2 className="text-3xl !font-bold">Orders</h2>
            </div>
            <Table dataSource={orders?.data} columns={columns} rowKey="_id" />
        </div>
    );
};

export default Orders;
