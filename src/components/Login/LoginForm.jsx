import React from 'react';

const LoginForm = ({ credentials, handleInputChange, handleSubmit, error }) => (
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
);

export default LoginForm;



