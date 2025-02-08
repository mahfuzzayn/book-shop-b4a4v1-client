import { Helmet } from "react-helmet-async";
import Banner from "../../components/layout/Banner";
import FeaturedProducts from "../../components/layout/FeaturedProducts";
import Testimonials from "../../components/layout/Testimonials";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home ‣ Book Shop</title>
                <meta
                    name="description"
                    content="Discover the best books at Book Shop!"
                />
            </Helmet>
            <Banner />
            <FeaturedProducts />
            <Testimonials />
        </>
    );
};

export default Home;
