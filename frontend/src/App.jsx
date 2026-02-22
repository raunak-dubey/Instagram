import { RouterProvider } from "react-router/dom"
import { router } from "./routes"
import './styles.scss'

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App