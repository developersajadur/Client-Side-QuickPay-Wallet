import { createBrowserRouter } from "react-router-dom";
import Register from "../Pages/Auth/Register";
import Root from "../Layout/Root";
import Login from "../Pages/Auth/Login";
import HomePage from "../Pages/Home/HomePage";
import SecureRoute from "../SecureRoutes/SecureRoute";
import WalletCards from "../Pages/WalletCards/WalletCards";
import AdminRoot from "../Admin/AdminLayout/AdminRoot";
import AllTranslations from "../Admin/AllTranslations/AllTranslations";
import AllUser from "../Admin/AllUser/AllUser";
import Dashboard from "../Admin/Dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SecureRoute>
        <Root />
      </SecureRoute>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/cards",
        element: <WalletCards />,
      },
      // Uncomment and add other routes here
      // {
      //   path: "/withdraw",
      //   element: <Withdraw />,
      // },
      // {
      //   path: "/transactions",
      //   element: <TransactionModal />,
      // },
      // {
      //   path: "/add-money",
      //   element: <AddMoney />,
      // },
      // {
      //   path: "/sent-money",
      //   element: <SendMoney />,
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
  {
    path: "/admin",
    element: (
      <SecureRoute>
        <AdminRoot />
      </SecureRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <Dashboard/>
      },
      {
        path: 'translations',
        element: <AllTranslations/>
      },
      {
        path: 'users',
        element: <AllUser/>
      },
    ],
  },
]);
