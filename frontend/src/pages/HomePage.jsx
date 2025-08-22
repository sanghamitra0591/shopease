import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { token, role } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // Not logged in → go to login
      navigate('/login');
    } else if (role === 'merchant') {
      navigate('/merchant');
    } else if (role === 'user') {
      navigate('/user');
    } else {
      // fallback
      navigate('/login');
    }
  }, [token, role, navigate]);

  return null; // or a loading spinner while redirecting
};

export default HomePage;
