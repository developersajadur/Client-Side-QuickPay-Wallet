import { Button, Drawer } from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useUser from "../../Hooks/useUser";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";

// const navLinks = [
//     {
//         name: "Cash In",
//         path:"/cash-in"
//     },
//     {
//         name: "Sent Money",
//         path:"/sent-money"
//     },
//     {
//         name: "Cash Out",
//         path:"/cash-out"
//     },
//     {
//         name: "Transactions",
//         path:"/transactions"
//     },
// ]

const Navbar = () => {
  const { user } = useUser();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Logout logic here
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <div className="hidden md:block">
        <div className=" flex justify-between items-center py-5 px-2 md:px-5 lg:px-10 bg-[#F5F7F8]">
          <Link to="/" className="text-3xl font-semibold">
            Quick Wallet
          </Link>
          <div className="flex items-center gap-10">
            <div className="">
              <h2 className="text-xl font-medium">{`Hi, ${user?.name || "Name Not Found"}`}</h2>
            </div>
            <div className="">
              <Button
                onClick={handleLogout}
                className="bg-blue-500 w-full"
                type="submit"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <div className=" flex justify-between items-center py-5 px-2 md:px-5 lg:px-10 bg-[#F5F7F8]">
          <Link to="/" className="text-2xl lg:text-3xl font-semibold">
            Quick Wallet
          </Link>
          <div className="">
            <div className="flex w-fit items-center justify-center">
              <Button className="w-fit" onClick={() => setIsOpen(true)}><IoMenu className="text-black text-3xl w-fit" /></Button>
            </div>
            <Drawer open={isOpen} onClose={handleClose} position="right">
            <Drawer.Header title="" />
              <Drawer.Items>
                <div className="flex flex-col gap-5">
                    <img src="" alt="" />
                    <h2 className="text-xl font-medium">{`Hi, ${user?.name || "Name Not Found"} `}</h2>
              <div className="">
              <Button
                onClick={handleLogout}
                className="bg-blue-500 w-full"
                type="submit"
              >
                Logout
              </Button>
            </div>
            </div>
              </Drawer.Items>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
