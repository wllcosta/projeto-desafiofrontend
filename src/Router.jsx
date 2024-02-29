import { createBrowserRouter } from "react-router-dom";
import { AppRoute } from "./AppRoute";
import { Home } from "./pages/Home";
import Users from "./pages/Users";
import UserCreate from "./pages/UserCreate";
export const Router = createBrowserRouter([
    {
        path: '/',
        element: <AppRoute />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/users', element: <Users /> },
            { path: '/user-create', element: <UserCreate /> },
        ]
    }
])