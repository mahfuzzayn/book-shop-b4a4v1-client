/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { TQueryParam } from "../../types";
import { toast } from "sonner";
import { toastStyles } from "../../constants/toaster";
import {
    useGetAllAuthorsQuery,
    useGetAllProductsQuery,
} from "../../redux/features/admin/productManagement.api";
import { Link } from "react-router-dom";
import {
    Button,
    Checkbox,
    CheckboxProps,
    Image,
    Select,
    Slider,
    Spin,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { productCategories } from "../../constants/product";

const Products = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [page, setPage] = useState(1);
    const [availability, setAvailability] = useState<boolean | undefined>(
        undefined
    ); // Default to undefined

    const {
        data: productsData,
        isLoading,
        isFetching,
        refetch,
    } = useGetAllProductsQuery([
        { name: "limit", value: 5 },
        { name: "page", value: page },
        { name: "sort", value: "-quantity" },
        ...params,
    ]);

    const { data: authorsData } = useGetAllAuthorsQuery(undefined);

    const authorsOptions = authorsData?.data?.map((item: any) => ({
        value: item.name,
        label: item.name,
    }));

    const categoriesOptions = productCategories;

    const metaData = productsData?.meta;

    const tableData = productsData?.data?.map(
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

    const onAuthorChange = (value: string[]) => {
        setParams((prevParams) => {
            const filteredParams = prevParams.filter(
                (param) => param.name !== "author"
            );

            if (value.length > 0) {
                return [
                    ...filteredParams,
                    { name: "author", value: value.join(",") },
                ];
            }

            return filteredParams;
        });
    };

    const onCategoryChange = (value: string[]) => {
        setParams((prevParams) => {
            const filteredParams = prevParams.filter(
                (param) => param.name !== "category"
            );

            if (value.length > 0) {
                return [
                    ...filteredParams,
                    { name: "category", value: value.join(",") },
                ];
            }

            return filteredParams;
        });
    };

    const onAvailabilityChange = (e: any) => {
        const isChecked = e.target.checked;
        const value = e.target.value;

        const newAvailability = isChecked ? value : undefined;

        setAvailability(newAvailability);

        setParams((prevParams) => {
            const filteredParams = prevParams.filter(
                (param) => param.name !== "inStock"
            );

            if (newAvailability !== undefined) {
                return [
                    ...filteredParams,
                    { name: "inStock", value: newAvailability },
                ];
            }

            return filteredParams;
        });
    };

    const priceSliderChange = (value: number[]) => {
        const priceData = {
            minPrice: value[0],
            maxPrice: value[1],
        };

        setParams((prevParams) => {
            const filteredParams = prevParams.filter(
                (param) =>
                    param.name !== "minPrice" && param.name !== "maxPrice"
            );
            return [
                ...filteredParams,
                { name: "minPrice", value: priceData.minPrice },
                { name: "maxPrice", value: priceData.maxPrice },
            ];
        });
    };

    const handleBuyNow = (productId: string) => {
        toast.success(`Product ${productId} added to cart!`, {
            style: toastStyles.success,
        });
    };

    return (
        <div className="flex">
            <div className="w-1/4 max-w-[320px] p-4 border-primary border-r">
                <h2 className="text-lg font-bold mb-4 text-secondary">
                    Filters
                </h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-primary font-bold mb-2">
                            Price
                        </label>
                        <Slider
                            range
                            step={5}
                            defaultValue={[0, 100]}
                            max={500}
                            onChangeComplete={priceSliderChange}
                        />
                    </div>
                    <div>
                        <label className="block text-primary font-bold mb-2">
                            Author
                        </label>
                        <Select
                            placeholder="Select a person"
                            mode="multiple"
                            optionFilterProp="label"
                            onChange={onAuthorChange}
                            options={authorsOptions}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-primary font-bold mb-2">
                            Category
                        </label>
                        <Select
                            placeholder="Select a category"
                            mode="multiple"
                            optionFilterProp="label"
                            onChange={onCategoryChange}
                            options={categoriesOptions}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-primary font-bold mb-2">
                            Availability
                        </label>
                        <div className="flex flex-col gap-y-2">
                            <Checkbox
                                value={true} // In Stock
                                checked={availability === true}
                                onChange={onAvailabilityChange}
                            >
                                In Stock
                            </Checkbox>
                            <Checkbox
                                value={false} // Out of Stock
                                checked={availability === false}
                                onChange={onAvailabilityChange}
                            >
                                Out of Stock
                            </Checkbox>
                        </div>
                    </div>
                </div>
            </div>
            {!isLoading && !isFetching ? (
                <div className="flex-1 p-5">
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(250px, 1fr))",
                            gap: "20px",
                        }}
                    >
                        {tableData?.map((product) => (
                            <div
                                key={product._id}
                                style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    padding: "16px",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    backgroundColor: "#fff",
                                }}
                                className="flex flex-col gap-y-2"
                            >
                                <Image
                                    src={product.image}
                                    className="!h-[240px] !w-[360px]"
                                />
                                <h3 className="text-xl font-bold">
                                    {product.title}
                                </h3>
                                <p className="font-normal">
                                    Author{" "}
                                    <span className="font-bold text-primary">
                                        {product.author}
                                    </span>
                                </p>
                                <p className="font-semibold">
                                    Stock {product.inStock}
                                </p>
                                <p className="font-semibold mb-5">
                                    Price: {product.price}$
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                    className="mt-auto gap-x-3"
                                >
                                    <Button
                                        type="primary"
                                        className="!bg-primary w-full"
                                    >
                                        <Link to={`detail/${product._id}`}>
                                            Details
                                        </Link>
                                    </Button>
                                    <Button
                                        type="primary"
                                        className="!bg-secondary w-full"
                                        onClick={() =>
                                            handleBuyNow(product._id)
                                        }
                                    >
                                        Buy Now
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "40px",
                        }}
                    >
                        <Button
                            type="primary"
                            onClick={() =>
                                setPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={page === 1}
                            className="!bg-light"
                        >
                            Previous
                        </Button>
                        <span
                            style={{
                                margin: "0 8px",
                                lineHeight: "32px",
                                fontWeight: "bold",
                            }}
                        >
                            Page {page} of {metaData?.totalPage}
                        </span>
                        <Button
                            type="primary"
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={page === metaData?.totalPage}
                            className="!bg-light"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center w-full mt-10">
                    <Spin
                        indicator={
                            <LoadingOutlined
                                style={{ fontSize: 48 }}
                                className="!text-primary"
                                spin
                            />
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default Products;
