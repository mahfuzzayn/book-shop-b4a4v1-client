import AdminDashboard from "../pages/admin/AdminDashboard";
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
                path: "dashboard/users",
                element: <div>Users Page</div>,
                visible: false,
            },
            {
                name: "Products",
                path: "dashboard/products",
                element: <div>Products Page</div>,
                visible: false,
            },
            {
                name: "Orders",
                path: "dashboard/orders",
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
