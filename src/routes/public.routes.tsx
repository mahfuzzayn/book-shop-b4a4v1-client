import About from "../pages/about/About";
import Products from "../pages/public/Products";

export const publicPaths = [
    {
        name: "Products",
        path: "products",
        element: <Products />,
        isPublic: true,
    },
    {
        name: "About",
        path: "about",
        element: <About />,
        isPublic: true,
    },
];
