import { createBrowserRouter } from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <h1>Welcome to Instagram Clone</h1>,
    },
    {
        path: '/login',
        Component: Login,
    }, 
    {
        path: '/register',
        Component: Register,
    }
])