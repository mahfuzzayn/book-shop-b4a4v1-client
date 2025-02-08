# Book Shop - Client Side (Frontend)

-   **Live Server**: https://book-shop-b4a4v1-client.vercel.app/

## **Project Overview**

Welcome to the Book Shop Client! This application provides a seamless shopping experience for users to browse, search, and purchase books. Built with React, TypeScript, and Tailwind, the platform ensures a responsive, visually appealing interface. State management is handled using Redux with RTK Query and Redux Persistor for efficient data handling. The application integrates with a secure backend built on Node.js and Express, and payment processing is powered by Stripe. It allows users to manage their shopping carts, complete orders, and enjoy a personalized browsing experience with features like search, filters, and product recommendations.

## **Tech Stack**

-   **Frontend Framework:** React (Vite + TypeScript)
-   **State Management:** Redux Toolkit
-   **UI Library:** Ant Design & Tailwind CSS
-   **Routing:** React Router
-   **API Requests:** RTK Query
-   **Authentication:** JWT-based authentication with Redux Persist
-   **Payment Integration:** Stripe

## **Getting Started**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/mahfuzzayn/book-shop-b4a4v1-client.git
cd book-shop-b4a4v1-client
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Environment Variables**

Create a `.env` file in the root directory and add the following:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### **4️⃣ Run the Development Server**

```sh
npm run dev
```

Your app will be available at `http://localhost:5173`.

## **Features**

-   Public routes: Home, Product Listings, Product Details, About
-   Private routes: Checkout, User Dashboard, Admin Dashboard
-   Responsive design, error handling, and UI enhancements

## **Build & Deployment**

To build the project for production:

```sh
npm run build
```

For deployment, use **Vercel**, **Netlify**, or other static hosting services.

Developed by [Mahfuz Zayn](https://mahfuzzayn.netlify.app/).
