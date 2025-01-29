/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Descriptions, Divider, Image } from "antd";
import { useGetSingleProductQuery } from "../../redux/features/admin/productManagement.api";
import { useAddItemMutation } from "../../redux/features/cart/cartApi";
import { useAppSelector } from "../../redux/hook";
import { toast } from "sonner";
import { TResponse } from "../../types";
import { toastStyles } from "../../constants/toaster";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

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

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: {(error as TApiError).data.message}</p>;
    }

    return (
        <>
            <h1 className="text-3xl text-center mt-10 font-extrabold">
                Details of {pData?.title}
            </h1>
            <Divider className="!text-xl">Product Info</Divider>
            <Descriptions size="middle" className="!mx-5">
                {productInfo &&
                    Object.entries(productInfo).map(([item, value]) => (
                        <Descriptions.Item label={item} key={item}>
                            {value}
                        </Descriptions.Item>
                    ))}
            </Descriptions>
            <div className="font-bold mx-5 mt-5">
                Description:
                <span className="ml-1 font-normal">{pData.description}</span>
                <br />
            </div>
            <div className="flex flex-col font-bold mx-5 mt-5">
                Image
                <Image
                    src={pData?.image}
                    alt={`${pData?.title} - Book Image`}
                    width={280}
                    className="max-w-[240px] w-full rounded-xl mt-5 mx-5"
                />
            </div>
            <div className="flex gap-x-4 mx-5">
                <Link to="/products">
                    <Button type="primary" className="!block !bg-primary mt-12">
                        Go back to Products
                    </Button>
                </Link>
                <Button
                    type="primary"
                    className="!bg-secondary mt-12"
                    onClick={() => handleBuyNow(pData._id)}
                >
                    Buy Now
                </Button>
            </div>
        </>
    );
};

export default ProductDetail;
