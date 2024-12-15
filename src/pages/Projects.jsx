import React, { useState } from "react";
import { getProjects } from "../hooks/fetchProjects";
import "./styles/Projects.css";
import Sidebar from "../components/NavBar/SideBar";
import ProjectsCard from "../components/Projects/ProjectsCard";

export const Projects = () => {
  const { data: proyectos, loading: cargandoProyectos } = getProjects();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
