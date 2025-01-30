import { Button } from "antd";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "sonner";
import { toastStyles } from "../../constants/toaster";
import { useAddOrderMutation } from "../../redux/features/order/order.api";
import { TCartItem } from "../../types";

type PaymentFormProps = {
    clientSecret: string;
    setClientSecret: React.Dispatch<React.SetStateAction<string | null>>;
    clearCart: (args: { userId: string }) => void;
    setIsPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string;
    cartItems: TCartItem[];
};

const PaymentForm = ({
    clientSecret,
    setClientSecret,
    setIsPaymentSuccess,
    clearCart,
    userId,
    cartItems,
}: PaymentFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [addOrder] = useAddOrderMutation();

    const handlePayment = async () => {
        if (!stripe || !elements) return;

        setLoading(true);

        const cardElement = elements.getElement(CardElement);
        const { paymentIntent, error } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: { card: cardElement },
            }
        );

        if (error) {
            toast.error(error.message, { style: toastStyles.error });
            setLoading(false);
            return;
        }

        if (paymentIntent.status === "succeeded") {
            toast.success("Payment successful!", {
                style: toastStyles.success,
            });

            clearCart({ userId });
            setIsPaymentSuccess(true);
            setClientSecret(null);

            const orderData = {
                order: {
                    userId,
                    items: cartItems,
                    total: paymentIntent.amount / 10000,
                    status: "pending",
                    transactionId: paymentIntent.id,
                    createdAt: new Date().toISOString(),
                },
            };

            const res = await addOrder(orderData);

            if (res.error) {
                toast.error(res.error.data.message, {
                    style: toastStyles.error,
                });
            } else {
                toast.success("Order placed successfully!", {
                    style: toastStyles.success,
                });
            }
        }

        setLoading(false);
    };

    return (
        <>
            <h2 className="font-bold text-2xl mt-5">Payment</h2>
            <div className="mt-4 p-4 bg-secondary rounded-lg">
                <CardElement />
                <Button
                    type="primary"
                    className="w-full mt-4 !bg-primary"
                    onClick={handlePayment}
                    loading={loading}
                >
                    Pay Now
                </Button>
            </div>
            <p className="text-right text-xs font-semibold mt-2">
                Powered by <span className="text-violet-500">Stripe</span>
            </p>
        </>
    );
};

export default PaymentForm;
