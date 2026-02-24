import { RouterProvider } from "react-router/dom";
import { router } from "./routes";
import "./features/shared/global.scss";
import { AuthProvider } from "./features/auth/context/auth.provider";
import { PostProvider } from "./features/post/context/post.provider";

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
