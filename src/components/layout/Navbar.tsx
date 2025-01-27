/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout, Menu, Button, ConfigProvider } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { verifyToken } from "../../utils/verifyToken";
import { TUser } from "../../types/user.types";
import { userPaths } from "../../routes/user.routes";
import { navbarItemsGenerator } from "../../utils/navbarItemsGenerator";
import { logout, useCurrentToken } from "../../redux/features/auth/authSlice";
import { adminPaths } from "../../routes/admin.routes";
import { Link } from "react-router-dom";
const { Header } = Layout;

const userRole = {
    USER: "user",
    ADMIN: "admin",
};

const theme = {
    token: {
        colorText: "hsl(128, 16%, 29%)",
        colorTextHover: "hsl(17, 64%, 52%)",
        colorPrimary: "hsl(11, 50%, 42%)",
    },
};

const Navbar = () => {
    const token = useAppSelector(useCurrentToken);
    const dispatch = useAppDispatch();

    let user;

    if (token) {
        user = verifyToken(token);
    }

    let navbarItems: any;

    switch ((user as TUser)?.role) {
        case userRole.ADMIN:
            navbarItems = navbarItemsGenerator(adminPaths, userRole.ADMIN);
            break;
        case userRole.USER:
            navbarItems = navbarItemsGenerator(userPaths, userRole.USER);
            break;
        default:
            navbarItems = [];
            break;
    }

    return (
        <Layout>
            <Header
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 20px",
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h2 className="text-2xl font-extrabold">Book Shop</h2>
                </div>
                {/* Navigation Links */}
                <ConfigProvider theme={theme}>
                    <Menu
                        mode="horizontal"
                        style={{
                            flex: 1,
                            justifyContent: "flex-end",
                            borderBottom: "none",
                        }}
                        className="font-semibold"
                        selectable={false}
                        items={navbarItems}
                    ></Menu>
                </ConfigProvider>
                {!user ? (
                    <Link to="/login">
                        <Button
                            type="primary"
                            className="!bg-primary !font-semibold"
                        >
                            Login
                        </Button>
                    </Link>
                ) : (
                    <Button
                        type="primary"
                        className="!bg-dark !font-semibold"
                        onClick={() => dispatch(logout())}
                    >
                        Logout
                    </Button>
                )}
            </Header>
        </Layout>
    );
};

export default Navbar;
