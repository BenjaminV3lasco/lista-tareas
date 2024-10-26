import React from "react";
import { getProjects } from "../hooks/fetchProjects";
import { Link } from "react-router-dom";
//import "../styles/styles-Projects.css"

export const Projects = () => {
  const { data: proyectos, loading: cargando } = getProjects();
  console.log(proyectos);

  return (
    <div>
      <h1>Proyectos je</h1>
      <ul>
        {proyectos && proyectos.map((proyecto) => 
        <Link to={`/my-projects/${proyecto._id}`}><li key={proyecto._id}>{proyecto.name}</li></Link>)}
      </ul>
    </div>
  );
};
