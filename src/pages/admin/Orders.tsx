/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Select, Spin, Tag, Button, Modal } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import { toastStyles } from "../../constants/toaster";
import { Link } from "react-router-dom";
import {
    ArrowLeftOutlined,
    DeleteOutlined,
    ExclamationCircleFilled,
} from "@ant-design/icons";
import {
    useDeleteOrderMutation,
    useGetAllOrdersQuery,
    useUpdateOrderStatusByAdminMutation,
} from "../../redux/features/admin/orderManagment.api";
import { TResponse } from "../../types";

const statusColors: Record<string, string> = {
    pending: "gold",
    confirmed: "blue",
    shipped: "purple",
    delivered: "green",
    cancelled: "red",
};

const validStatusTransitions: Record<string, string[]> = {
    pending: ["approved", "cancelled"],
    approved: ["shipped", "cancelled"],
    shipped: ["delivered"],
    delivered: [],
    cancelled: [],
};

const Orders = () => {
    const {
        data: orders,
        isLoading,
        isError,
    } = useGetAllOrdersQuery(undefined);
    const [updateOrderStatus] = useUpdateOrderStatusByAdminMutation(undefined);
    const [deleteOrder] = useDeleteOrderMutation();
    const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
    const { confirm } = Modal;

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

        const newStatusData = {
            status: newStatus,
        };

        try {
            await updateOrderStatus({ orderId, data: newStatusData }).unwrap();
            toast.success(
                `Order has been updated to ${newStatus.toUpperCase()}`,
                {
                    style: toastStyles.success,
                }
            );
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update status", {
                style: toastStyles.error,
            });
        } finally {
            setUpdatingOrderId(null);
        }
    };

    const showDeleteOrderConfirm = (orderId: string) => {
        confirm({
            title: "Are you sure to delete this order?",
            icon: <ExclamationCircleFilled />,
            content: "This cannot be undone",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            async onOk() {
                try {
                    const toastId = toast.loading("Deleting order...", {
                        style: toastStyles.loading,
                    });

                    const res = (await deleteOrder(orderId)) as TResponse<any>;

                    if (res.error) {
                        toast.error(res.error.data.message, {
                            id: toastId,
                            style: toastStyles.loading,
                        });
                    } else {
                        toast.success("Deleted order", { id: toastId });
                    }
                } catch (error) {
                    toast.error("Something went wrong", {
                        style: toastStyles.error,
                    });
                }
            },
        });
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
            dataIndex: "userId",
            key: "userName",
            render: (userId: any) => {
                return <span>{userId?.name}</span>;
            },
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
                        order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)
                    }
                    style={{ width: 150 }}
                    onChange={(newStatus) =>
                        handleStatusChange(order._id, order.status, newStatus)
                    }
                    disabled={
                        updatingOrderId === order._id ||
                        validStatusTransitions[order.status].length === 0
                    }
                >
                    {validStatusTransitions[order.status].map((status) => (
                        <Select.Option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            title: "Action",
            key: "x",
            render: (item: any) => (
                <Button
                    className="!bg-red-500 !text-accent"
                    onClick={() => showDeleteOrderConfirm(item?._id)}
                >
                    <DeleteOutlined />
                </Button>
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
