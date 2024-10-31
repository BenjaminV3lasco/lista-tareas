import React, { useState } from "react";
import { getProjects } from "../hooks/fetchProjects";
import { Link, useNavigate } from "react-router-dom";
import "../styles/styles-Projects.css";

export const Projects = () => {
  const { data: proyectos, loading: cargando } = getProjects();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  return (
    <div className="projects-container">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <button onClick={toggleMenu} className="menu-button">
            <svg className="hamburger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <h1 className="logo">Mis Proyectos</h1>

        <h3>TRACKER TASK</h3>
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
      <div className="projects-content">
        <div className="projects-header">
          <h1></h1>
        </div>
        
        <div className="projects-grid">
          {proyectos && proyectos.map((proyecto) => (
            <Link 
              to={`/my-projects/${proyecto._id}`} 
              className="project-card" 
              key={proyecto._id}
            >
              <h3>{proyecto.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
