import { Box, Button, Container } from "@chakra-ui/react";
import React from "react";
import { useContext } from "react";
import {
  Outlet,
  Navigate,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export const PrivateRoute = () => {
  const { token, handleLoggout } = useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return token ? (
    <>
      <header>
        <Container centerContent zIndex={1999} transition="all .5s ease">
          <Box
            position="fixed"
            p={2}
            bg="white"
            top={3}
            borderRadius={8}
            zIndex={1999}
            boxShadow="md"
          >
            <Button
              colorScheme="messenger"
              mx="1"
              onClick={handleLoggout}
              animation="opacity .5s ease-in-out forwards"
            >
              Loggout
            </Button>
            {pathname.split("/").length > 2 && (
              <Button
                colorScheme="messenger"
                mx="1"
                animation="opacity .5s ease-in-out forwards"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Voltar
              </Button>
            )}
          </Box>
        </Container>
      </header>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};
