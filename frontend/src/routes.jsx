import { createBrowserRouter } from 'react-router';
import Register from './features/auth/pages/Register';
import Login from './features/auth/pages/Login';
import Feed from './features/posts/pages/Feed';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Feed,
  },
  {
    path: "/register",
    Component: Register
  },
  {
    path: "/login",
    Component: Login
  }
]);
