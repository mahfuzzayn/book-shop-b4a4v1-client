/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { Card, Col, Layout, Menu, Row, Spin, Statistic } from "antd";
import { useState } from "react";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { userSidebarPaths } from "../../routes/user.routes";
import { Content } from "antd/es/layout/layout";
import { useGetUserOrdersQuery } from "../../redux/features/order/order.api";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { Helmet } from "react-helmet-async";
const { Sider } = Layout;

const userRole = {
    USER: "user",
    ADMIN: "admin",
};

const UserDashboard: React.FC = () => {
    const user = useAppSelector(selectCurrentUser);
    const [collapsed, setCollapsed] = useState(false);
    const userId = user?.userId;
    const {
        data: ordersData,
        isLoading: oIsLoading,
        isFetching: oIsFetching,
    } = useGetUserOrdersQuery({ userId, params: [] });

    const sidebarItems: any = sidebarItemsGenerator(
        userSidebarPaths,
        userRole.USER
    );

    return (
        <>
            <Helmet>
                <title>Dashboard ‣ Book Shop</title>
                <meta
                    name="description"
                    content="Access your user dashboard to view and manage your orders, update your profile, and track your order status."
                />
            </Helmet>
            <Layout style={{ minHeight: "100vh" }}>
                <Sider
                    width={200}
                    className="!bg-dark"
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    trigger={null}
                >
                    <Menu
                        defaultSelectedKeys={["1"]}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={collapsed}
                        items={sidebarItems}
                        className="!bg-dark"
                    />
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            height: "40px",
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                            fontSize: "18px",
                        }}
                        className="bg-secondary w-full"
                    >
                        {collapsed ? (
                            <MenuUnfoldOutlined />
                        ) : (
                            <MenuFoldOutlined />
                        )}
                    </button>
                </Sider>
                {!oIsLoading || !oIsFetching ? (
                    <Content
                        style={{
                            padding: "16px",
                            background: "#f5f5f5",
                            borderRadius: 8,
                        }}
                        className="m-4 mb-20"
                    >
                        <div className="p-0 sm:p-6">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4">
                                Dashboard Overview
                            </h2>
                            <Row gutter={16}>
                                <Col
                                    span={24}
                                    md={{ span: 12 }}
                                    lg={{ span: 8 }}
                                >
                                    <Card>
                                        <Statistic
                                            title="Total Orders"
                                            value={ordersData?.data?.length}
                                            valueStyle={{ color: "#1890ff" }}
                                            prefix={<ShoppingCartOutlined />}
                                        />
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Content>
                ) : (
                    <div className="flex justify-center items-center min-h-screen w-full">
                        <Spin size="large" />
                    </div>
                )}
            </Layout>
        </>
    );
};

export default UserDashboard;
