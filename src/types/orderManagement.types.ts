export type TOrder = {
    _id: string;
    userId: string;
    items: TOrderItem[];
    total: number;
    status: TOrderStatus;
    transactionId: string;
    createdAt?: string;
};

export type TOrderItem = {
    productId: string;
    title: string;
    author: string;
    image: string;
    price: number;
    quantity: number;
    totalPrice: number;
    _id: string;
};

export type TOrderStatus =
    | "pending"
    | "approved"
    | "shipped"
    | "delivered"
    | "cancelled";
