import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import Products from "../pages/admin/Products";
import { publicPaths } from "./public.routes";

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
                name: "Orders",
                path: "/admin/dashboard/orders",
                element: <div>Orders Page</div>,
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
        ],
    },
];
