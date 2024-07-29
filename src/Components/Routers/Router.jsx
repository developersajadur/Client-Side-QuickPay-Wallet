import { createBrowserRouter } from "react-router-dom";
import Register from "../Pages/Auth/Register";
import Root from "../Layout/Root";
import Login from "../Pages/Auth/Login";
import HomePage from "../Pages/Home/HomePage";
import SecureRoute from "../SecureRoutes/SecureRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element:<SecureRoute> <Root /></SecureRoute>,
    children: [
      {
        path: "/",
        element:<HomePage />,
        // element: <SecureRoute><HomePage /></SecureRoute>,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
