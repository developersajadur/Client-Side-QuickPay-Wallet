import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";
import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <div className="px-2 md:px-5 lg:px-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
