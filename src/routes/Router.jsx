import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { Projects } from "../pages/Projects";
import Settings from "../pages/Settings";
import { ProjectsDetails } from "../pages/ProjectsDetails";
import { EpicsDetails } from "../pages/EpicsDetails";
import { StoriesDetails } from "../pages/StoriesDetails";
import Login from "../pages/Login";
import ProtectedRoute from "../pages/ProtectedRoute";
import Stories from "../pages/Stories";

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
            {  path: "/my-stories",
                element: <Stories/>
            },

            {
                path: "/settings",
                element: <Settings />
            }
        ]
    }
]);

export default router;