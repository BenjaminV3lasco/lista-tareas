import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles-Settings.css';
import { useAuth } from '../auth/AuthProvider';

const Settings = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const {logout, user} = useAuth();

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h1 className="settings-title">Configuración</h1>
        
        <div className="settings-section">
          <h2 className="settings-section-title">Cuenta</h2>
          <p>Nombre: {user.username}</p>
          <div className="settings-button-container">
            <button
              className="edit-button"
             
            >
              Modificar Datos de Usuario
              
            </button>
            
            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
