import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const api = import.meta.env.VITE_API_URL;

const SecureRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogoutAndNavigate = () => {
      localStorage.removeItem('token');
      navigate('/login');
    };

    const validateToken = async (token) => {
      try {
        const response = await fetch(`${api}/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          handleLogoutAndNavigate();
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        handleLogoutAndNavigate();
      }
    };

    const token = localStorage.getItem('token');
    if (!token) {
      handleLogoutAndNavigate();
    } else {
      validateToken(token);
    }
  }, [navigate]);

  return <>{children}</>;
};

export default SecureRoute;
