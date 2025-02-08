import { Link, useParams } from "react-router-dom";
import { Button, Descriptions, Divider, Image, Spin } from "antd";
import { useGetSingleProductQuery } from "../../redux/features/admin/productManagement.api";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet-async";

const ProductDetail = () => {
    const { productId } = useParams();
    const { data, isLoading, isError } = useGetSingleProductQuery(productId);

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
            <>
                <Helmet>
                    <title>Product ‣ Book Shop</title>
                    <meta
                        name="description"
                        content="Easily add new products to the store with essential details like title, description, price, category, and images. Ensure seamless product management with real-time validation and optimized data storage."
                    />
                </Helmet>
                <div className="flex justify-center items-center min-h-screen">
                    <Spin size="large" />
                </div>
            </>
        );

    if (isError)
        return (
            <>
                <Helmet>
                    <title>Product ‣ Book Shop</title>
                    <meta
                        name="description"
                        content="Easily add new products to the store with essential details like title, description, price, category, and images. Ensure seamless product management with real-time validation and optimized data storage."
                    />
                </Helmet>
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
            </>
        );

    return (
        <>
            <Helmet>
                <title>{pData?.title} ‣ Book Shop</title>
                <meta
                    name="description"
                    content="Easily add new products to the store with essential details like title, description, price, category, and images. Ensure seamless product management with real-time validation and optimized data storage."
                />
            </Helmet>
            <div className="p-8 mb-20">
                <Link to="/admin/dashboard/products">
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
                <Link to={`/admin/dashboard/products/update/${pData._id}`}>
                    <Button type="primary" className="!bg-dark mt-10">
                        Update this product <ArrowRightOutlined />
                    </Button>
                </Link>
            </div>
        </>
    );
};

export default ProductDetail;
