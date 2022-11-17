import React, { useEffect, useContext, useState } from "react";
import { PeopleContext } from "../../contexts/PeopleContext";
import { IPerson } from "../../utils/interfaces";
import { Link, useNavigate} from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export const Dashboard = () => {
  const { getPeople, removePerson, peopleList, loading, attState } =
    useContext(PeopleContext);
  const [page, setPage] = useState<string>("0");
  const navigate = useNavigate()

  useEffect(() => {
    getPeople(page);
    console.log(peopleList);
  }, [page, attState]);

  return (
    <>
      <Container
        centerContent
        maxW="980px"
        mt={10}
        opacity="0"
        animation="slidein 1s ease-in-out forwards"
      >
        <div>
          {loading ? (
            <Box bg="transparent" mt={7}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Box>
          ) : (
            <Box p={10} borderRadius={20} width="100%" shadow="lg">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Button colorScheme="messenger">
                  <Link to="/dashboard/new-person">Adicionar nova pessoa</Link>
                </Button>
                <Box display="flex" alignItems="center" gap={2}>
                  {page !== "0" && (
                    <Button
                      colorScheme="messenger"
                      onClick={() => setPage((parseInt(page) - 1).toString())}
                    >
                      Anterior
                    </Button>
                  )}
                  {peopleList?.totalPages !== parseInt(page) + 1 && (
                    <Button
                      colorScheme="messenger"
                      onClick={() => setPage((parseInt(page) + 1).toString())}
                    >
                      Próximo
                    </Button>
                  )}
                </Box>
              </Box>
              <Table
                size="md"
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
                    <Th>Nome</Th>
                    <Th>Email</Th>
                    <Th>CPF</Th>
                    <Th>Data de Nascimento</Th>
                    <Th textAlign="center">Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {peopleList?.content.map((person: IPerson) => (
                    <Tr key={person.idPessoa}>
                      <Td>{person.nome}</Td>
                      <Td>{person.email}</Td>
                      <Td>{person.cpf}</Td>
                      <Td>{person.dataNascimento}</Td>
                      <Td>
                        <Button colorScheme="red" onClick={() => removePerson(person.idPessoa)}>
                          Excluir
                        </Button>
                        <Button colorScheme="red" onClick={() => {navigate('/edit-person', {state: person})}}>
                          Excluir
                        </Button>
                     
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </div>
      </Container>
    </>
  );
};
