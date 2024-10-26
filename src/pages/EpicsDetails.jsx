import React from 'react'
import StoryCard from "../components/Stories/StoryCard";
import { getEpicsId } from '../hooks/fetchEpicsId';
import { useParams } from "react-router-dom";

export const EpicsDetails = () => {
    const {epicId} = useParams();
    const {data:epica} = getEpicsId (epicId)
    console.log ('los pibe', epica)
  return (
    <div>
        <h1>Detalles Epicas</h1>
        <h2>{epica && epica.description}</h2>
        <StoryCard epica = {epica}></StoryCard>
    </div>
  )
}
