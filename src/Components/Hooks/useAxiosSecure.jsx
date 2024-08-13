import axios from "axios";
const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/`,
    headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
});


const useAxiosSecure = () => {
    return axiosSecure
};

export default useAxiosSecure;