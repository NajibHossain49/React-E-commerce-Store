import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Correct default import for MyAuthContext
import MyAuthContext from "./components/contexts/MyAuthContext";

import MainLayout from "./Layout/MainLayout";
import HomePage from "./components/pages/HomePage";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MyAuthContext>
      {" "}
      {/* Correctly use the default export as a component */}
      <RouterProvider router={router} />
    </MyAuthContext>
  </React.StrictMode>
);
