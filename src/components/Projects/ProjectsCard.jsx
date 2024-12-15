import React from 'react';
import { Link } from "react-router-dom";
import "../../pages/styles/Projects.css";

const ProjectsCard = ({ proyectos }) => {
  return (
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
      {proyectos.length === 0 && (
        <p>No hay proyectos disponibles.</p>
      )}
    </div>
  );
};

export default ProjectsCard;