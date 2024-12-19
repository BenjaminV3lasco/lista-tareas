import { useEffect, useState } from "react";
import { URL } from "../consts/consts";

// Hook para obtener los detalles de un proyecto específico por su ID
export const getProjectsId = (id) => {
  // Estado para almacenar el proyecto y su estado de carga
  const [projects, setProjects] = useState({
    data: null,
    loading: true,
  });

  // Función asíncrona para hacer la petición a la API
  const fetchProjectsId = async () => {
    try {
      const url = `${URL}/projects/${id}`; // Endpoint para un proyecto específico
      const response = await fetch(url, {
        method: "GET", // Método HTTP
        headers: {
          "Content-Type": "application/json", // Tipo de contenido
          auth: localStorage.getItem("token"), // Token para autenticarse
        },
      });

      // Extrae la propiedad 'data' de la respuesta
      const { data } = await response.json();

      // Actualiza el estado con la información obtenida
      setProjects({
        data: data,
        loading: false, // Finaliza el estado de carga
      });
    } catch (error) {
      console.log(error); // Manejo de errores
      setProjects({
        data: null, // Reinicia los datos en caso de error
        loading: false, // Finaliza el estado de carga
      });
    }
  };

  // Se ejecuta una sola vez cuando el hook se inicializa
  useEffect(() => {
    fetchProjectsId();
  }, [id]); // Se asegura que el hook responda si cambia el ID

  return projects; // Retorna el estado con los datos y el estado de carga
};