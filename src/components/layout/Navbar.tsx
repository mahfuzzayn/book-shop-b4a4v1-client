/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout, Menu, Button } from "antd";
import { useAppSelector } from "../../redux/hook";
import { verifyToken } from "../../utils/verifyToken";
import { TUser } from "../../types/user.types";
import { userPaths } from "../../routes/user.routes";
import { navbarItemsGenerator } from "../../utils/navbarItemsGenerator";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { adminPaths } from "../../routes/admin.routes";
import { Link } from "react-router-dom";
const { Header } = Layout;

const userRole = {
    USER: "user",
    ADMIN: "admin",
};

const Navbar = () => {
    const token = useAppSelector(useCurrentToken);

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
                <Menu
                    mode="horizontal"
                    style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        borderBottom: "none",
                    }}
                    selectable={false}
                    items={navbarItems}
                ></Menu>

                {/* Login Button */}
                <Link to="/login">
                    <Button type="primary" style={{ marginLeft: "20px" }}>
                        Login
                    </Button>
                </Link>
            </Header>
        </Layout>
    );
};

export default Navbar;
