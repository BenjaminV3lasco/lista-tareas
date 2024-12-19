import React, { useState } from 'react';
import { getTasks } from '../../hooks/fetchTasks';
import { useParams } from "react-router-dom";
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';
import '../../pages/styles/TaskCard.css';
import { URL } from '../../consts/consts';

// Componente principal TaskCard
export default function TaskCard() {
  // Extraer parámetros de la URL (proyectoId, epicId, storyId)
  const { proyectoId, epicId, storyId } = useParams();
  
  // Hook personalizado para obtener tareas y recargarlas
  const { data: tasks, loading: cargando, refetch } = getTasks(storyId);
  
  // Estados locales para controlar el modal, la edición y los datos de tareas
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // Tarea seleccionada para edición
  const [taskData, setTaskData] = useState({ // Datos del formulario
    name: '',
    description: '',
    story: storyId,
    done: false
  });

  // Actualiza los valores del formulario cuando se escriben
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Abre el modal y prepara los datos para editar
  const handleEdit = (task) => {
    setSelectedTask(task);
    setTaskData(task);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Elimina una tarea tras confirmar
  const handleDelete = async (taskId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      try {
        const response = await fetch(`${URL}/tasks/${taskId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            auth: localStorage.getItem('token')
          },
        });
        
        if (!response.ok) {
          throw new Error('Error al eliminar la tarea');
        }
        await refetch(); // Recarga las tareas
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al eliminar la tarea');
      }
    }
  };

  // Crea una nueva tarea validando el campo "description"
  const handleCreate = async (e) => {
    e.preventDefault();

    if (taskData.description && taskData.description.length < 10) {
      alert('La descripción debe tener al menos 10 caracteres');
      return;
    }

    try {
      const response = await fetch(`${URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          auth: localStorage.getItem('token')
        },
        body: JSON.stringify(taskData),
      });
      
      if (!response.ok) {
        throw new Error('Error al crear la tarea');
      }

      await refetch(); // Recarga las tareas
      closeModal(); // Cierra el modal
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al crear la tarea');
    }
  };

  // Actualiza una tarea existente validando la descripción
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (taskData.description && taskData.description.length < 10) {
      alert('La descripción debe tener al menos 10 caracteres');
      return;
    }

    if (!selectedTask) return;

    try {
      const response = await fetch(`${URL}/tasks/${selectedTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          auth: localStorage.getItem('token')
        },
        body: JSON.stringify(taskData),
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar la tarea');
      }
      
      await refetch(); // Recarga las tareas
      closeModal();
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al actualizar la tarea');
    }
  };

  // Abre el modal para agregar una nueva tarea
  const openModal = () => {
    setTaskData({ 
      name: '', 
      description: '', 
      story: storyId, 
      done: false 
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Cierra el modal y resetea los datos
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setSelectedTask(null);
    setTaskData({ 
      name: '', 
      description: '', 
      story: storyId, 
      done: false 
    });
  };

  // Si los datos están cargando, muestra un loader
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
        {tasks && tasks.map((task) => ( // Renderiza la lista de tareas
          <TaskItem 
            key={task._id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div className="add-task-container">
        <button 
          className="add-task-button"
          onClick={openModal}
        >
          Agregar Tarea
        </button>
      </div>

      {/* Modal para agregar/editar tareas */}
      <TaskModal 
        isEditing={isEditing}
        taskData={taskData}
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={isEditing ? handleUpdate : handleCreate}
        onChange={handleInputChange}
      />
    </div>
  );
}