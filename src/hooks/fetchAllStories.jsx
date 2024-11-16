import { useState, useEffect } from 'react';
import { URL } from "../consts/consts";

export const useAllStories = () => {
  const [stories, setStories] = useState({
    data: [],
    loading: true,
    error: null
  });

  const fetchAllStories = async () => {
    try {
      const response = await fetch(`${URL}/stories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch stories');
      }

      const { data } = await response.json();
      
      setStories({
        data: data,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error(error);
      setStories({
        data: [],
        loading: false,
        error: error.message
      });
    }
  };

  useEffect(() => {
    fetchAllStories();
  }, []);

  return stories;
};