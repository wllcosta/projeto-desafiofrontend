//Rotas

import { createBrowserRouter } from "react-router-dom";
import { Template } from "./Template";
import { Home } from "./pages/Home";
import Users from "./pages/Users";
import UserCreate from "./pages/UserCreate";
export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Template />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/users', element: <Users /> },
            { path: '/user-create', element: <UserCreate /> },
        ]
    }
])