import {
    createBrowserRouter,
  } from "react-router-dom";
import HomePage from "../Pages/Home/HomePage";
import Register from "../Pages/Auth/Register";
import Root from "../Layout/Root";
import Login from "../Pages/Auth/Login";
  

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      children:[
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "/login",
          element: <Login/>
        },
      ]
    },
  ]);

