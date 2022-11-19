import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PeopleProvider } from "./contexts/PeopleContext";
import { AddNewPerson } from "./pages/AddPerson";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { PrivateRoute } from "./pages/PrivateRoute";
import { Register } from "./pages/Register";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { EditPerson } from "./pages/EditPerson";
import { Details } from "./pages/Details";
import { AdressProvider } from "./contexts/AdressContext";
import { NewAdress } from "./pages/NewAdress";
import { EditAdress } from "./pages/EditAdress";

export const Router = () => {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Box>
          <AuthProvider>
            <PeopleProvider>
              <AdressProvider>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                      path="/dashboard/edit-person"
                      element={<EditPerson />}
                    />
                    <Route
                      path="/dashboard/new-person"
                      element={<AddNewPerson />}
                    />
                    <Route path="/dashboard/details" element={<Details />} />
                    <Route
                      path="/dashboard/details/new-adress"
                      element={<NewAdress />}
                    />
                    <Route
                      path="/dashboard/details/edit-adress"
                      element={<EditAdress />}
                    />
                  </Route>
                </Routes>
              </AdressProvider>
            </PeopleProvider>
          </AuthProvider>
        </Box>
      </ChakraProvider>
    </BrowserRouter>
  );
};
