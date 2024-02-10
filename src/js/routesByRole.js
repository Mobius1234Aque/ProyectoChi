// routesByRole.js
export const routesByRole = {
    "guest": [
      { name: "Inicio", path: "/" },
      { name: "Registro", path: "/Registro" },
      { name: "Inicio de sesión", path: "/Login" },
      { name: "¿Quiénes somos?", path: "/Quien" },
      { name: "Preguntas", path: "/Preguntas" },
      { name: "Mapa", path: "/Mapa" },
    ],
    "1": [
      { name: "Inicio", path: "/" },
      {
        name: "Alumnos",
        path: "/Alumnos",
        submenu: [
          { name: "Registrar", path: "/RegA" },
          { name: "Mis alumnos", path: "/MiLista" },
          { name: "Modificar mi lista", path: "/modal" },
        ],
      },
      {
        name: "Salud",
        path: "/Salud",
        submenu: [
          { name: "Registro", path: "/RegA" },
          { name: "Actualización", path: "/MiLista" },
          { name: "Descarga de reporte", path: "/modal" },
        ],
      },
      {
        name: "Examen",
        path: "/Examen",
        submenu: [
          { name: "Registro", path: "/RegA" },
          { name: "Actualización", path: "/MiLista" },
          { name: "Descarga de reporte", path: "/modal" },
        ],
      },
      { name: "¿Quiénes somos?", path: "/Quien" },
      { name: "Preguntas", path: "/Preguntas" },
      { name: "Mapa", path: "/Mapa" },
    ],
    "2": [
      { name: "Inicio", path: "/" },
      {
        name: "Alumnos",
        path: "/Alumnos",
        submenu: [
          { name: "Registrar", path: "/RegA" },
          { name: "Mis alumnos", path: "/MiLista" },
          { name: "Modificar mi lista", path: "/modal" },
        ],
      },
      {
        name: "Salud",
        path: "/Salud",
        submenu: [
          { name: "Registro", path: "/RegA" },
          { name: "Actualización", path: "/MiLista" },
          { name: "Descarga de reporte", path: "/modal" },
        ],
      },
      {
        name: "Examen",
        path: "/Examen",
        submenu: [
          { name: "Registro", path: "/RegA" },
          { name: "Actualización", path: "/MiLista" },
          { name: "Descarga de reporte", path: "/modal" },
        ],
      },
      { name: "¿Quiénes somos?", path: "/Quien" },
      { name: "Preguntas", path: "/Preguntas" },
      { name: "Mapa", path: "/Mapa" },
    ],
    "3": [
      { name: "Inicio", path: "/" },
      {
        name: "Salud",
        path: "/Salud",
        submenu: [
          { name: "Registro", path: "/RegA" },
          { name: "Actualización", path: "/MiLista" },
          { name: "Descarga de reporte", path: "/modal" },
        ],
      },
      { name: "¿Quiénes somos?", path: "/Quien" },
    ],
  };
  