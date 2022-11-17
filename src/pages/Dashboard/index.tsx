import React, { useEffect, useContext, useState } from "react";
import { PeopleContext } from "../../contexts/PeopleContext";
import { IPerson } from "../../utils/interfaces";
import { Link } from "react-router-dom";
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
  const { getPeople, peopleList, loading } = useContext(PeopleContext);
  const [page, setPage] = useState<string>("0");

  useEffect(() => {
    getPeople(page);
  }, [page]);

  return (
    <>
      <Container centerContent maxW="980px" mt={10}  opacity="0" animation="slidein 1s ease-in-out forwards">
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
                opacity="0" animation="slidein .5s ease-in-out forwards"
              >
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Email</Th>
                    <Th>CPF</Th>
                    <Th>Data de Nascimento</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {peopleList?.content.map((person: IPerson) => (
                    <Tr key={person.idPessoa}>
                      <Td>{person.nome}</Td>
                      <Td>{person.email}</Td>
                      <Td>{person.cpf}</Td>
                      <Td>{person.dataNascimento}</Td>
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
