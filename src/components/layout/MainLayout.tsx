import { Layout, Button } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
const { Header, Content, Footer } = Layout;

const MainLayout = () => {
    const handleLogout = () => {};

    return (
        <Layout style={{ height: "100%" }}>
            <Navbar />
            <Layout>
                <Header style={{ padding: 0 }}>
                    <Button onClick={handleLogout}>Logout</Button>
                </Header>
                <Content style={{ margin: "24px 16px 0" }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
