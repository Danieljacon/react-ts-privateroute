import React, { useEffect, useContext, useState, useMemo } from "react";
import { PeopleContext } from "../../contexts/PeopleContext";
import { IPerson } from "../../utils/interfaces";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Select,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export const Dashboard = () => {
  const { getPeople, peopleList, loading, attState, totalPages } =
    useContext(PeopleContext);
  const [page, setPage] = useState<string>("0");
  const navigate = useNavigate();

  const pages = useMemo(() => {
    const pageList: number[] = [];

    for (let i = 0; i < totalPages; i++) {
      pageList.push(i);
    }

    return pageList;
  }, [totalPages]);

  useEffect(() => {
    getPeople(page);
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
                <Box
                  display="grid"
                  alignItems="center"
                  gridTemplateColumns="repeat(3, 1fr)"
                  gap={2}
                >
                  <Button
                    colorScheme="messenger"
                    onClick={() => setPage((parseInt(page) - 1).toString())}
                    disabled={parseInt(page) === 0 ? true : false}
                  >
                    Anterior
                  </Button>

                  <Select
                    value={page}
                    onChange={(e) => setPage(e.target.value)}
                    colorScheme="messenger"
                  >
                    {pages.map((pageNum) => (
                      <option key={pageNum} value={pageNum}>
                        {pageNum + 1}
                      </option>
                    ))}
                  </Select>

                  <Button
                    colorScheme="messenger"
                    onClick={() => setPage((parseInt(page) + 1).toString())}
                    disabled={parseInt(page) === totalPages - 1 ? true : false}
                  >
                    Próximo
                  </Button>
                </Box>
              </Box>
              <Table
                size="md"
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
                  </Tr>
                </Thead>
                <Tbody>
                  {peopleList?.content.map((person: IPerson) => (
                    <Tr
                      key={person.idPessoa}
                      onClick={() =>
                        navigate("/dashboard/details", {
                          state: person,
                        })
                      }
                      _hover={{
                        cursor: "pointer",
                        backgroundColor: "blue.100",
                      }}
                    >
                      <Td>{person.nome}</Td>
                      <Td>{person.email}</Td>
                      <Td>
                        {person.cpf.replace(
                          /(\d{3})(\d{3})(\d{3})(\d{2})/,
                          "$1.$2.$3-$4"
                        )}
                      </Td>
                      <Td>
                        {person.dataNascimento.replace(
                          /(\d{4})-(\d{2})-(\d{2})/,
                          "$3/$2/$1"
                        )}
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
