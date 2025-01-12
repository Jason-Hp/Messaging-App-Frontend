import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./routes/MainPage"
import Login from "./routes/Login"
import Register from "./routes/Register"
import axios from "axios"
import Search from './routes/search';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element:<Register />,
  },
  {
    path:"/search",
    element:<Search />
  }
]);

axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)