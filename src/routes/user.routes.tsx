import UserDashboard from "../pages/user/UserDashboard";
import { publicPaths } from "./public.routes";

export const userPaths = [
    ...publicPaths,
    {
        name: "Dashboard",
        path: "dashboard",
        element: <UserDashboard />,
        isPublic: false,
    },
];
