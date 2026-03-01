import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import Feed from "../features/posts/pages/Feed";
import ProtectedRoute from "./ProtectedRoute";
import CreatePost from "../features/posts/components/CreatePost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Feed/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/create-post",
    Component: CreatePost,
  }
]);
