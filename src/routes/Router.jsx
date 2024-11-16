import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { Projects } from "../pages/Projects";
import Settings from "../pages/Settings";
import { ProjectsDetails } from "../pages/ProjectsDetails";
import { EpicsDetails } from "../pages/EpicsDetails";
import { StoriesDetails } from "../pages/StoriesDetails";
import Login from "../pages/Login";
import ProtectedRoute from "../pages/ProtectedRoute"; // Importa el componente ProtectedRoute
import AllStories from "../pages/AllStoriesPage";
import AllStoriesPage from "../pages/AllStoriesPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        element: <ProtectedRoute />, // Agrupa las rutas protegidas
        children: [
            {
                path: "/my-projects",
                element: <Projects />
            },
            {
                path: "/my-projects/:projectId",
                element: <ProjectsDetails />
            },
            {
                path: "/my-projects/:projectId/:epicId",
                element: <EpicsDetails />
            },
            {
                path: "/my-projects/:projectId/:epicId/:storyId",
                element: <StoriesDetails />
            },
            {  path: "/my-stories", // Nueva ruta
                element: <AllStoriesPage/>
            },

            {
                path: "/settings",
                element: <Settings />
            }
        ]
    }
]);

export default router;