import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/styles-home.css';
import Sidebar from '../components/NavBar/Sidebar';

const Home = () => {
  const navigate = useNavigate();
  
  // Estado para controlar la visibilidad del menú desplegable
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="header-left">
          <button className="hamburger-menu" onClick={toggleSidebar}>
            ☰
          </button>
        </div>
        
        <h3 className="logo">TASK TRACKER</h3>
        
        <button onClick={() => navigate('/login')} className="login-button">
          Login
        </button>
      </header>
      <div>
        {/* Menú Desplegable */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      
      {/* Contenido principal */}
      <main className="main-content">
        {/* Tarjetas */}
        <div className="cards-container">
          <div className="card">
            <h2>Organiza tareas</h2>
            <p>Gestiona tus tareas de forma personalizada y clasifícalas por proyectos.</p>
          </div>

          <div className="card">
            <h2>Seguimiento de Progreso</h2>
            <p>Monitorea tu avance en tiempo real y asegura el cumplimiento de tus objetivos.</p>
          </div>

          <div className="card">
            <h2>Reportes Detallados</h2>
            <p>Genera informes para evaluar el rendimiento y estado actual de tus proyectos.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        © 2024 Lista de Tareas. Todos los derechos reservados
      </footer>
    </div>
  );
};

export default Home;

