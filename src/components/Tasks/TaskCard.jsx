import React, { useState } from 'react'
import { getTasks } from '../../hooks/fetchTasks'
import { Link, useParams } from "react-router-dom";
import '../../styles/styles-TaskCard.css';

export default function TaskCard() {
  const {proyectoId, epicId, storyId} = useParams();
  const { data: tasks, loading: cargando, mutate } = getTasks(storyId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newTask,
          storyId
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la tarea');
      }

      // Limpiar el formulario
      setNewTask({ name: '', description: '' });
      // Cerrar el modal
      setIsModalOpen(false);
      // Actualizar la lista de tareas
      mutate();
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al crear la tarea');
    }
  };

  if (cargando) {
    return (
      <div className="task-loading">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="tasks-container">
      <div className="project-tasks">
        {tasks && tasks.map((task) => (
          <Link key={task._id}>
            <div className="task-item">
              <h3 className="task-title">{task.name}</h3>
              <p className="task-description">Descripción: {task.description || 'Sin descripción disponible'}</p>
              <button className="task-button">Editar Tarea</button>
              <button className="task-button-delete">Eliminar Tarea</button>
            </div>
          </Link>
        ))}
      </div>

      <div className="add-task-container">
        <button 
          className="add-task-button"
          onClick={() => setIsModalOpen(true)}
        >
          Agregar Tarea
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Crear Nueva Tarea</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre de la tarea:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newTask.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Descripción:</label>
                <textarea
                  id="description"
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  rows="4"
                />
              </div>

              <div className="modal-buttons">
                <button type="submit" className="submit-button">
                  Crear Tarea
                </button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
