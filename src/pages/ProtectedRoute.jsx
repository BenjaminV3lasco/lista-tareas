import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

// Componente para proteger rutas que requieren autenticación
const ProtectedRoute = () => {
    // Extrae el estado de autenticación usando el hook "useAuth"
    const { isAuthenticated } = useAuth();

    // Si el usuario está autenticado, muestra las rutas hijas
    // De lo contrario, redirige a la página principal
    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;