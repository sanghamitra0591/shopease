import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearMessages } from '../../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Alert, CircularProgress } from '@mui/material';
import { FiLogIn } from 'react-icons/fi';
import '../../styles/LoginPage.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, loading, error } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (token) {
      navigate('/');
    }
    dispatch(clearMessages());
  }, [token, navigate, dispatch]);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2><FiLogIn /> Login</h2>

      {error && <Alert severity="error">{error}</Alert>}

      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
        placeholder="Enter your username"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        placeholder="Enter your password"
      />

      <button type="submit" disabled={loading}>
        {loading ? <CircularProgress size={20} color="inherit" /> : 'Login'}
      </button>

      <p className="redirect-text">
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
    </form>
  );
};

export default LoginForm;
