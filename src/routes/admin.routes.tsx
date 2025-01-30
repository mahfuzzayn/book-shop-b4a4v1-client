import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import Products from "../pages/admin/Products";
import { publicPaths } from "./public.routes";
import UpdateProduct from "../pages/admin/UpdateProduct";
import ProductDetail from "../pages/admin/ProductDetail";
import UserProfile from "../pages/public/UserProfile";
import Orders from "../pages/admin/Orders";

export const adminPaths = [
    ...publicPaths,
    {
        name: "Dashboard",
        path: "dashboard",
        element: <AdminDashboard />,
        children: [
            {
                name: "Users",
                path: "/admin/dashboard/users",
                element: <Users />,
                visible: false,
            },
            {
                name: "Products",
                path: "/admin/dashboard/products",
                element: <Products />,
                visible: false,
            },
            {
                name: "View Product",
                path: "/admin/dashboard/products/detail/:productId",
                element: <ProductDetail />,
                visible: false,
            },
            {
                name: "Update Product",
                path: "/admin/dashboard/products/update/:productId",
                element: <UpdateProduct />,
                visible: false,
            },
            {
                name: "Orders",
                path: "/admin/dashboard/orders",
                element: <Orders />,
                visible: false,
            },
            {
                name: "Orders",
                path: "/admin/dashboard/profile",
                element: <UserProfile />,
                visible: false,
            },
        ],
    },
];

export const adminSidebarPaths = [
    {
        name: "Manage",
        children: [
            {
                path: "users",
                name: "Users",
            },
            {
                path: "products",
                name: "Products",
            },
            {
                path: "orders",
                name: "Orders",
            },
            {
                path: "profile",
                name: "Profile",
            },
        ],
    },
];
