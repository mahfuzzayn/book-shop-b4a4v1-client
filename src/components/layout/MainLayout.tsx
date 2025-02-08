import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import BSFooter from "./Footer";

const { Content } = Layout;

const MainLayout = () => {
    return (
        <Layout className="max-w-[1920px] mx-auto">
            <Navbar />
            <Layout>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
            <BSFooter />
        </Layout>
    );
};

export default MainLayout;
