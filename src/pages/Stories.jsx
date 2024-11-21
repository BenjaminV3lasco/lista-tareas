import React from 'react';
import { useAllStories } from '../hooks/fetchAllStories';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../components/NavBar/SideBar';

const Stories = () => {
  const { data: stories, loading, error } = useAllStories();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Cargando Historias...</p>
      </div>
    );
  }

  return (
    <div className="projects-container">
      <header className="epics-header">
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
      </header>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div 
        className={`overlay ${isMenuOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
      ></div>

      <div className="projects-content">
        <div className="projects-grid">
          {stories.map((story) => (
            <div 
              key={story.id}
              className="project-card"
            >
              <div>
               <h4>Nombre : {story.name}</h4>
               <p>Descripción: {story.description || "Sin descripción disponible"}</p>
              </div>
            </div>
            
          ))}
        </div>
        {stories.length === 0 && (
          <p>No hay historias.</p>
        )}
      </div>
    </div>
  );
};

export default Stories;