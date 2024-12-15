import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectsId } from "../hooks/fetchProjectsId";
import EpicsCard from "../components/Epics/EpicsCard";
import "./styles/ProjectsDetails.css";
import ProjectDetailsCard  from "../components/Projects/ProjectsDetailsCard";
import {useMemberNames} from "../hooks/fetchMembersName";
import { useGetUsers } from "../hooks/fetchUsers";
import Sidebar from "../components/NavBar/SideBar";

export const ProjectsDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data: proyecto } = getProjectsId(projectId);
  const { data: users } = useGetUsers();
  
  // Usar el nuevo hook
  const { memberNames, debugData } = useMemberNames(proyecto?.members, users);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!proyecto) {
    return (
      <div className="project-details-container">
        <div className="project-details-content">
          <div className="project-details-content-wrapper">
            <div className="loader"></div>
          </div>
        </div>
      </div>
    );
  }

  // Opcional: llamar a debugData cuando necesites
  // debugData();

  return (
    <>
      <header className="header">
        <div className="header-left">
          <button onClick={() => navigate(-1)} className="back-button">
            <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="hamburger-menu" onClick={toggleSidebar}>
            ☰
          </button>
          <div className="logo">Mis Proyectos</div>
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="project-details-container">
        <div className="project-details-content">
          <div className="project-details-content-wrapper">
            <ProjectDetailsCard 
              proyecto={proyecto} 
              memberNames={memberNames} 
            />
            
            <div>
              <EpicsCard proyecto={proyecto} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};