import React, { useContext, useEffect } from "react";
import { AdressContext } from "../../contexts/AdressContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableContainer,
} from "@chakra-ui/react";
import { IPersonAdress } from "../../utils/interfaces";

export const Details = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    adressList,
    attState,
    getAdressByIdPessoa,
    deleteAdressByIdEndereco,
  } = useContext(AdressContext);

  useEffect(() => {
    getAdressByIdPessoa(state.idPessoa);
  }, [attState]);

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

        <Tabs isFitted variant="enclosed" mt={4}>
          <TabList>
            <Tab>Endereço</Tab>
            <Tab>Contato</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <TableContainer>
                <Table
                  size="sm"
                  variant="striped"
                  colorScheme="messenger"
                  borderRadius={20}
                  mt={3}
                  width="100%"
                  shadow="lg"
                  opacity="0"
                  animation="slidein .5s ease-in-out forwards"
                >
                  <Thead>
                    <Tr>
                      <Th>CEP</Th>
                      <Th>Cidade</Th>
                      <Th>Complemento</Th>
                      <Th>Estado</Th>
                      <Th>Logradouro</Th>
                      <Th>Número</Th>
                      <Th>Tipo</Th>
                      <Th>País</Th>
                      <Th textAlign="center">Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {adressList?.map((adress: IPersonAdress) => (
                      <Tr key={adress.idEndereco}>
                        <Td>{adress.cep}</Td>
                        <Td>{adress.cidade}</Td>
                        <Td>{adress.complemento}</Td>
                        <Td>{adress.estado}</Td>
                        <Td>{adress.logradouro}</Td>
                        <Td>{adress.numero}</Td>
                        <Td>{adress.tipo}</Td>
                        <Td>{adress.pais}</Td>
                        <Td display="flex" flexDir="column" w="100">
                          <Button
                            colorScheme="red"
                            onClick={() => {
                              deleteAdressByIdEndereco(adress.idEndereco);
                            }}
                          >
                            Excluir
                          </Button>
                          <Button
                            colorScheme="green"
                            mt={1}
                            onClick={() =>
                              navigate("/dashboard/details/edit-adress", {
                                state: {
                                  ...adress,
                                  idPessoa: state.idPessoa,
                                },
                              })
                            }
                          >
                            Editar
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};
