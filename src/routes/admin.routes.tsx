import AdminDashboard from "../pages/admin/AdminDashboard";
import { publicPaths } from "./public.routes";

export const adminPaths = [
    ...publicPaths,
    {
        name: "Dashboard",
        path: "dashboard",
        element: <AdminDashboard />,
        isPublic: false,
    },
];
