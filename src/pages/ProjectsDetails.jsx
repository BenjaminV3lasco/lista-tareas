import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectsId } from "../hooks/fetchProjectsId";
import EpicsCard from "../components/Epics/EpicsCard";
import "../styles/styles-ProjectsDetails.css";

export const ProjectsDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data: proyecto } = getProjectsId(projectId);
  
  // Estado para controlar la visibilidad del menú desplegable
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (!proyecto) {
    return (
      <div className="project-details-container">
        <div className="project-details-content">
          <div className="project-details-content-wrapper">
            <div className="loader"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Encabezado con botón de volver atrás y menú hamburguesa */}
      <header className="header">
        <div className="header-left">
        <button onClick={() => navigate(-1)} className="back-button">
            <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="hamburger-menu" onClick={toggleSidebar}>
            ☰
          </button>
          <div className="logo">Mis Proyectos</div>
        </div>
      </header>

      {/* Menú Desplegable */}
      <aside className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <button className="close-button" onClick={toggleSidebar}>
          ✕
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
                navigate('/my-projects/:projectId/:epicId/:storyId');
                toggleMenu();
              }}>
                My Stories
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
      </aside>

      <div className="project-details-container">
        <div className="project-details-content">
          <div className="project-details-content-wrapper">
            <div className="project-details-header">
              <div className="projects-item">
              <h3>Detalles del Proyecto</h3>
                <h2>Nombre: {proyecto.name}</h2>
                <p className="project-description">Descripción: {proyecto?.description || 'Sin descripción disponible'}</p>
              </div>
            </div>
              <div className="project-epics">
                <EpicsCard proyecto={proyecto} />
              </div>
          </div>
        </div>
      </div>
    </>
  );
};