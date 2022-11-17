import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PeopleProvider } from "./contexts/PeopleContext";
import { AddNewPerson } from "./pages/AddPerson";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { PrivateRoute } from "./pages/PrivateRoute";
import { Register } from "./pages/Register";
import { ChakraProvider } from "@chakra-ui/react";

export const Router = () => {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <PeopleProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/dashboard/new-person"
                  element={<AddNewPerson />}
                />
              </Route>
            </Routes>
          </PeopleProvider>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
};
