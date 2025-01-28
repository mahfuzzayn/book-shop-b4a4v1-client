/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { toast } from "sonner";
import { useAddProductMutation } from "../../redux/features/admin/productManagement.api";
import BSForm from "../../components/form/BSForm";
import BSInput from "../../components/form/BSInput";
import { TProduct, TResponse } from "../../types";
import { productCategories } from "../../constants/product";
import BSSelect from "../../components/form/BSSelect";
import BSTextArea from "../../components/form/BSTextArea";
import { toastStyles } from "../../constants/toaster";

const CreateProduct = () => {
    const [addProduct] = useAddProductMutation();

    const categoryOptions = productCategories.map((item) => ({
        value: item.value,
        label: item.label,
    }));

    // This is only for development purposes
    // Should be removed
    const productDefaultValues = {
        title: "Kila Kom Matoin",
        author: "Mahfuz Zayn",
        price: 78,
        category: "SelfDevelopment",
        quantity: 120,
        description:
            "Foria deko moja lagto pare, kiba tumar future hisebe ekbar cinta kora oigelo",
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating...", {
            style: toastStyles.loading,
        });
        const formData = new FormData();

        const productData = {
            product: data,
        };

        try {
            formData.append("data", JSON.stringify(productData));

            if (data.image) {
                formData.append("file", data.image);
            }

            const res = (await addProduct(formData)) as TResponse<TProduct>;
            console.log(res);

            if (res.error) {
                toast.error(res.error.data.message, {
                    id: toastId,
                    style: toastStyles.error,
                });
            } else {
                toast.success("Product created", {
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

    return (
        <Row className="mx-5 mt-10">
            <Col span={24}>
                <BSForm
                    onSubmit={onSubmit}
                    defaultValues={productDefaultValues}
                >
                    <Divider className="!text-2xl !font-extrabold">
                        Create a Product by filling this form
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
                    <Button
                        htmlType="submit"
                        type="primary"
                        className="!bg-primary"
                    >
                        Submit
                    </Button>
                </BSForm>
            </Col>
        </Row>
    );
};

export default CreateProduct;
