import { Button, Image, Spin } from "antd";
import { useGetAllProductsQuery } from "../../redux/features/admin/productManagement.api";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
    const {
        data: productsData,
        isLoading,
        isFetching,
    } = useGetAllProductsQuery([
        { name: "limit", value: 6 },
        { name: "sort", value: "-quantity" },
    ]);

    const gridData = productsData?.data?.map(
        ({ _id, title, author, image, quantity, price, inStock }) => ({
            key: _id,
            _id,
            title,
            image,
            author,
            quantity,
            price,
            inStock: inStock ? `${quantity} left` : "Unavailable",
        })
    );

    return (
        <div className="my-10">
            <div className="flex flex-col items-center space-y-4 mx-5">
                <h1 className="text-primary text-3xl font-bold mt-10">
                    Featured Products
                </h1>
                <p className="text-gray-600 text-center max-w-4xl mx-4">
                    Discover our Featured Products, carefully selected to bring
                    you the best reads across various genres. Whether you're
                    looking for timeless classics, bestselling novels, or
                    insightful non-fiction, our collection offers something for
                    every book lover. Explore now and find your next great read!
                </p>
            </div>
            <div className="flex justify-center">
                {!isLoading && !isFetching ? (
                    <div className="flex-1 py-12 px-0 sm:px-6 max-w-[1280px]">
                        <div
                            style={{
                                display: "grid",
                                gap: "40px",
                            }}
                            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center"
                        >
                            {gridData?.map((product) => (
                                <div
                                    key={product._id}
                                    style={{
                                        border: "1px solid #ddd",
                                        borderRadius: "8px",
                                        padding: "16px",
                                        boxShadow:
                                            "0 4px 8px rgba(0, 0, 0, 0.1)",
                                        backgroundColor: "#fff",
                                    }}
                                    className="flex flex-col gap-y-2 w-[260px] sm:w-[320px] text-center"
                                >
                                    <Image
                                        src={product.image}
                                        className="!h-[240px] object-contain sm:object-cover"
                                    />
                                    <h3 className="text-xl font-bold mt-2">
                                        {product.title}
                                    </h3>
                                    <p className="font-normal mb-2">
                                        Author{" "}
                                        <span className="font-bold text-primary">
                                            {product.author}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-10">
                            <Link to="/products">
                                <Button type="primary" className="!bg-primary">
                                    View All Products
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center min-h-screen w-full">
                        <Spin size="large" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeaturedProducts;
