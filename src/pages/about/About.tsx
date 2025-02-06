const About = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-3xl text-dark font-bold text-center mb-6">
                About Us
            </h1>
            <div className="p-6">
                <h2 className="text-2xl text-primary font-semibold mb-4">
                    Our Story
                </h2>
                <p className="text-gray-700">
                    Welcome to <strong>Book Shop</strong>, your trusted
                    destination for books that inspire, educate, and entertain.
                    Our journey began with a passion for reading and a
                    commitment to making books more accessible to everyone.
                    Whether you are a lifelong book lover, a student, or just
                    starting your reading journey, we aim to provide a diverse
                    collection that caters to every reader’s needs.
                </p>
            </div>
            <div className="p-6 mt-6">
                <h2 className="text-2xl text-primary font-semibold mb-4">
                    Our Mission
                </h2>
                <ul className="list-disc pl-6 text-gray-700">
                    <li>
                        <strong>To encourage a love for reading</strong> by
                        offering a carefully curated selection of books.
                    </li>
                    <li>
                        <strong>To make books affordable and accessible</strong>{" "}
                        to everyone, regardless of location.
                    </li>
                    <li>
                        <strong>To support authors and publishers</strong> by
                        promoting their work to a wider audience.
                    </li>
                </ul>
            </div>
            <div className="p-6 mt-6">
                <h2 className="text-2xl text-primary font-semibold mb-4">
                    What We Offer
                </h2>
                <ul className="list-disc pl-6 text-gray-700">
                    <li>
                        A wide range of books, including bestsellers, classics,
                        and independent publications.
                    </li>
                    <li>
                        Fast and secure delivery to ensure you receive your
                        books on time.
                    </li>
                    <li>
                        Exclusive deals and discounts to make reading more
                        affordable.
                    </li>
                </ul>
            </div>
            <div className="p-6 mt-6">
                <h2 className="text-2xl text-primary font-semibold mb-4">
                    🌍 Join Our Community
                </h2>
                <p className="text-gray-700">
                    Become a part of Book Shop and explore the world of books
                    with us! Follow us on Social Media{" "}
                    <a
                        href="https://www.facebook.com/groups/bookshoper"
                        target="_blank"
                    >
                        Facebook
                    </a>
                    ,{" "}
                    <a href="https://x.com/WigtownBookShop" target="_blank">
                        Twitter
                    </a>
                    ,{" "}
                    <a
                        href="https://www.instagram.com/bookshop.combd/"
                        target="_blank"
                    >
                        Instagram
                    </a>
                    ,{" "}
                    <a
                        href="https://www.linkedin.com/company/book-shop24/"
                        target="_blank"
                    >
                        LinkedIn
                    </a>{" "}
                    for book recommendations, exclusive offers, and reading
                    inspiration.
                </p>
            </div>
        </div>
    );
};

export default About;
