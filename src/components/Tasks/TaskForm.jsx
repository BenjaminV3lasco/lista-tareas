import React from 'react';

// Componente de formulario reutilizable para crear y editar tareas
export default function TaskForm({ isEditing, taskData, onSubmit, onCancel, onChange }) {
  return (
    <form onSubmit={onSubmit}> {/* Maneja el envío del formulario */}
      <div className="form-group">
        <label htmlFor="name">Nombre de la tarea:</label>
        {/* Input controlado para el nombre de la tarea */}
        <input
          type="text"
          id="name"
          name="name"
          value={taskData.name} // Valor actual del nombre de la tarea
          onChange={onChange}   // Actualiza el estado al escribir
          required              // Campo obligatorio
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción:</label>
        {/* Input controlado para la descripción de la tarea */}
        <textarea
          id="description"
          name="description"
          value={taskData.description} // Valor actual de la descripción
          onChange={onChange}          // Actualiza el estado al escribir
          rows="4"                     // Define el tamaño del área de texto
        />

        {/* Mensaje de error si la descripción es muy corta */}
        {taskData.description && taskData.description.length < 10 && (
          <small className="error-message">
            La descripción debe tener al menos 10 caracteres.
          </small>
        )}
      </div>

      <div className="modal-buttons">
        {/* Botón de envío que varía según si se está editando o creando */}
        <button type="submit" className="submit-button">
          {isEditing ? 'Actualizar Tarea' : 'Crear Tarea'}
        </button>
        
        {/* Botón para cancelar la acción y cerrar el formulario */}
        <button 
          type="button" 
          className="cancel-button"
          onClick={onCancel} // Llama a la función para cancelar
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}