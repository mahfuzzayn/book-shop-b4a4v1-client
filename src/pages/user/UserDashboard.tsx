/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Card, Col, Layout, Menu, Row, Statistic } from "antd";
import { useState } from "react";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { userSidebarPaths } from "../../routes/user.routes";
import { Content } from "antd/es/layout/layout";
const { Sider } = Layout;

const userRole = {
    USER: "user",
    ADMIN: "admin",
};

const UserDashboard: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const sidebarItems: any = sidebarItemsGenerator(
        userSidebarPaths,
        userRole.USER
    );

    return (
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
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </button>
            </Sider>
            <Content
                style={{
                    margin: "16px",
                    padding: "16px",
                    background: "#f5f5f5",
                    borderRadius: 8,
                }}
            >
                {" "}
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">
                        Dashboard Overview
                    </h2>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Total Orders"
                                    value={320}
                                    valueStyle={{ color: "#1890ff" }}
                                    prefix={<ShoppingCartOutlined />}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Active Users"
                                    value={1200}
                                    valueStyle={{ color: "#faad14" }}
                                    prefix={<UserOutlined />}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default UserDashboard;
