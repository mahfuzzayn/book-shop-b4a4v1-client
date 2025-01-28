/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Button,
    Flex,
    Modal,
    Pagination,
    Space,
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
import { ExclamationCircleFilled } from "@ant-design/icons";
import { toast } from "sonner";
import { toastStyles } from "../../constants/toaster";

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
    } = useGetAllUsersQuery([
        { name: "limit", value: 10 },
        { name: "page", value: page },
        { name: "sort", value: "id" },
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

export default Users;
