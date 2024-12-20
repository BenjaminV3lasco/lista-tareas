import React from 'react';

// Componente que representa una tarea individual en la lista
export default function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div className="task-item"> {/* Contenedor de la tarea */}
      {/* Muestra el nombre de la tarea */}
      <h3 className="task-title">{task.name}</h3>
      
      {/* Muestra la descripción de la tarea o un mensaje predeterminado */}
      <p className="task-description">
        Descripción: {task.description || 'Sin descripción disponible'}
      </p>
      
      {/* Botón para editar la tarea */}
      <button 
        className="task-button"
        onClick={() => onEdit(task)} // Llama a la función de edición con la tarea seleccionada
      >
        Editar Tarea
      </button>
      
      {/* Botón para eliminar la tarea */}
      <button 
        className="task-button-delete"
        onClick={() => onDelete(task._id)} // Llama a la función de eliminación con el ID de la tarea
      >
        Eliminar Tarea
      </button>
    </div>
  );
}