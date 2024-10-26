import React from 'react'
import { useState } from 'react';
import "../styles/styles-Home.css"
import { Link } from 'react-router-dom';


export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="home-container">
      <header className="header">
        <button className="menu-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <h1>¡Bienvenido!</h1>
      </header>
      
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          ×
        </button>
        <nav>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Historias</a></li>
           <Link to={`/my-projects`}> <li><a href="#">Proyectos</a></li></Link>
          </ul>
        </nav>
      </aside>

      <main className={`main-content ${isSidebarOpen ? 'shift' : ''}`}>
        <h1>Bienvenido a la página de inicio</h1>
        <p>Esta es la descripción principal del contenido de la página.</p>
      </main>
    </div>
  );
}

