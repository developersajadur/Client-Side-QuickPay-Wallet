import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        // Logout logic here
        localStorage.removeItem("token");
        navigate("/login");
        
    }

    return (
        <div className="flex">
           <button onClick={handleLogout} className="primary">Logout</button>
        </div>
    );
};

export default HomePage;