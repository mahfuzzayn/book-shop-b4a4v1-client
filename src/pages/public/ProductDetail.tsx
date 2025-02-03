/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Descriptions, Divider, Image, Spin } from "antd";
import { useGetSingleProductQuery } from "../../redux/features/admin/productManagement.api";
import { useAddItemMutation } from "../../redux/features/cart/cartApi";
import { useAppSelector } from "../../redux/hook";
import { toast } from "sonner";
import { TResponse } from "../../types";
import { toastStyles } from "../../constants/toaster";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { ArrowLeftOutlined } from "@ant-design/icons";

type TApiError = {
    data: {
        message: string;
    };
    status: number;
};

const ProductDetail = () => {
    const { productId } = useParams();
    const { data, isLoading, isError, error } =
        useGetSingleProductQuery(productId);
    const user = useAppSelector(selectCurrentUser);
    const [addItem] = useAddItemMutation();
    const navigate = useNavigate();

    const handleBuyNow = async (productId: string) => {
        const itemData = {
            item: {
                productId,
                userId: user?.userId,
                quantity: 1,
            },
        };

        const toastId = toast.loading("Adding to cart...");

        try {
            const res = (await addItem(itemData)) as TResponse<any>;

            if (res.error) {
                toast.error(res.error.data.message, {
                    id: toastId,
                    style: toastStyles.error,
                });
            } else {
                toast.success("Added to cart", {
                    id: toastId,
                    style: toastStyles.success,
                });

                navigate("/checkout");
            }
        } catch (error) {
            toast.error("Something went wrong", {
                id: toastId,
                style: toastStyles.error,
            });
        }
    };

    const pData = data?.data;

    const productInfo = pData
        ? {
              Title: pData.title,
              Author: pData.author,
              Price: pData.price,
              Category: pData.category,
              Quantity: pData.quantity,
              Availability: pData.inStock ? "In Stock" : "Unavailable",
          }
        : null;

        if (isLoading)
            return (
                <div className="flex justify-center items-center min-h-screen">
                    <Spin size="large" />
                </div>
            );
    
        if (isError)
            return (
                <div className="flex flex-col justify-center items-center min-h-screen gap-y-5">
                    <h2 className="text-2xl font-semibold">
                        Failed to load product detail
                    </h2>
                    <p>Product ID: {productId}</p>
                    <Link to="/admin/dashboard/products">
                        <Button type="primary" className="!bg-primary">
                            Back to Products
                        </Button>
                    </Link>
                </div>
            );

    return (
        <div className="p-6">
            <Link to="/products">
                <Button type="primary" className="!bg-primary">
                    <ArrowLeftOutlined />
                    Products
                </Button>
            </Link>
            <h1 className="text-2xl sm:text-3xl text-center mt-10 font-extrabold">
                Details of {pData?.title}
            </h1>
            <Divider className="!text-xl !my-5">Product Info</Divider>
            <Descriptions size="middle">
                {productInfo &&
                    Object.entries(productInfo).map(([item, value]) => (
                        <Descriptions.Item label={item} key={item}>
                            {value}
                        </Descriptions.Item>
                    ))}
            </Descriptions>
            <div className="mt-5 text-[#00000073]">
                Description:
                <span className="ml-1 font-normal text-black">
                    {pData.description}
                </span>
                <br />
            </div>
            <div className="flex flex-col text-xl font-bold mt-10">
                Image
                <div className="mx-2 sm:mx-5">
                    <Image
                        src={pData?.image}
                        alt={`${pData?.title} - Book Image`}
                        width={240}
                        className="max-w-[240px] w-full rounded-xl mt-5"
                    />
                </div>
            </div>
            <Button
                type="primary"
                className="!bg-secondary mt-12"
                onClick={() => handleBuyNow(pData._id)}
            >
                Buy Now
            </Button>
        </div>
    );
};

export default ProductDetail;
