import React from "react";
import { useContext } from "react";
import { Outlet, Navigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export const PrivateRoute = () => {
  const { token, handleLoggout } = useContext(AuthContext);
  const { pathname } = useLocation();

  return token ? (
    <div>
      <button onClick={handleLoggout}>Loggout</button>
      {pathname.split("/").length > 2 && (
        <Link to={pathname.split("/").slice(0, -1).join("/")}>Voltar</Link>
      )}
      <Outlet />
    </div>
  ) : (
    <Navigate to="/" />
  );
};
