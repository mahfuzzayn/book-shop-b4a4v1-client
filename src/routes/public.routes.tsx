import About from "../pages/about/About";
import ProductDetail from "../pages/public/ProductDetail";
import Products from "../pages/public/Products";

export const publicPaths = [
    {
        name: "Products",
        path: "products",
        element: <Products />,
        isPublic: true,
        children: [
            {
                name: "View Detail",
                path: "products/detail/:productId",
                element: <ProductDetail />,
                visible: false,
            },
        ],
    },
    {
        name: "About",
        path: "about",
        element: <About />,
        isPublic: true,
    },
];
