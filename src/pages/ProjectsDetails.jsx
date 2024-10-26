import React from "react";
import { useParams } from "react-router-dom";
import { getProjectsId } from "../hooks/fetchProjectsId";
import EpicsCard from "../components/Epics/EpicsCard"


export const ProjectsDetails = () => {
  const { projectId } = useParams();
  const {data:proyecto} = getProjectsId (projectId)
  console.log ('los vago', proyecto)

  return <div>
          <h1>Project Details</h1>
          <h2>{proyecto && proyecto.description}</h2>
          <EpicsCard proyecto = {proyecto}></EpicsCard>
        </div>;
};
