import { Box, Button, Container } from "@chakra-ui/react";
import React from "react";
import { useContext } from "react";
import { Outlet, Navigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export const PrivateRoute = () => {
  const { token, handleLoggout } = useContext(AuthContext);
  const { pathname } = useLocation();

  return token ? (
    <>
      <Container centerContent zIndex={1999}>
        <Box position="fixed" p={4} bottom="0" zIndex={1999}>
          <Button colorScheme="messenger" mx="1" onClick={handleLoggout}>
            Loggout
          </Button>
          {pathname.split("/").length > 2 && (
            <Button colorScheme="messenger" mx="1">
              <Link to={pathname.split("/").slice(0, -1).join("/")}>
                Voltar
              </Link>
            </Button>
          )}
        </Box>
      </Container>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};
