/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout, Menu, Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { verifyToken } from "../../utils/verifyToken";
import { TUser } from "../../types/userManagement.types";
import { userPaths } from "../../routes/user.routes";
import { navbarItemsGenerator } from "../../utils/navbarItemsGenerator";
import { logout, useCurrentToken } from "../../redux/features/auth/authSlice";
import { adminPaths } from "../../routes/admin.routes";
import { Link } from "react-router-dom";
import { publicPaths } from "../../routes/public.routes";
import { useState } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { toastStyles } from "../../constants/toaster";

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    let user;

    if (token) {
        user = verifyToken(token);

        if (!user) {
            dispatch(logout());
        }
    }

    const handleLogout = () => {
        dispatch(logout());

        toast.success("User logged out successfully", {
            duration: 2000,
            style: toastStyles.success,
        });
    };

    let navbarItems: any;

    switch ((user as TUser)?.role) {
        case userRole.ADMIN:
            navbarItems = navbarItemsGenerator(adminPaths, userRole.ADMIN);
            break;
        case userRole.USER:
            navbarItems = navbarItemsGenerator(userPaths, userRole.USER);
            break;
        default:
            navbarItems = navbarItemsGenerator(publicPaths);
            break;
    }

    console.log(navbarItems);

    return (
        <Layout>
            <Header className="!bg-accent shadow-md px-5 md:px-10 flex justify-between items-center relative">
                {/* Logo */}
                <h2 className="text-2xl font-extrabold">
                    <Link to="/" className="!text-primary">
                        Book <span className="!text-dark">Shop</span>
                    </Link>
                </h2>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    {navbarItems.map((item: any) => (
                        <Link
                            key={item.key}
                            to={item.path}
                            className="font-semibold hover:text-primary transition"
                        >
                            {item.label}
                        </Link>
                    ))}
                    {!user ? (
                        <Link to="/login">
                            <Button
                                type="primary"
                                className="!bg-primary font-semibold"
                            >
                                Login
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            type="primary"
                            className="!bg-secondary font-semibold"
                            onClick={() => handleLogout()}
                        >
                            Logout
                        </Button>
                    )}
                </div>

                {/* Hamburger Menu Button (Small Screens) */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
                </button>
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-light shadow-lg rounded-md flex flex-col items-center p-2 z-50 md:hidden">
                        {/* Navigation Links */}
                        <Menu
                            mode="vertical"
                            className="!bg-accent w-full text-center rounded-lg"
                            selectable={false}
                            items={navbarItems}
                            onClick={() => setIsMenuOpen(false)} // Auto-close menu on click
                        />
                        {/* Authentication Buttons (Mobile) */}
                        {!user ? (
                            <Link
                                to="/login"
                                className="w-full text-center my-2"
                            >
                                <Button
                                    type="primary"
                                    className="!bg-primary font-semibold w-full rounded-full py-2"
                                >
                                    Login
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                type="primary"
                                className="!bg-secondary font-semibold w-full rounded-full py-2 my-2"
                                onClick={() => {
                                    dispatch(logout());
                                    setIsMenuOpen(false);
                                }}
                            >
                                Logout
                            </Button>
                        )}
                    </div>
                )}
            </Header>
        </Layout>
    );
};

export default Navbar;
