import { Link, useParams } from "react-router-dom";
import { Avatar, Button, Descriptions, Divider, Flex } from "antd";
import { useGetSingleProductQuery } from "../../redux/features/admin/productManagement.api";

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
            {pData?.profileImg && (
                <Flex justify="center">
                    <Avatar
                        size={{
                            xs: 80,
                            sm: 90,
                            md: 100,
                            lg: 150,
                            xl: 160,
                            xxl: 170,
                        }}
                        src={pData?.profileImg}
                        alt={`${pData?.fullName} Profile`}
                    />
                </Flex>
            )}
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
                <Button type="primary" className="!bg-primary mt-12">
                    <Link to="/admin/dashboard/products">
                        Go back to Products
                    </Link>
                </Button>
            </div>
        </>
    );
};

export default ProductDetail;
