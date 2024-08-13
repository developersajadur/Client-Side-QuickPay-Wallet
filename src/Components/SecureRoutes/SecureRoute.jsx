import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const api = import.meta.env.VITE_API_URL;

const SecureRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState(null); // Add state to handle token validation

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${api}/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setIsValidToken(true);
        } else {
          handleLogoutAndNavigate();
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        handleLogoutAndNavigate();
      }
    };

    const handleLogoutAndNavigate = () => {
      localStorage.removeItem('token');
      navigate('/login');
    };

    const token = localStorage.getItem('token');
    if (!token) {
      handleLogoutAndNavigate();
    } else {
      validateToken(token);
    }
  }, [navigate]);

  // Optionally show a loading spinner or similar while checking the token
  if (isValidToken === null) {
    return <div>Loading...</div>;
  }

  if (isValidToken) {
    return <>{children}</>;
  }

  return null; // Or a fallback UI
};

export default SecureRoute;
