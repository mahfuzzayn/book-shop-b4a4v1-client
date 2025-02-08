import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
    "https://images.unsplash.com/photo-1463320726281-696a485928c7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3N0b3JlfGVufDB8fDB8fHww",
    "https://images.wallpaperscraft.com/image/single/book_old_pen_76972_1600x900.jpg",
    "https://images.wallpaperscraft.com/image/single/books_covers_old_918294_1600x900.jpg",
    "https://images.wallpaperscraft.com/image/single/books_library_stairs_964478_1600x900.jpg",
    "https://images.wallpaperscraft.com/image/single/books_old_aesthetics_324627_1600x900.jpg",
];

const Banner = () => {
    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        appendDots: (dots: React.ReactNode) => (
            <div
                style={{ position: "absolute", bottom: "10px", width: "100%" }}
            >
                <ul style={{ margin: "0px", padding: "0px" }}> {dots} </ul>
            </div>
        ),
        customPaging: () => (
            <div
                style={{
                    width: "10px",
                    height: "10px",
                    background: "#fff",
                    borderRadius: "50%",
                    margin: "0 5px",
                }}
            ></div>
        ),
    };

    return (
        <div className="w-full relative">
            <Slider {...settings} className="overflow-hidden">
                {images.map((img, index) => (
                    <div key={index} className="h-[400px] sm:h-[500px]">
                        <img
                            src={img}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover outline-none"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Banner;
