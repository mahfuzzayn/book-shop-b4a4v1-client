import { Layout, Row, Col, Typography, Space, Image } from "antd";
import {
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    PhoneOutlined,
    MailOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import PoweredBy from "../others/PoweredBy";
import bookShopLogo from "../../assets/images/logo.png";

const { Footer } = Layout;
const { Text, Title } = Typography;

const BSFooter = () => {
    return (
        <Footer className="!bg-accent text-white p-8">
            <Row
                gutter={[16, 16]}
                justify="space-between"
                className="space-y-5 mt-10"
            >
                {/* Section 1: Brand */}
                <Col xs={24} sm={12} md={6} className="space-y-2 mb-4">
                    <h2 className="text-2xl font-extrabold">
                        <Link
                            to="/"
                            className="!text-primary flex items-center gap-x-1"
                        >
                            <Image
                                src={bookShopLogo}
                                width={60}
                                preview={false}
                            />
                            Book <span className="!text-dark">Shop</span>
                        </Link>
                    </h2>
                    <Text className="text-gray-400">
                        Bringing the World's Best Books to Your Doorstep.
                    </Text>
                </Col>
                {/* Section 2: Quick Links */}
                <Col xs={24} sm={12} md={6}>
                    <Title level={5} className="!font-semibold">
                        Quick Links
                    </Title>
                    <Space direction="vertical">
                        <Link to="/" className="!text-primary hover:text-white">
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className="!text-primary  hover:text-white"
                        >
                            About
                        </Link>
                        <Link
                            to="/products"
                            className="!text-primary  hover:text-white"
                        >
                            Products
                        </Link>
                    </Space>
                </Col>
                {/* Section 3: Social Media */}
                <Col xs={24} sm={12} md={6}>
                    <Title level={5} className="!font-semibold">
                        Follow Us
                    </Title>
                    <Space size="large" className="mt-4">
                        <a
                            href="https://www.facebook.com/groups/bookshoper"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FacebookOutlined className="!text-primary hover:text-blue-500 text-xl" />
                        </a>
                        <a
                            href="https://x.com/WigtownBookShop"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <TwitterOutlined className="!text-primary hover:text-blue-400 text-xl" />
                        </a>
                        <a
                            href="https://www.instagram.com/bookshop.combd/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <InstagramOutlined className="!text-primary hover:text-pink-500 text-xl" />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/book-shop24/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <LinkedinOutlined className="!text-primary hover:text-blue-600 text-xl" />
                        </a>
                    </Space>
                    <Space size="large" className="mt-4">
                        <PoweredBy />
                    </Space>
                </Col>
                {/* Section 4: Contact Info */}
                <Col xs={24} sm={12} md={6}>
                    <Title level={5} className="!font-semibold">
                        Contact Us
                    </Title>
                    <Space direction="vertical">
                        <Text className="text-gray-400">
                            <PhoneOutlined className="mr-2" /> +880 1606-451099
                        </Text>
                        <Text className="text-gray-400">
                            <MailOutlined className="mr-3" />
                            support@bookshop.com
                        </Text>
                    </Space>
                </Col>
            </Row>
            {/* Copyright */}
            <Row justify="center" className="mt-8">
                <Col>
                    <Text className="text-gray-500">
                        © {new Date().getFullYear()} BookShop. All rights
                        reserved.
                    </Text>
                </Col>
            </Row>
        </Footer>
    );
};

export default BSFooter;
