import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectsId } from "../hooks/fetchProjectsId";
import EpicsCard from "../components/Epics/EpicsCard";
import "./styles/ProjectsDetails.css";
import { useGetUsers } from "../hooks/fetchUsers";
import Sidebar from "../components/NavBar/SideBar";

export const ProjectsDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data: proyecto } = getProjectsId(projectId);
  const { data: users } = useGetUsers(); // Usando tu hook con su estructura
  
  // Estado para controlar la visibilidad del menú desplegable
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

 // Función auxiliar para debugear la estructura de los datos
 const debugData = () => {
  console.log('Proyecto:', proyecto);
  console.log('Users:', users);
  console.log('Members:', proyecto?.members);
};

// Function to get user names from member IDs
const getMemberNames = (memberIds) => {
  if (!memberIds || !users || !Array.isArray(users)) return 'Sin miembros';
  
  // Para debugear
  debugData();
  
  // Convertir a array si es un solo ID
  const memberArray = Array.isArray(memberIds) ? memberIds : [memberIds];
  
  const memberNames = memberArray
    .map(memberId => {
      const user = users.find(user => user.id === memberId || user._id === memberId);
      // Intentar diferentes propiedades comunes para el nombre
      return user ? (user.username  || user.fullName || user.email || 'Usuario sin nombre') : null;
    })
    .filter(name => name !== null)
    .join(', ');
  
  return memberNames || 'Sin miembros';
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
                <p className="project-description">
                Miembros: {getMemberNames(proyecto?.members)}</p>
                <span className="epic-status">{proyecto?.status || 'En progreso'}</span>
              </div>
            </div>
              <div>
                <EpicsCard proyecto={proyecto} />
              </div>
          </div>
        </div>
      </div>
    </>
  );
};