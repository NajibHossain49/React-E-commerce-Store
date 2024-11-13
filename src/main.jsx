import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import MyAuthContext from "./components/contexts/MyAuthContext";
import MainLayout from "./Layout/MainLayout";
import HomePage from "./components/pages/HomePage";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import OrdersPage from "./components/pages/OrdersPage";
import ForgotPassword from "./components/Auth/ForgotPassword";
import PrivateRoute from "./routes/Private Route";
import ProductList from "./components/Product/ProductList";
import ProductDetail from "./components/Product/ProductDetail";
import CartProvider from "./components/contexts/CartProvider"; // Import CartProvider
import Cart from "./components/Cart/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <OrdersPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/productList",
        element: (
          <PrivateRoute>
            <ProductList />
          </PrivateRoute>
        ),
        loader: () => fetch("/product-catalog.json"), // Fetch data by the loader
      },
      {
        path: "/product/:productId",
        element: (
          <PrivateRoute>
            <ProductDetail />
          </PrivateRoute>
        ),
        loader: () => fetch("/product-catalog.json"), // Fetch data by the loader
      },

      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MyAuthContext>
      <CartProvider>
        {/* Wrap your app with CartProvider */}
        <RouterProvider router={router} />
      </CartProvider>
    </MyAuthContext>
  </React.StrictMode>
);
