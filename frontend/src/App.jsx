import { RouterProvider } from "react-router/dom";
import { router } from "./routes";
import "./styles.scss";
import { AuthProvider } from "./features/auth/context/auth.provider";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
