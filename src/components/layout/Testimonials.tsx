import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const testimonials = [
    {
        name: "Alice Johnson",
        review: "Amazing collection of books! The quality and fast delivery made my shopping experience fantastic.",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Michael Smith",
        review: "A great place to buy books online. The selection is vast, and the customer service is excellent!",
        image: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
        name: "Sophie Brown",
        review: "I love this bookstore! I found rare books that I couldn't find elsewhere. Highly recommended!",
        image: "https://randomuser.me/api/portraits/women/48.jpg",
    },
    {
        name: "David Wilson",
        review: "I was impressed by the fast delivery and great condition of the books. Definitely buying again!",
        image: "https://randomuser.me/api/portraits/men/49.jpg",
    },
    {
        name: "Emily Davis",
        review: "This bookstore has the best collection. Every book lover should check it out!",
        image: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    {
        name: "James Anderson",
        review: "Superb service! I got my favorite books at a great price with quick delivery.",
        image: "https://randomuser.me/api/portraits/men/51.jpg",
    },
    {
        name: "Sophia Martinez",
        review: "As a book collector, I appreciate the variety and rare finds in this shop. Highly recommended!",
        image: "https://randomuser.me/api/portraits/women/52.jpg",
    },
    {
        name: "Daniel Thomas",
        review: "A fantastic bookstore with amazing customer service. I’m a happy returning customer!",
        image: "https://randomuser.me/api/portraits/men/53.jpg",
    },
    {
        name: "Olivia Hernandez",
        review: "Great book selection and fair prices. The packaging was also excellent!",
        image: "https://randomuser.me/api/portraits/women/54.jpg",
    },
    {
        name: "Benjamin Carter",
        review: "I received my books on time, and they were in perfect condition. Will buy again!",
        image: "https://randomuser.me/api/portraits/men/55.jpg",
    },
];

const Testimonials = () => {
    return (
        <div className="py-8 bg-gray-100 mx-5 mb-20">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-primary">
                    What Our Readers Say
                </h2>
                <p className="text-gray-600 mt-2">
                    Hear from our happy customers who love shopping with us!
                </p>
            </div>
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{ delay: 5000 }}
                pagination={{ clickable: true }}
                className="mt-6 max-w-3xl mx-auto"
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center h-[250px]">
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-16 h-16 mx-auto rounded-full mb-4"
                            />
                            <p className="text-gray-700 italic">
                                "{testimonial.review}"
                            </p>
                            <h4 className="text-primary font-semibold mt-3">
                                {testimonial.name}
                            </h4>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Testimonials;
