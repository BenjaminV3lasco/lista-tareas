import React from 'react';
import TaskForm from './TaskForm';

export default function TaskModal({ isEditing, taskData, isOpen, onClose, onSubmit, onChange }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isEditing ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h2>
        <TaskForm 
          isEditing={isEditing}
          taskData={taskData}
          onSubmit={onSubmit}
          onCancel={onClose}
          onChange={onChange}
        />
      </div>
    </div>
  );
}