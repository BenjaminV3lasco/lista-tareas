import React from 'react';
import TaskForm from './TaskForm';

// Componente modal que encapsula el formulario de tareas
export default function TaskModal({ isEditing, taskData, isOpen, onClose, onSubmit, onChange }) {
  if (!isOpen) return null; // No renderiza nada si el modal está cerrado

  return (
    <div className="modal-overlay"> {/* Fondo opaco para el modal */}
      <div className="modal-content"> {/* Contenido principal del modal */}
        {/* Título dinámico según si se está editando o creando */}
        <h2>{isEditing ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h2>
        
        {/* Renderiza el formulario para tareas */}
        <TaskForm 
          isEditing={isEditing}
          taskData={taskData}
          onSubmit={onSubmit}   // Envía los datos al componente principal
          onCancel={onClose}    // Cierra el modal
          onChange={onChange}   // Actualiza los campos del formulario
        />
      </div>
    </div>
  );
}