import "./features/shared/global.scss";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./features/auth/context/auth.provider";
import { PostProvider } from "./features/posts/context/post.provider";

const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <RouterProvider router={router} />
      </PostProvider>
    </AuthProvider>
  );
};

export default App;
