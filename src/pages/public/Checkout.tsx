import { Form, Input, InputNumber, Button, Card, Divider } from "antd";

const Checkout = ({ product, user }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        console.log("Order Details:", values);
        // Call SurjoPay payment API here
    };

    const calculateTotal = (quantity, price) => {
        return (quantity || 0) * (price || 0);
    };

    return (
        <Card
            title="Checkout Page"
            style={{ maxWidth: "600px", margin: "auto" }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    productName: product.name,
                    quantity: 1,
                    price: product.price,
                    userName: user.name,
                    email: user.email,
                }}
            >
                <Form.Item label="Product Name" name="productName">
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label="Quantity"
                    name="quantity"
                    rules={[
                        {
                            required: true,
                            message: "Please input the quantity!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (value > product.stock) {
                                    return Promise.reject(
                                        new Error(
                                            "Quantity exceeds available stock!"
                                        )
                                    );
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <InputNumber min={1} max={product.stock} />
                </Form.Item>

                <Form.Item label="Price (Per Unit)" name="price">
                    <Input disabled />
                </Form.Item>

                <Divider />

                <h3>
                    Total:{" "}
                    {calculateTotal(
                        form.getFieldValue("quantity"),
                        form.getFieldValue("price")
                    )}
                </h3>

                <Divider />

                <Form.Item
                    label="Name"
                    name="userName"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Order Now
                </Button>
            </Form>
        </Card>
    );
};

export default Checkout;
