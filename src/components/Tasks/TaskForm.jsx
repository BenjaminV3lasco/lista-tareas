import React from 'react';

export default function TaskForm({ isEditing, taskData, onSubmit, onCancel, onChange }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nombre de la tarea:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={taskData.name}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          name="description"
          value={taskData.description}
          onChange={onChange}
          rows="4"
        />

          {taskData.description && taskData.description.length < 10 && (
            <small className="error-message">La descripción debe tener al menos 10 caracteres.</small>
          )}
      </div>

      <div className="modal-buttons">
        <button type="submit" className="submit-button">
          {isEditing ? 'Actualizar Tarea' : 'Crear Tarea'}
        </button>
        <button 
          type="button" 
          className="cancel-button"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}