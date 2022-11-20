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
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { IContact, IPersonAdress } from "../../utils/interfaces";
import { PeopleContext } from "../../contexts/PeopleContext";
import { ContactContext } from "../../contexts/ContactContext";

export const Details = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    adressList,
    attState,
    getAdressByIdPessoa,
    deleteAdressByIdEndereco,
  } = useContext(AdressContext);

  const { getContactList, removeContactById, contactList, attStateContact } =
    useContext(ContactContext);

  const { removePerson } = useContext(PeopleContext);

  useEffect(() => {
    getAdressByIdPessoa(state.idPessoa);
  }, [attState]);

  useEffect(() => {
    getContactList(state.idPessoa);
    console.log(state);
  }, [attStateContact]);

  return (
    <Container
      centerContent
      maxW="980px"
      mt={10}
      opacity="0"
      animation="slidein 1s ease-in-out forwards"
    >
      <Box p={10} borderRadius={20} width="100%" shadow="lg">
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={4} my={2}>
          <Stat>
            <StatNumber color="messenger.500" textAlign="end">
              Email
            </StatNumber>
            <StatHelpText textAlign="end">{state.email}</StatHelpText>
          </Stat>
          <Stat>
            <StatNumber color="messenger.500">CPF</StatNumber>
            <StatHelpText>
              {state.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
            </StatHelpText>
          </Stat>
          <Stat>
            <StatNumber color="messenger.500" textAlign="end">
              Nome
            </StatNumber>
            <StatHelpText textAlign="end">{state.nome}</StatHelpText>
          </Stat>
          <Stat>
            <StatNumber color="messenger.500">Data de Nascimento</StatNumber>
            <StatHelpText>
              {state.dataNascimento.replace(
                /(\d{4})-(\d{2})-(\d{2})/,
                "$3/$2/$1"
              )}
            </StatHelpText>
          </Stat>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Box display="flex" gap={2}>
            <Button
              onClick={() =>
                navigate(`/dashboard/details/new-adress`, { state: state })
              }
              colorScheme="messenger"
            >
              Adicionar novo endereço
            </Button>
            <Button
              onClick={() =>
                navigate(`/dashboard/details/new-contact`, { state: state })
              }
              colorScheme="messenger"
            >
              Adicionar novo contato
            </Button>
          </Box>
          <Box display="flex" gap={2}>
            <Button
              colorScheme="green"
              onClick={() => {
                navigate("/dashboard/edit-person", {
                  state: state,
                });
              }}
            >
              Editar pessoa
            </Button>
            <Button
              colorScheme="red"
              onClick={() => removePerson(state.idPessoa)}
            >
              Excluir pessoa
            </Button>
          </Box>
        </Box>

        <Tabs isFitted variant="enclosed" mt={4}>
          <TabList>
            <Tab>Endereço</Tab>
            <Tab>Contato</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {adressList.length > 0 ? (
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
                          <Td>
                            {adress.cep
                              .toString()
                              .replace(/(\d{5})(\d{3})/, "$1-$2")}
                          </Td>
                          <Td>{adress.cidade}</Td>
                          <Td>{adress.complemento}</Td>
                          <Td>{adress.estado}</Td>
                          <Td>{adress.logradouro}</Td>
                          <Td>{adress.numero}</Td>
                          <Td>{adress.tipo}</Td>
                          <Td>{adress.pais}</Td>
                          <Td display="flex" flexDir="column" w="100">
                            <Button
                              colorScheme="green"
                              mb={1}
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
                            <Button
                              colorScheme="red"
                              onClick={() => {
                                deleteAdressByIdEndereco(adress.idEndereco);
                              }}
                            >
                              Excluir
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              ) : (
                <div>Nenhum dado adicionado!</div>
              )}
            </TabPanel>

            {/* tabela contato */}

            <TabPanel>
              {contactList.length > 0 ? (
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
                        <Th>Tipo</Th>
                        <Th>Telefone</Th>
                        <Th>Descrição</Th>

                        <Th textAlign="center">Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {contactList?.map((contact: IContact) => (
                        <Tr key={contact.idContato}>
                          <Td>{contact.tipoContato}</Td>
                          <Td>
                            {contact.telefone
                              .toString()
                              .replace(/(\d{2})(\d{5})(\d{4})/, "$(2)$5-$4")}
                          </Td>
                          <Td>{contact.descricao}</Td>
                          <Td display="flex" flexDir="column" w="100">
                            <Button
                              colorScheme="green"
                              mb={1}
                              onClick={() =>
                                navigate("/dashboard/details/edit-contact", {
                                  state: {
                                    ...contact,
                                    idPessoa: state.idPessoa,
                                  },
                                })
                              }
                            >
                              Editar
                            </Button>
                            <Button
                              colorScheme="red"
                              onClick={() => {
                                removeContactById(contact.idContato);
                              }}
                            >
                              Excluir
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              ) : (
                <div>Nenhum contato adicionado!</div>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};
