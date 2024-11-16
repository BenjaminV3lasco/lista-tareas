import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
      <button className="close-button" onClick={toggleSidebar}>
        ✕
      </button>
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          <li>
            <button onClick={() => {
              navigate('/my-projects');
              toggleSidebar();
            }}>
              My Projects
            </button>
          </li>
          <li>
            <button onClick={() => {
              navigate('/my-stories'); // Actualizado para usar la nueva ruta
              toggleSidebar();
            }}>
              My Stories
            </button>
          </li>
          <li>
            <button onClick={() => {
              navigate('/settings');
              toggleSidebar();
            }}>
              Settings
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;