/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { adminSidebarPaths } from "../../routes/admin.routes";

import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
const { Sider, Content } = Layout;

const userRole = {
    USER: "user",
    ADMIN: "admin",
};

const AdminDashboard: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const sidebarItems: any = sidebarItemsGenerator(
        adminSidebarPaths,
        userRole.ADMIN
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
                <h1 style={{ color: "#3e5641" }}>Main Content</h1>
                <p style={{ color: "#282b28" }}>
                    This is the main content area. Add your components or page
                    content here.
                </p>
            </Content>
        </Layout>
    );
};

export default AdminDashboard;
