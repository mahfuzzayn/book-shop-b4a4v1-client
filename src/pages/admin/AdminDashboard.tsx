/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ProductOutlined,
    ShoppingCartOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";
import { Card, Col, Layout, Menu, Row, Spin, Statistic } from "antd";
import { useState } from "react";
import { adminSidebarPaths } from "../../routes/admin.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { Content } from "antd/es/layout/layout";
import { useGetAllOrdersQuery } from "../../redux/features/admin/orderManagment.api";
import { useGetAllProductsQuery } from "../../redux/features/admin/productManagement.api";
import { useGetAllUsersQuery } from "../../redux/features/admin/userManagement.api";
import { Helmet } from "react-helmet-async";
const { Sider } = Layout;

const userRole = {
    USER: "user",
    ADMIN: "admin",
};

const AdminDashboard: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const {
        data: usersData,
        isLoading: uIsLoading,
        isFetching: uIsFetching,
    } = useGetAllUsersQuery(undefined);

    const {
        data: productsData,
        isLoading: pIsLoading,
        isFetching: pIsFetching,
    } = useGetAllProductsQuery(undefined);

    const {
        data: ordersData,
        isLoading: oIsLoading,
        isFetching: oIsFetching,
    } = useGetAllOrdersQuery(undefined);

    const sidebarItems: any = sidebarItemsGenerator(
        adminSidebarPaths,
        userRole.ADMIN
    );

    return (
        <>
            <Helmet>
                <title>Dashboard ‣ Book Shop</title>
                <meta
                    name="description"
                    content="Manage your Book Shop efficiently with a powerful dashboard. View users, products, and orders insights in one place."
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
                {!uIsLoading ||
                !uIsFetching ||
                !pIsLoading ||
                !pIsFetching ||
                !oIsLoading ||
                !oIsFetching ? (
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
                            <Row gutter={20} className="space-y-5">
                                <Col
                                    span={24}
                                    md={{ span: 12 }}
                                    lg={{ span: 8 }}
                                >
                                    <Card>
                                        <Statistic
                                            title="Total Users"
                                            value={usersData?.data?.length}
                                            valueStyle={{ color: "#1890ff" }}
                                            prefix={<UsergroupAddOutlined />}
                                        />
                                    </Card>
                                </Col>
                                <Col
                                    span={24}
                                    md={{ span: 12 }}
                                    lg={{ span: 8 }}
                                >
                                    <Card>
                                        <Statistic
                                            title="Total Products"
                                            value={productsData?.data?.length}
                                            valueStyle={{ color: "#1890ff" }}
                                            prefix={<ProductOutlined />}
                                        />
                                    </Card>
                                </Col>
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

export default AdminDashboard;
