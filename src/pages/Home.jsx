import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles-Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  return (
    <div className="home-container">
      <header className="header">
        <button onClick={toggleMenu} className="menu-button">
          <svg className="hamburger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <h1 className="logo">TASK TRACKER</h1>
        
        <button onClick={() => navigate('/login')} className="login-button">
          Login
        </button>
      </header>

      {/* Overlay */}
      <div 
        className={`overlay ${isMenuOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
      />

      {/* Menú lateral */}
      <div className={`sidebar ${isMenuOpen ? 'active' : ''}`}>
        <button onClick={toggleMenu} className="close-button">
          <svg className="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            <li>
              <button onClick={() => {
                navigate('/my-projects');
                toggleMenu();
              }}>
                My Projects
              </button>
            </li>
            <li>
              <button onClick={() => {
                navigate('/settings');
                toggleMenu();
              }}>
                Settings
              </button>
            </li>
          </ul>
        </nav>
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

