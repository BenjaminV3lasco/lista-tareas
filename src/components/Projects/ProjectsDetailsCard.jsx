import React from 'react';

const ProjectDetailsCard = ({ proyecto, memberNames }) => {
  return (
    <div className="project-details-header">
      <div className="projects-item">
        <h3>Detalles del Proyecto</h3>
        <h2 className="project-title">Nombre: {proyecto.name}</h2>
        <p className="project-description">
          Descripción: {proyecto?.description || 'Sin descripción disponible'}
        </p>
        <p className="project-description">
          Miembros: {memberNames}
        </p>
        <span className="epic-status">
          {proyecto?.status || 'En progreso'}
        </span>
      </div>
    </div>
  );
};

export default ProjectDetailsCard;