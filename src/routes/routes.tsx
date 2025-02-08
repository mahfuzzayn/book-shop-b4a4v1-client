import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routesGenerator } from "../utils/routesGenerator";
import { userPaths } from "./user.routes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import { adminPaths } from "./admin.routes";
import Checkout from "../pages/checkout/Checkout";
import Home from "../pages/public/Home";
import Products from "../pages/public/Products";
import About from "../pages/about/About";
import ProductDetail from "../pages/public/ProductDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/products",
                element: <Products />,
            },
            {
                path: "/products/detail/:productId",
                element: <ProductDetail />,
            },
            {
                path: "/about",
                element: <About />,
            },
        ],
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
    {
        path: "/checkout",
        element: (
            <ProtectedRoute role="user">
                <Checkout />
            </ProtectedRoute>
        ),
    },
]);

export default router;
