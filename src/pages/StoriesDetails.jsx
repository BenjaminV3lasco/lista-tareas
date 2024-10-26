import React from 'react'
import { getStoriesId } from '../hooks/fetchStoriesId';
import { useParams } from "react-router-dom";
import TaskCard from '../components/Tasks/TaskCard';

export const StoriesDetails = () => {
    const {storyId} = useParams();
    const {data:story} = getStoriesId (storyId)
    console.log ('los muchacho', story)
  return (
    <div>
        <h1>Detalles Historias</h1>
        <h2>{story && story.description}</h2>
        <TaskCard></TaskCard>
    </div>
  )
}