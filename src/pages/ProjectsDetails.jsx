import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectsId } from "../hooks/fetchProjectsId";
import EpicsCard from "../components/Epics/EpicsCard";
import "../styles/styles-ProjectsDetails.css";
import Sidebar from "../components/NavBar/SideBar";

export const ProjectsDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data: proyecto } = getProjectsId(projectId);
  
  // Estado para controlar la visibilidad del menú desplegable
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleGoBack = () => {
    navigate(-1);
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
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="project-details-container">
        <div className="project-details-content">
          <div className="project-details-content-wrapper">
            <div className="project-details-header">
              <div className="projects-item">
              <h3>Detalles del Proyecto</h3>
                <h2 className="project-title">Nombre: {proyecto.name}</h2>
                <p className="project-description">Descripción: {proyecto?.description || 'Sin descripción disponible'}</p>
                <p className="project-description">Miembros: {proyecto?.members || 'Sin miembros'}</p>
                <span className="epic-status">{proyecto?.status || 'En progreso'}</span>
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