import { useState } from 'react';
import { URL } from '../consts/consts';

// Hook personalizado para manejar la autenticación con la API
const useAuthApi = () => {
  // Estados locales para manejar errores y el estado de carga
  const [error, setError] = useState(false); // Indica si ocurrió un error en la autenticación
  const [loading, setLoading] = useState(false); // Indica si la petición está en proceso

  // Función para autenticar al usuario con las credenciales proporcionadas
  const authenticate = async (credentials) => {
    setLoading(true); // Cambia el estado a "cargando" cuando inicia la petición
    try {
      // Realiza una solicitud POST al endpoint de inicio de sesión
      const response = await fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Especifica que se envía JSON
        },
        body: JSON.stringify(credentials), // Convierte las credenciales a JSON
      });

      const data = await response.json();
      
      // Si la respuesta es exitosa y se recibe un token, lo guarda en el almacenamiento local
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token); // Guarda el token en localStorage
        setError(false); // Limpia cualquier error previo
        return { success: true, token: data.token }; // Retorna true y el token
      } else {
        setError(true); // Marca que ocurrió un error
        return { success: false }; // Retorna false
      }
    } catch (err) {
      // Captura errores de red o problemas en la petición
      setError(true);
      return { success: false }; // Retorna false
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  // Retorna la función `authenticate` junto con los estados `error` y `loading`
  return { authenticate, error, loading };
};

export default useAuthApi;