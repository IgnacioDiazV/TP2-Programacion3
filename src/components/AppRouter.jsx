import React from "react";
import HomePages from "../pages/HomePages.jsx";
import LoginPages from "../pages/LoginPages.jsx";
import NosotrosPages from "../pages/NosotrosPages.jsx";
import ViewPages from "../pages/ViewPages.jsx";

const routeConfig = {
  "/": HomePages,
  "/home": HomePages,
  "/login": LoginPages,
  "/nosotros": NosotrosPages,
  "/view": ViewPages,
};

const AppRouter = ({ integrantesData, onAddIntegrante, logueado, setLogueado }) => {
  const currentPath = window.location.pathname.toLowerCase();
  const PageComponent = routeConfig[currentPath];

  if (PageComponent) {
    if (currentPath === "/" || currentPath === "/home") { 
      return (
        <PageComponent
          integrantesData={integrantesData}
          onAddIntegrante={onAddIntegrante}
        />
      );
    } else if (currentPath === "/login") {
      return (
        <LoginPages
          logueado={logueado}
          setLogueado={setLogueado}
        />
      );
    } else if (currentPath === "/nosotros") {
      return (
        <NosotrosPages
          integrantesData={integrantesData}
          onAddIntegrante={onAddIntegrante}
          logueado={logueado}
        />
      );
    } else {
      return (
        <PageComponent
          integrantesData={integrantesData}
        />
      );
    }
  } else {
    return (
      <main>
        <h2>404</h2>
        <p>
          "{window.location.pathname}" no existe.
        </p>
        <p>
          <a href="/">Volver al Inicio</a>
        </p>
      </main>
    );
  }
};

export default AppRouter;
