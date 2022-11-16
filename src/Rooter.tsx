import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PeopleProvider } from "./contexts/PeopleContext";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { PrivateRoute } from "./pages/PrivateRoute";
import { Register } from "./pages/Register";

export const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PeopleProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </PeopleProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
