import {
    createBrowserRouter,
  } from "react-router-dom";
import HomePage from "../Pages/Home/HomePage";
  

export const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
  ]);

