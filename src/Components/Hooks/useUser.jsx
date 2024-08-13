import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { jwtDecode } from 'jwt-decode';

const useUser = () => {
  const axiosSecure = useAxiosSecure();

  // Get the token from localStorage
  const token = localStorage.getItem('token');

  // Decode the token to get user data
  let userEmail = null;
  if (token) {
    try {
      const userData = jwtDecode(token);
      userEmail = userData?.email;
    } catch (error) {
      console.error('Invalid token:', error);
    }
  } else {
    console.error('No token found');
  }

  const { data: user = {}, error, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(`/users/${userEmail}`);
        return data;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error; 
      }
    },
  });

  return { user, error, isLoading }; 
};

export default useUser;
