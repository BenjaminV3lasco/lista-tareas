import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function () {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    // Estado para controlar la visibilidad del menú desplegable
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleBack = () => {
      navigate(-1);
    };
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };

  return (
    <div>
        <button onClick={() => navigate(-1)} className="back-button">
            <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <button className="hamburger-menu" onClick={toggleSidebar}>
                ☰
        </button></div>
  )
}

