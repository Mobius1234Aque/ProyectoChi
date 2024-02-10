import React, { useEffect } from "react";
import NotFound from "./errores/404";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Home } from "./views/Home";
import { Terminos } from "./views/Terminos";
import { Quien } from "./views/Quiensoy";
import { Politicas } from "./views/Politicas";
import { Cookies } from "./views/Cookies";
import { Regalu } from "./views/RegAlumnos";
import "./css/index.css";
import SearchComponent from "./views/Misalumnos";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { Login } from "./views/Login";
import { Salud } from "./views/Salud";
import { Preguntas } from "./views/Preguntas";
import { Escoger } from "./views/Escogerexa";
import { Historial } from "./views/Historial";
import { ModA } from "./views/Modalumnos";
import { ReContraseña } from "./views/ReContraseña";
import { Re2Contraseña } from "./views/Re2Contraseña";
import { Registro } from "./views/Registro";
import { Mapa } from "./views/Mapa";

// Componente ScrollToTop
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Terminos",
    element: <Terminos />,
  },
  {
    path: "/Quien",
    element: <Quien />,
  },
  {
    path: "/Politicas",
    element: <Politicas />,
  },
  {
    path: "/Cookies",
    element: <Cookies />,
  },
  {
    path: "/RegA",
    element: <Regalu />,
  },
  {
    path: "/MiLista",
    element: <SearchComponent />,
  },
  {
    path: "/Salud",
    element: <Salud />,
  },
  {
    path: "/Preguntas",
    element: <Preguntas />,
  },
  {
    path: "/esExamen",
    element: <Escoger />,
  },
  {
    path: "/Historial",
    element: <Historial />,
  },
  {
    path: "/modal",
    element: <ModA />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/ReContraseña",
    element: <ReContraseña />,
  },
  {
    path: "/Re2Contraseña",
    element: <Re2Contraseña />,
  },
  {
    path: "/Registro",
    element: <Registro />,
  },
  {
    path: "/Mapa",
    element: <Mapa />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <RouterProvider router={router}>
      <ScrollToTop />
    </RouterProvider>
  </>
);
