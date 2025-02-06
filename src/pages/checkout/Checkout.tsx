/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    useGetCartQuery,
    useUpdateQuantityMutation,
    useRemoveItemMutation,
    useClearCartMutation,
} from "../../redux/features/cart/cartApi";
import { Button, Card, Typography, Space, Spin, Image, Divider } from "antd";
import {
    ArrowLeftOutlined,
    CloseOutlined,
    MinusOutlined,
    PlusOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { TCartData, TCartItem, TResponse } from "../../types";
import { toast } from "sonner";
import { toastStyles } from "../../constants/toaster";
import { Link } from "react-router-dom";
import { useCreatePaymentIntentMutation } from "../../redux/features/order/order.api";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import PaymentForm from "./PaymentForm";
import config from "../../config";

const stripePromise = loadStripe(config.stripe_publishable_key);

const { Title, Text } = Typography;

const CheckoutPage = () => {
    const user = useAppSelector(selectCurrentUser);
    const {
        data: cart,
        isLoading,
        isError,
        isFetching,
    } = useGetCartQuery(user?.userId);

    const [updateQuantity] = useUpdateQuantityMutation();
    const [removeItem] = useRemoveItemMutation();
    const [clearCart] = useClearCartMutation();
    const [createPaymentIntent] = useCreatePaymentIntentMutation();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [isPaymentPrepared, setIsPaymentPrepared] = useState(false);
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");

        const handleResize = () => {
            if (mediaQuery.matches) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        handleResize();

        mediaQuery.addEventListener("change", handleResize);

        return () => {
            mediaQuery.removeEventListener("change", handleResize);
        };
    }, []);

    const handleUpdateQuantity = async (
        productId: string,
        quantity: number
    ) => {
        if (quantity > 1 || quantity < -1) return;

        const res = (await updateQuantity({
            userId: user?.userId,
            productId,
            quantity,
        })) as TResponse<TCartData>;

        if (res.error) {
            toast.error(res.error.data.message, { style: toastStyles.error });
        }
    };

    const handleRemoveItem = async (productId: string) => {
        const res = (await removeItem({
            userId: user?.userId,
            productId,
        })) as TResponse<TCartData>;

        if (res.error) {
            toast.error(res.error.data.message, { style: toastStyles.error });
        } else {
            toast.success("Item removed", { style: toastStyles.success });
        }
    };

    const calculateSubtotal = (): number => {
        if (!cart?.data || !cart?.data.items) return 0;

        const total = cart.data.items.reduce(
            (acc: number, item: TCartItem) => acc + item.price * item.quantity,
            0
        );

        return parseFloat(total.toFixed(2));
    };

    const handlePreparePayment = async () => {
        const toastId = toast.loading("Preparing payment", {
            style: toastStyles.loading,
        });

        const res = (await createPaymentIntent({
            amount: calculateSubtotal() * 100,
            currency: "usd",
        })) as TResponse<any>;

        if (res.error) {
            toast.error(res.error.message, {
                id: toastId,
                style: toastStyles.error,
            });
            return;
        }

        const { clientSecret } = res.data.data;

        if (clientSecret) {
            toast.success("Ready to accept payment via card", {
                id: toastId,
                style: toastStyles.success,
            });
            setIsPaymentPrepared(true);
            setClientSecret(clientSecret);
        }
    };

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
                    Failed to load your Cart
                </h2>
                <Link to="/products">
                    <Button type="primary" className="!bg-primary">
                        Back to Products
                    </Button>
                </Link>
            </div>
        );

    return (
        <div className="checkout-page flex justify-between p-8">
            <div className="cart-items flex-1 mr-8">
                <Title
                    level={2}
                    className="flex items-center gap-x-3 !font-bold"
                >
                    <Link to="/products" className="!mb-1">
                        <Button type="primary" className="!bg-primary">
                            <ArrowLeftOutlined />
                            Products
                        </Button>
                    </Link>
                    Cart
                </Title>
                <Divider className="!my-10">
                    Total Items in your Cart: {cart?.data?.totalItems}
                </Divider>
                {cart?.data?.items?.length === 0 ? (
                    <h2 className="text-lg font-semibold mt-10">
                        No items in your cart.
                    </h2>
                ) : (
                    cart?.data?.items?.map((item: TCartItem) => (
                        <Card
                            key={item._id}
                            title={item.title}
                            extra={
                                <Button
                                    onClick={() =>
                                        handleRemoveItem(item.productId)
                                    }
                                    type="primary"
                                    className="!text-white !bg-dark"
                                >
                                    Remove
                                </Button>
                            }
                            className="!bg-accent max-w-[300px] md:max-w-[480px]"
                            style={{ marginBottom: 20 }}
                        >
                            <div className="flex flex-col gap-y-3">
                                <Image
                                    src={item.image}
                                    className="max-w-[180px] rounded-lg"
                                    width={180}
                                />
                                <p className="font-normal">
                                    Author{" "}
                                    <span className="font-bold text-primary">
                                        {item.author}
                                    </span>
                                </p>
                                <p className="font-normal">
                                    Price{" "}
                                    <span className="font-bold text-secondary">
                                        {item.price}$
                                    </span>
                                </p>
                                <Space>
                                    <Button
                                        icon={<MinusOutlined />}
                                        onClick={() => {
                                            if (!isPaymentPrepared) {
                                                return handleUpdateQuantity(
                                                    item.productId,
                                                    -1
                                                );
                                            }
                                        }}
                                        disabled={
                                            item.quantity <= 1 ||
                                            isFetching ||
                                            isPaymentPrepared
                                        }
                                    />
                                    <Text>{item.quantity}</Text>
                                    <Button
                                        icon={<PlusOutlined />}
                                        onClick={() => {
                                            if (!isPaymentPrepared) {
                                                return handleUpdateQuantity(
                                                    item.productId,
                                                    1
                                                );
                                            }
                                        }}
                                        disabled={
                                            isFetching || isPaymentPrepared
                                        }
                                    />
                                </Space>
                            </div>
                        </Card>
                    ))
                )}
            </div>
            {/* Hamburger Button */}
            <div
                className={`${
                    isOpen ? "hidden" : "fixed"
                } lg:hidden fixed top-9 right-0 bg-primary z-1 text-white p-2 rounded-md shadow-md cursor-pointer flex`}
                onClick={() => setIsOpen(true)}
            >
                <p className="font-semibold">Checkout</p>
                <div className="flex gap-x-2 items-center">
                    <ShoppingCartOutlined className="text-lg relative top-[-1px]" />
                </div>
            </div>
            <div
                className={`${
                    isOpen ? "fixed" : "hidden"
                } lg:relative top-0 right-0 h-full cart-summary w-72 p-4 bg-accent rounded shadow-md`}
            >
                {/* Close Button */}
                <button
                    className="lg:hidden absolute right-4 bg-primary text-white p-2 rounded-md shadow-md cursor-pointer"
                    onClick={() => setIsOpen(false)}
                >
                    <CloseOutlined className="text-xl" />
                </button>
                <p className="!text-2xl font-bold">Subtotal</p>
                <div className="flex flex-col gap-y-2 my-4">
                    {cart?.data?.items?.map((item, index) => (
                        <span key={item._id} className="font-normal text-dark">
                            {index + 1}. {item.price}$ x {item.quantity} ={" "}
                            {item.price * item.quantity}$
                        </span>
                    ))}
                </div>
                <p className="text-lg font-bold">
                    Total: {calculateSubtotal()}$
                </p>
                {!cart?.data?.items?.length ||
                    (!clientSecret && (
                        <div className="flex flex-col gap-y-5 mt-5">
                            <Button
                                type="primary"
                                className="!bg-secondary w-full"
                                onClick={handlePreparePayment}
                            >
                                Prepare Payment
                            </Button>
                            <Button
                                onClick={() =>
                                    clearCart({ userId: user?.userId })
                                }
                                danger
                                className="w-full"
                            >
                                Clear Cart
                            </Button>
                        </div>
                    ))}
                {/* Stripe Payment Form Element */}
                {clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <PaymentForm
                            clearCart={clearCart}
                            userId={user?.userId as string}
                            cartItems={cart?.data?.items}
                            clientSecret={clientSecret}
                            setClientSecret={setClientSecret}
                            setIsPaymentSuccess={setIsPaymentSuccess}
                        />
                    </Elements>
                )}
                {isPaymentSuccess && (
                    <p className="text-center text-sm font-semibold mt-5">
                        View orders on{" "}
                        <Link to="/user/dashboard" className="text-primary">
                            Dashboard
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;
