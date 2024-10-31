import { useState } from "react";
import { URL } from "../consts/consts";

export const useLogin = () => {
    const [auth, setAuth] = useState({
        data: null,
        loading: false,
        error: null,
      });
    
      const login = async (username, password) => {
        setAuth({ data: null, loading: true, error: null });
        try {
          const response = await fetch(`${URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            // Inicio de sesión exitoso
            localStorage.setItem("token", data.token);
            setAuth({
              data: data,
              loading: false,
              error: null,
            });
          } else {
            // Error: respuesta no es 2xx
            setAuth({
              data: null,
              loading: false,
              error: data.message || "Credenciales incorrectas. Inténtalo de nuevo.",
            });
          }
        } catch (error) {
          console.error(error);
          setAuth({
            data: null,
            loading: false,
            error: "Error al intentar iniciar sesión. Verifica tu conexión.",
          });
        }
      };
    
      return { auth, login };
    };
