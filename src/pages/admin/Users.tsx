/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Button,
    Flex,
    Modal,
    Pagination,
    Space,
    Spin,
    Table,
    TableColumnsType,
    TableProps,
} from "antd";
import { useState } from "react";
import {
    useDeactivateUserMutation,
    useGetAllUsersQuery,
} from "../../redux/features/admin/userManagement.api";
import { TUser } from "../../types/userManagement.types";
import { TQueryParam, TResponse } from "../../types";
import { ArrowLeftOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { toast } from "sonner";
import { toastStyles } from "../../constants/toaster";
import { Link } from "react-router-dom";

type TTableData = Pick<TUser, "_id" | "name" | "email" | "isDeactivated">;

const Users = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [page, setPage] = useState(1);
    const [deactivateUser] = useDeactivateUserMutation();
    const { confirm } = Modal;

    const showDeactivateConfirm = (userId: string, isDeactivated: boolean) => {
        confirm({
            title: "Are you sure deactivate this user?",
            icon: <ExclamationCircleFilled />,
            content:
                "This action will make the user deactivate on this website",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            async onOk() {
                try {
                    const toastId = toast.loading("Deactivating user...", {
                        style: toastStyles.loading,
                    });

                    const res = (await deactivateUser({
                        userId,
                        data: { isDeactivated },
                    })) as TResponse<TUser>;

                    if (res.error) {
                        toast.error(res.error.data.message, {
                            id: toastId,
                            style: toastStyles.loading,
                        });
                    } else {
                        toast.success("Deactivated user", { id: toastId });
                    }
                } catch (error) {
                    toast.error("Something went wrong", {
                        style: toastStyles.error,
                    });
                }
            },
        });
    };

    const showReactivateConfirm = (userId: string, isDeactivated: boolean) => {
        confirm({
            title: "Are you sure reactivate this user?",
            icon: <ExclamationCircleFilled />,
            content: "This action will make the user active on this website",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            async onOk() {
                try {
                    const toastId = toast.loading("Reactivating user...", {
                        style: toastStyles.loading,
                    });

                    const res = (await deactivateUser({
                        userId,
                        data: { isDeactivated },
                    })) as TResponse<TUser>;

                    if (res.error) {
                        toast.error(res.error.data.message, { id: toastId });
                    } else {
                        toast.success("Reactivated user", {
                            id: toastId,
                            style: toastStyles.success,
                        });
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
        data: usersData,
        isLoading,
        isFetching,
        isError,
    } = useGetAllUsersQuery([
        { name: "limit", value: 5 },
        { name: "page", value: page },
        { name: "sort", value: "-createdAt" },
        ...params,
    ]);

    const metaData = usersData?.meta;

    const tableData = usersData?.data?.map(
        ({ _id, name, email, isDeactivated }) => ({
            key: _id,
            _id,
            name,
            email,
            isDeactivated,
            status: !isDeactivated ? "Active" : "Deactivated",
        })
    );

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Action",
            key: "x",
            render: (item) => {
                return (
                    <Space>
                        <Space wrap>
                            {!item.isDeactivated ? (
                                <Button
                                    onClick={() =>
                                        showDeactivateConfirm(
                                            item._id,
                                            !item.isDeactivated
                                        )
                                    }
                                    type="primary"
                                    className="!bg-primary"
                                >
                                    Deactivate
                                </Button>
                            ) : (
                                <Button
                                    onClick={() =>
                                        showReactivateConfirm(
                                            item._id,
                                            !item.isDeactivated
                                        )
                                    }
                                    type="primary"
                                    className="!bg-secondary"
                                >
                                    Reactivate
                                </Button>
                            )}
                        </Space>
                    </Space>
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
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );

    if (isError)
        return (
            <div className="flex flex-col justify-center items-center min-h-screen gap-y-5">
                <h2 className="text-2xl font-semibold">Failed to load Users</h2>
                <Link to="/admin/dashboard">
                    <Button type="primary" className="!bg-primary">
                        Back to Dashboard
                    </Button>
                </Link>
            </div>
        );

    return (
        <div className="p-8">
            <div className="flex flex-col sm:flex-row items-start gap-y-3 gap-x-3 mb-4">
                <Link to="/admin/dashboard">
                    <Button type="primary" className="!bg-primary">
                        <ArrowLeftOutlined />
                        Dashboard
                    </Button>
                </Link>
                <h2 className="text-3xl !font-bold">Users</h2>
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
            <Flex justify="center" style={{ marginTop: "10px" }}>
                <Pagination
                    current={page}
                    onChange={(value) => setPage(value)}
                    pageSize={metaData?.limit}
                    total={metaData?.total}
                />
            </Flex>
        </div>
    );
};

export default Users;
