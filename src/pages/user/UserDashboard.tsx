/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { adminSidebarPaths } from "../../routes/admin.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { userSidebarPaths } from "../../routes/user.routes";
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
            {/* <Content
                style={{
                    margin: "16px",
                    padding: "16px",
                    background: "#f5f5f5",
                    borderRadius: 8,
                }}
            >
            </Content> */}
        </Layout>
    );
};

export default UserDashboard;
