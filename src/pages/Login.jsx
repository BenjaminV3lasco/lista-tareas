import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUsers } from "../hooks/fetchUsers";
import { URL } from '../consts/consts';
import { useAuth } from '../auth/AuthProvider'; // Asegúrate de importar el contexto
import "../styles/styles-Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtiene la función de login del contexto
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(false);
  const { data: users, loading } = useGetUsers();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        login(); // Actualiza el estado de autenticación
        navigate('/my-projects');
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
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
      <header className="header">
        <h1 className="logo">TASK TRACKER</h1>
      </header>
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Ingresa tu usuario"
              value={credentials.username}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {error && (
            <p className="error-message">
              Credenciales inválidas. Por favor, intenta nuevamente.
            </p>
          )}
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;