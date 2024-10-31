import React from 'react'
import { getTasks } from '../../hooks/fetchTasks'
import { Link, useParams } from "react-router-dom";
import '../../styles/styles-TaskCard.css';

export default function TaskCard() {
  const {proyectoId, epicId, storyId} = useParams()
  const { data: tasks, loading: cargando } = getTasks(storyId);

  if (cargando) {
    return (
      <div className="task-loading">
        <div className="loader"></div>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-empty">
        <p>No hay tareas disponibles</p>
      </div>
    );
  }

  return (
    <div className="project-tasks">
      {tasks.map((task) => (
        <Link 
          key={task._id} 
        >
          <div className="task-item">
            <h3 className="task-title">{task.name}</h3>
            <p className="task-description">Descripción: {task.description || 'Sin descripción disponible'}</p>
            <span className="task-status">{task.status || 'En progreso'}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
