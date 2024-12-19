import React, { createContext, useContext, useState } from "react";

// Se crea un contexto para la autenticación
const AuthContext = createContext();

// Proveedor de autenticación que envuelve la aplicación
export const AuthProvider = ({ children }) => {
    // Estado para manejar si el usuario está autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Función para iniciar sesión, actualiza el estado a true
    const login = () => {
        setIsAuthenticated(true);
    };

    // Función para cerrar sesión, actualiza el estado a false
    const logout = () => {
        setIsAuthenticated(false);
    };

    // El contexto proporciona el estado y las funciones a los componentes hijos
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para consumir el contexto de autenticación
export const useAuth = () => useContext(AuthContext);