import React from 'react';

export default function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div className="task-item">
      <h3 className="task-title">{task.name}</h3>
      <p className="task-description">Descripción: {task.description || 'Sin descripción disponible'}</p>
      <button 
        className="task-button"
        onClick={() => onEdit(task)}
      >
        Editar Tarea
      </button>
      <button 
        className="task-button-delete"
        onClick={() => onDelete(task._id)}
      >
        Eliminar Tarea
      </button>
    </div>
  );
}