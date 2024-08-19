import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Destinations from "./pages/Destinations"
import Tours from "./pages/Tours"
import CreateDestination from "./pages/CreateDestination"
import CreateTour from "./pages/CreateTour"
import Users from "./pages/Users"

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Destinations/>}/>
        <Route path="/tours" element={<Tours/>}/>
        <Route path="/create-destination" element={<CreateDestination/>}/>
        <Route path="/create-tour" element={<CreateTour/>}/>
        <Route path="/users" element={<Users/>}/>
      </Route>
    )
  )
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App
