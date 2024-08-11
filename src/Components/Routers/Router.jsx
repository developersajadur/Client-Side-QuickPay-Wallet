import { createBrowserRouter } from "react-router-dom";
import Register from "../Pages/Auth/Register";
import Root from "../Layout/Root";
import Login from "../Pages/Auth/Login";
import HomePage from "../Pages/Home/HomePage";
import SecureRoute from "../SecureRoutes/SecureRoute";
import WalletCards from "../Pages/WalletCards/WalletCards";
import Transactions from "../Pages/Transactions/Transactions"; 

export const router = createBrowserRouter([
  {
    path: "/",
    element:<SecureRoute> <Root /></SecureRoute>,
    children: [
      {
        path: "/",
        element:<HomePage />,
      },
      // {
      //   path: "/withdraw",
      //   element:<Withdraw/>,
      // },
      {
        path: "/cards",
        element:<WalletCards/>,
      },
      {
        path: "/transactions",
        element:<Transactions/>,
      },
      // {
      //   path: "/add-money",
      //   element:<AddMoney/>,
      // },
      // {
      //   path: "/sent-money",
      //   element:<SendMoney/>,
      // },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
