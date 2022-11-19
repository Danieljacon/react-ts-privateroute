import React, { useContext, useEffect } from "react";
import { AdressContext } from "../../contexts/AdressContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Container } from "@chakra-ui/react";

export const Details = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { adressList, getAdressByIdPessoa } = useContext(AdressContext);

  useEffect(() => {
    getAdressByIdPessoa(state.idPessoa);
  }, []);

  useEffect(() => {
    console.log(adressList);
  }, [adressList]);

  return (
    <Container
      centerContent
      maxW="980px"
      mt={10}
      opacity="0"
      animation="slidein 1s ease-in-out forwards"
    >
      <Box p={10} borderRadius={20} width="100%" shadow="lg">
        <Box display="flex" alignItems="center">
          <Button
            onClick={() =>
              navigate(`/dashboard/details/new-adress`, { state: state })
            }
            colorScheme="messenger"
          >
            Adicionar novo endereço
          </Button>
        </Box>

        {/* table aqui */}
      </Box>
    </Container>
  );
};
