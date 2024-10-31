import React from 'react';
import '../styles/styles-Stories.css';

export default function Stories() {
  return (
    <div className="stories-container">
      <header className="stories-header">
        <div className="header-left">
          <button className="stories-back-btn">←</button>
          <h1 className="logo">MIS ÉPICAS</h1>
        </div>
        <button className="hamburger-menu">☰</button>
      </header>

      <div className="stories-details-content">
        <div className="story-item">
          <h2 className="story-title">Entender Componentes</h2>
          <p className="story-description">Conocer principal funcionamiento</p>
          <span className="story-status" data-status="done">done</span>
        </div>

        <div className="story-item">
          <h2 className="story-title">Trabajar con Módulos</h2>
          <p className="story-description">Poder integrarlos a la app</p>
          <span className="story-status" data-status="in-progress">En progreso</span>
        </div>
      </div>
    </div>
  );
}
