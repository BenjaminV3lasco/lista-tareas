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
    </div>
  );
}
