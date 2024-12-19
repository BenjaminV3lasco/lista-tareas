import React, { useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { getEpicsId } from '../hooks/fetchEpicsId';
import StoryCard from '../components/Stories/StoryCard';
import './styles/EpicsDetails.css';
import Sidebar from '../components/NavBar/Sidebar';


export const EpicsDetails = () => {
  const navigate = useNavigate();
  const {epicId} = useParams();
  const {data:epica} = getEpicsId(epicId);
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
    <div className="epics-container">
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

          <div className="logo">Mis Épicas</div>
        </div>
      </header>

      {/* Menú Desplegable */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div 
        className={`overlay ${isMenuOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
      ></div>

      <h1 className="epics-title"></h1>
      <div className="project-epics">
        <div className="epic-item">
          <h3>Detalles de la Épica</h3>
          <h2 className="epic-title">Nombre: {epica?.name}</h2>
          <p className="epic-description">Descripción: {epica?.description || 'Sin descripción disponible'}</p>
          <span className="epic-status">{epica?.status || 'En progreso'}</span>
        </div>
      </div>
      <h3 className="epics-title">Historias</h3>
      <StoryCard epica={epica} />
    </div>
  );
}