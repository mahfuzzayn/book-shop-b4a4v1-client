/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Divider, Form, Input, Row } from "antd";
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

const UpdateProduct = () => {
    const { productId } = useParams();
    const [updateProduct] = useUpdateProductMutation();
    const {
        data: productData,
        isLoading: pIsLoading,
        isFetching: pIsFetching,
        refetch,
    } = useGetSingleProductQuery(productId);

    // This is only for development purposes
    // Should be removed
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

    if (pIsLoading || pIsFetching) {
        return <p>Loading...</p>;
    }

    return (
        <Row className="mx-5 mt-10">
            <Col span={24}>
                <BSForm
                    onSubmit={onSubmit}
                    defaultValues={productDefaultValues}
                >
                    <Divider className="!text-2xl !font-extrabold">
                        Update a Product by refilling this form
                    </Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <BSInput type="text" name="title" label="Title" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <BSInput type="text" name="author" label="Author" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <BSInput type="number" name="price" label="Price" />
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
                                                onChange(e.target.files?.[0])
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
                        <Button type="primary" className="!bg-primary ml-auto">
                            <Link to="/admin/dashboard/products">
                                Go back to Products
                            </Link>
                        </Button>
                    </div>
                </BSForm>
            </Col>
        </Row>
    );
};

export default UpdateProduct;
