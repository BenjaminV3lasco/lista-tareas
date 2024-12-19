import { useEffect, useState } from "react";
import { URL } from "../consts/consts";

// Hook para obtener la lista de proyectos desde el servidor
export const getProjects = () => {
  // Estado para almacenar los datos y el estado de carga
  const [projects, setProjects] = useState({
    data: [],
    loading: true,
  });

  // Función asíncrona para hacer la petición a la API
  const fetchProjects = async () => {
    try {
      const url = `${URL}/projects`; // Endpoint para obtener proyectos
      const response = await fetch(url, {
        method: "GET", // Método HTTP
        headers: {
          "Content-Type": "application/json", // Tipo de contenido que se envía
          auth: localStorage.getItem("token"), // Token de autenticación desde localStorage
        },
      });

      // Extrae solo la propiedad 'data' de la respuesta
      const { data } = await response.json();

      // Actualiza el estado con los datos obtenidos
      setProjects({
        data: data,
        loading: false, // Finaliza el estado de carga
      });
    } catch (error) {
      console.log(error); // Manejo básico de errores
      setProjects({
        data: [], // Vacía los datos en caso de error
        loading: false, // Finaliza el estado de carga
      });
    }
  };

  // Se ejecuta solo una vez al montar el componente
  useEffect(() => {
    fetchProjects();
  }, []);

  return projects; // Retorna el estado con los datos y el estado de carga
};


