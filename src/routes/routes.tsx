import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routesGenerator } from "../utils/routesGenerator";
import { userPaths } from "./user.routes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { publicPaths } from "./public.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import { adminPaths } from "./admin.routes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: routesGenerator(publicPaths),
    },
    {
        path: "/user",
        element: (
            <ProtectedRoute role="user">
                <App />
            </ProtectedRoute>
        ),
        children: routesGenerator(userPaths),
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute role="admin">
                <App />
            </ProtectedRoute>
        ),
        children: routesGenerator(adminPaths),
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

export default router;
