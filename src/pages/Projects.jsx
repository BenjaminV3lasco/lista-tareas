import React, { useState } from "react";
import { getProjects } from "../hooks/fetchProjects";
import "./styles/Projects.css";
import Sidebar from "../components/NavBar/SideBar";
import ProjectsCard from "../components/Projects/ProjectsCard";

export const Projects = () => {
  // Extraemos los datos y el estado de carga usando el hook getProjects
  const { data: proyectos, loading: cargandoProyectos } = getProjects();

  // Estado local para controlar si la barra lateral está abierta o cerrada
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Función para alternar el estado de la barra lateral
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Muestra un mensaje de carga mientras se obtienen los proyectos
  if (cargandoProyectos) {
    return <div>Cargando Proyectos...</div>;
  }

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <button className="hamburger-menu" onClick={toggleSidebar}>
            ☰
          </button>
          <div className="logo">Mis Proyectos</div>
        </div>
      </header>

      {/* Menú Desplegable */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Contenido principal */}
      <div className="projects-content">
        <ProjectsCard proyectos={proyectos} />
      </div>
    </div>
  );
};
