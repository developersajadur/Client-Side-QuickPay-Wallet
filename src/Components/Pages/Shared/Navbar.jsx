import { Button } from "flowbite-react";
import { NavLink, useNavigate } from "react-router-dom";
import useUser from "../../Hooks/useUser";


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
    const {user} = useUser();
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        // Logout logic here
        localStorage.removeItem("token");
        navigate("/login");
        
    }

    return (
        <div>
            <div className="flex justify-between items-center py-5 px-2 md:px-5 lg:px-10 bg-[#F5F7F8]">
                <h1 className="text-3xl font-semibold">Quick Pay</h1>
                <div className="flex items-center gap-10">
                    <div className="">
                    <h2 className="text-xl font-medium">Hi, {user?.name}</h2>
                    </div>
                    <div className="">
                    <Button onClick={handleLogout} className='bg-blue-500 w-full' type="submit">Logout</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;