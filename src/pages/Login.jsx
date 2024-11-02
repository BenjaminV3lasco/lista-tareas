import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import useAuthApi from '../hooks/fetchAuthApi';
import LoginForm from '../components/Login/LoginForm';
import "../styles/styles-Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { authenticate, error, loading } = useAuthApi();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await authenticate(credentials);
    if (result.success) {
      login();
      navigate('/my-projects');
    }
  };

  if (loading) {
    return (
      <div className="login-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <button onClick={() => navigate('/')} className="home-button">
        ⌂
      </button>
      <header className="header">
        <h1 className="logo">TASK TRACKER</h1>
      </header>
      <LoginForm
        credentials={credentials}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        error={error}
      />
    </div>
  );
};

export default Login;