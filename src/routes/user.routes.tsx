import UserProfile from "../pages/public/UserProfile";
import Orders from "../pages/user/Orders";
import UserDashboard from "../pages/user/UserDashboard";
import { publicPaths } from "./public.routes";

export const userPaths = [
    ...publicPaths,
    {
        name: "Dashboard",
        path: "dashboard",
        element: <UserDashboard />,
        isPublic: false,
        children: [
            {
                name: "Orders",
                path: "/user/dashboard/orders",
                element: <Orders />,
                visible: false,
            },
            {
                name: "Profile",
                path: "/user/dashboard/profile",
                element: <UserProfile />,
                visible: false,
            },
        ],
    },
];

export const userSidebarPaths = [
    {
        name: "Manage",
        children: [
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
