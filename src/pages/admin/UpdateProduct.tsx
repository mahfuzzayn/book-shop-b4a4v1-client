/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Form, Input, Row, Spin } from "antd";
import { toast } from "sonner";
import { Link, useParams } from "react-router-dom";
import {
    useGetSingleProductQuery,
    useUpdateProductMutation,
} from "../../redux/features/admin/productManagement.api";
import { TProduct, TResponse } from "../../types";
import BSInput from "../../components/form/BSInput";
import BSSelect from "../../components/form/BSSelect";
import BSTextArea from "../../components/form/BSTextArea";
import BSForm from "../../components/form/BSForm";
import { productCategories } from "../../constants/product";
import { toastStyles } from "../../constants/toaster";
import { ArrowLeftOutlined } from "@ant-design/icons";

const UpdateProduct = () => {
    const { productId } = useParams();
    const [updateProduct] = useUpdateProductMutation();
    const {
        data: productData,
        isLoading: pIsLoading,
        isFetching: pIsFetching,
        isError,
        refetch,
    } = useGetSingleProductQuery(productId);

    const productDefaultValues = productData
        ? {
              ...productData?.data,
          }
        : {};

    const categoryOptions = productCategories.map((item) => ({
        value: item.value,
        label: item.label,
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const hasChanges = Object.keys(data).some(
            (key) => productDefaultValues[key] !== data[key]
        );

        if (!hasChanges) {
            toast.info("No changes were made to the product", {
                style: toastStyles.warning,
            });
            return;
        }

        const toastId = toast.loading("Updating...", {
            style: toastStyles.loading,
        });

        const formData = new FormData();

        const productData = {
            product: {
                ...data,
                price: Number(data.price),
                quantity: Number(data.quantity),
            },
        };

        try {
            formData.append("data", JSON.stringify(productData));

            if (data.image) {
                formData.append("file", data.image);
            }

            const res = (await updateProduct({
                productId,
                data: formData,
            })) as TResponse<TProduct>;

            if (res.error) {
                toast.error(res.error.data.message, {
                    id: toastId,
                    style: toastStyles.error,
                });
            } else {
                refetch();
                toast.success("Product updated", {
                    id: toastId,
                    style: toastStyles.success,
                });
            }
        } catch (error) {
            toast.error("Something went wrong", {
                id: toastId,
                style: toastStyles.error,
            });
        }
    };

    if (pIsLoading || pIsFetching)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );

    if (isError)
        return (
            <div className="flex flex-col justify-center items-center min-h-screen gap-y-5">
                <h2 className="text-2xl font-semibold">
                    Failed to load product details
                </h2>
                <p>Product ID: {productId}</p>
                <Link to="/admin/dashboard/products">
                    <Button type="primary" className="!bg-primary">
                        <ArrowLeftOutlined /> Back to Products
                    </Button>
                </Link>
            </div>
        );

    return (
        <div className="p-8 mb-16">
            <Link to="/admin/dashboard/products">
                <Button type="primary" className="!bg-primary">
                    <ArrowLeftOutlined />
                    Products
                </Button>
            </Link>
            <Row className="my-10">
                <Col span={24}>
                    <BSForm
                        onSubmit={onSubmit}
                        defaultValues={productDefaultValues}
                    >
                        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-10">
                            Update Product: {productData?.data?.title}
                        </h2>
                        <Row gutter={8}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <BSInput
                                    type="text"
                                    name="title"
                                    label="Title"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <BSInput
                                    type="text"
                                    name="author"
                                    label="Author"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <BSInput
                                    type="number"
                                    name="price"
                                    label="Price"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <Controller
                                    name="image"
                                    render={({
                                        field: { onChange, value, ...field },
                                    }) => (
                                        <Form.Item
                                            label="Picture"
                                            className="font-bold"
                                        >
                                            <Input
                                                type="file"
                                                {...field}
                                                value={value?.fileName}
                                                onChange={(e) =>
                                                    onChange(
                                                        e.target.files?.[0]
                                                    )
                                                }
                                                size="large"
                                                className="font-normal"
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <BSSelect
                                    name="category"
                                    label="Category"
                                    options={categoryOptions}
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <BSInput
                                    type="number"
                                    name="quantity"
                                    label="Quantity"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <BSTextArea
                                    name="description"
                                    label="Description"
                                />
                            </Col>
                        </Row>
                        <div className="flex">
                            <Button
                                htmlType="submit"
                                type="primary"
                                className="!bg-secondary"
                            >
                                Update
                            </Button>
                        </div>
                    </BSForm>
                </Col>
            </Row>
        </div>
    );
};

export default UpdateProduct;
