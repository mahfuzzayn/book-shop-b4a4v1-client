import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <HelmetProvider>
                    <RouterProvider router={router} />
                </HelmetProvider>
            </PersistGate>
            <Toaster />
        </Provider>
    </StrictMode>
);
