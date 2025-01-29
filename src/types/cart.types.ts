export interface TCartItem {
    _id: string;
    productId: string;
    title: string;
    author: string;
    image: string;
    price: number;
    quantity: number;
    totalPrice: number;
}

export type TCartData = {
    _id: string;
    userId: string;
    items: TCartItem[];
    totalItems: number;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
};
