import React, { useEffect } from 'react';

import ReactDOM from 'react-dom/client';

import { App } from "./App";

import { Home } from "./routes/Home";

import { Terminos } from "./routes/Terminos";

import { Quien } from "./routes/Quiensoy";

import { Politicas } from "./routes/Politicas";

import { Cookies } from "./routes/Cookies";

import { Regalu } from "./routes/RegAlumnos";

import './css/index.css';

import { Misalumno } from "./routes/Misalumnos";


import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";

import { Login } from './routes/Login';
import { Salud } from './routes/Salud';
import { Preguntas } from './routes/Preguntas';
import { Escoger } from './routes/Escogerexa';
import { Historial } from './routes/Historial';


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
        path:'/',
        element:<Home/>
    },
    {
        path:'/Login',
        element:<Login/>
    },
    {
        path:'/Terminos',
        element:<Terminos/>
    },
    {
        path:'/Quien',
        element:<Quien/>
    },
    {
        path:'/Politicas',
        element:<Politicas/>
    },
    {
        path:'/Cookies',
        element:<Cookies/>
    },
    {
        path:'/RegA',
        element:<Regalu/>
    },
    {
        path:'/MiLista',
        element:<Misalumno/>
    },
    {
        path:'/Salud',
        element:<Salud/>
    },
    {
        path:'/Preguntas',
        element:<Preguntas/>
    },
    {
        path:'/esExamen',
        element:<Escoger/>
    },
    {
        path:'/Historial',
        element:<Historial/>
    },


]);

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <>
        <RouterProvider router={router}>

        </RouterProvider>
    </>
);
