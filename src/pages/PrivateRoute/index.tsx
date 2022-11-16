import React from "react";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export const PrivateRoute = () => {
  const { token, handleLoggout } = useContext(AuthContext);

  return token ? (
    <div>
      <button onClick={handleLoggout}>Loggout</button>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/" />
  );
};
