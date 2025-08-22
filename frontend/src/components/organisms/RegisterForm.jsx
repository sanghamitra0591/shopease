import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearMessages } from '../../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Alert, CircularProgress, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { FiUserPlus } from 'react-icons/fi';
import '../../styles/RegisterPage.css';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, successMessage } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
  });

  useEffect(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  }, [successMessage, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2><FiUserPlus /> Register</h2>

      {error && <Alert severity="error">{error}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}

      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
        placeholder="Enter a username"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        placeholder="Enter a password"
      />

      <FormControl fullWidth style={{ marginTop: '1rem' }}>
        <InputLabel id="role-label">Select Role</InputLabel>
        <Select
          labelId="role-label"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="merchant">Merchant</MenuItem>
        </Select>
      </FormControl>

      <button type="submit" disabled={loading}>
        {loading ? <CircularProgress size={20} color="inherit" /> : 'Register'}
      </button>

      <p className="redirect-text">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </form>
  );
};

export default RegisterForm;
