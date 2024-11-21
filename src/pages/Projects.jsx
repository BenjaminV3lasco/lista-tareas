import React, { useState} from "react";
import { getProjects } from "../hooks/fetchProjects";
import { Link, useNavigate } from "react-router-dom";
import "../styles/styles-Projects.css";
import Sidebar from "../components/NavBar/SideBar";

export const Projects = () => {
  const { data: proyectos, loading: cargandoProyectos } = getProjects();
  const navigate = useNavigate();

  // Estado para controlar la visibilidad del menú desplegable
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
      {proyectos.length === 0 && (
          <p>No hay proyectos disponibles.</p>
        )}
    </div>
  );
};
