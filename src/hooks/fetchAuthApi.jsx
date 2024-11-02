import { useState } from 'react';
import { URL } from '../consts/consts';

const useAuthApi = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const authenticate = async (credentials) => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token); // Guardamos el token
        setError(false);
        return { success: true, token: data.token };
      } else {
        setError(true);
        return { success: false };
      }
    } catch (err) {
      setError(true);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { authenticate, error, loading };
};

export default useAuthApi;