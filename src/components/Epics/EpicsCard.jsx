import React from 'react';
import { Link, useParams } from "react-router-dom";
import { getEpics } from '../../hooks/fetchEpics';
import "../../styles/styles-EpicsCard.css"


const EpicsCard = ({ proyecto }) => {
  const { projectId } = useParams();
  const { data: epics, loading: cargando } = getEpics(projectId);

  if (cargando) {
    return (
      <div className="epics-container">
        <div className="epic-loading">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  if (!epics || epics.length === 0) {
    return (
      <div className="epics-container">
        <div className="epic-empty">
          <p>No hay épicas disponibles</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="epics-container">
      <h2 className="epics-title">Épicas del Proyecto</h2>
      <div className="project-epics">
        {epics.map((epic) => (
          <Link 
            key={epic._id}
            to={`/my-projects/${proyecto._id}/${epic._id}`}
            className="epic-link"
          >
            <div className="epic-item">
              <h3 className="epic-title">{epic.name}</h3>
              <p className="epic-description">
                Descripción: {epic.description || 'Sin descripción disponible'}
              </p>
              <span className="epic-status">
                {epic.status || 'En progreso'}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EpicsCard;
