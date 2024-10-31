import React from 'react';
import { useState } from 'react';
import { getStoriesId } from '../hooks/fetchStoriesId';
import { Link, useParams, useNavigate } from "react-router-dom";
import TaskCard from '../components/Tasks/TaskCard';
import '../styles/styles-Stories.css';

export const StoriesDetails = () => {
    const navigate = useNavigate();
    const {storyId} = useParams();
    const {data:story} = getStoriesId(storyId);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Estado para controlar la visibilidad del menú desplegable
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
    return (
        <div className="stories-container">
            <header className="stories-header">
            <div className="header-left">
        <button onClick={() => navigate(-1)} className="back-button">
            <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="hamburger-menu" onClick={toggleSidebar}>
            ☰
          </button>

          <div className="logo">Mis Historias</div>
        </div>

        {/* Menú Desplegable */}
      <aside className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <button className="close-button" onClick={toggleSidebar}>
          ✕
        </button>
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            <li>
              <button onClick={() => {
                navigate('/my-projects');
                toggleMenu();
              }}>
                My Projects
              </button>
            </li>

            <li>
              <button onClick={() => {
                navigate('/my-projects/:projectId/:epicId/:storyId');
                toggleMenu();
              }}>
                My Stories
              </button>
            </li>
            
            <li>
              <button onClick={() => {
                navigate('/settings');
                toggleMenu();
              }}>
                Settings
              </button>
            </li>
          </ul>
        </nav>
      </aside>
            </header>

            <div className="stories-details-content">
                <h1></h1>
                
                <div className="story-item">
                    <div className="story-info">
                    <h3>Detalles de la Historia</h3>
                        <h2>Nombre: {story.name}</h2>
                        <p className="story-description">Descripción:{story?.description || 'Sin descripción disponible'}</p>
                    </div>
                </div>

                <div className="tasks-section">
                    <h3 className="tasks-title">Tareas</h3>
                    <div className="tasks-container">
                        <TaskCard />
                    </div>
                </div>
            </div>
        </div>
    );
}