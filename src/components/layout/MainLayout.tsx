import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import BSFooter from "./Footer";

const { Content } = Layout;

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
                <BSFooter />
            </Layout>
        </Layout>
    );
};

export default MainLayout;
