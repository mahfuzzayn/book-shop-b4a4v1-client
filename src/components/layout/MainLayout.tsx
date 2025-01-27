import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const { Content, Footer } = Layout;

const MainLayout = () => {
    return (
        <Layout>
            <Navbar />
            <Layout>
                <Content>
                    <div className="min-h-screen">
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Book Shop ©{new Date().getFullYear()} Created by Mahfuz Zayn
                    💖
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
