import React from 'react'
import { getStoriesId } from '../../hooks/fetchStories'
import { Link, useParams } from "react-router-dom";


export default function StoryCard({ epica }) {
  const {epicId, proyectoId} = useParams()
  const { data: stories, loading: cargando } = getStoriesId(epicId);

  if (cargando) {
    return (
      <div className="epic-loading">
        <div className="loader"></div>
      </div>
    );
  }

  if (!stories || stories.length === 0) {
    return (
      <div className="epic-empty">
        <p>No hay historias disponibles</p>
      </div>
    );
  }

  return (
    <div className="project-epics">
      {stories.map((story) => (
        <Link key={story._id} to={`/my-projects/${proyectoId}/${epicId}/${story._id}`} className="epic-link">
          <div className="epic-item">
            <h3 className="epic-title">{story.name}</h3>
            <p className="epic-description">Descripción: {story.description || 'Sin descripción disponible'}</p>
            <span className="epic-status">{story.status || 'En progreso'}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
