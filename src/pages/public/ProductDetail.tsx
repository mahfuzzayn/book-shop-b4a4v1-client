import { Link, useParams } from "react-router-dom";
import { Button, Descriptions, Divider, Image } from "antd";
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
            </div>
            <div className="flex flex-col font-bold mx-5 mt-5">
                Image
                <Image
                    src={pData?.image}
                    alt={`${pData?.title} - Book Image`}
                    width={280}
                    className="max-w-[240px] w-full rounded-xl mt-5 mx-5"
                />
            </div>
            <Button type="primary" className="!block !bg-primary mt-12 mx-5">
                <Link to="/admin/dashboard/products">Go back to Products</Link>
            </Button>
        </>
    );
};

export default ProductDetail;
