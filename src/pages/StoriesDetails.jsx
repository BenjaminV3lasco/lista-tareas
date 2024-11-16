import React from "react";
import { useState } from "react";
import { getStoriesId } from "../hooks/fetchStoriesId";
import { Link, useParams, useNavigate } from "react-router-dom";
import TaskCard from "../components/Tasks/TaskCard";
import "../styles/styles-Stories.css";
import Sidebar from "../components/NavBar/SideBar";

export const StoriesDetails = () => {
  const navigate = useNavigate();
  const { storyId } = useParams();
  const { data: story } = getStoriesId(storyId);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Estado para controlar la visibilidad del menú desplegable
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="stories-container">
      <header className="stories-header">
        <div className="header-left">
          <button onClick={() => navigate(-1)} className="back-button">
            <svg
              className="back-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button className="hamburger-menu" onClick={toggleSidebar}>
            ☰
          </button>

          <div className="logo">Mis Historias</div>
        </div>

        {/* Menú Desplegable */}

        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
      </header>

      <div className="stories-details-content">
        <h1></h1>

        <div className="story-item">
          <div className="story-info">
            <h3>Detalles de la Historia</h3>
            <h2>Nombre: {story.name}</h2>
            <p className="story-description">
              Descripción: {story?.description || "Sin descripción disponible"}
            </p>
            <span className="epic-status">
              {story?.status || "En progreso"}
            </span>
          </div>
        </div>

        <div>
          <h3 className="tasks-title">Tareas</h3>
          <div className="tasks-container">
            <TaskCard />
          </div>
        </div>
      </div>
    </div>
  );
};
