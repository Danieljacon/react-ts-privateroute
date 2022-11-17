import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { PeopleContext } from "../../contexts/PeopleContext";
import { IPerson } from "../../utils/interfaces";
import {
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export const AddNewPerson = () => {
  const { addNewPerson } = useContext(PeopleContext);
  const { register, handleSubmit } = useForm<IPerson>();
  const onSubmit = (data: IPerson) => {
    addNewPerson(data);
  };
  return (
    <Container>
      <Center minH={"100vh"} display="flex" flexDir="column">
        <FormControl
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          p={10}
          borderRadius={20}
          shadow="lg"
        >
          <FormLabel htmlFor="nome">Nome</FormLabel>
          <Input type="text" {...register("nome")} />
          <FormLabel htmlFor="cpf">CPF</FormLabel>
          <Input type="text" {...register("cpf")} />
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input type="text" {...register("email")} />
          <FormLabel htmlFor="data">Data</FormLabel>
          <Input type="date" {...register("dataNascimento")} />
          <Button type="submit" w={"full"} colorScheme="messenger" mt={2}>
            Adicionar
          </Button>
        </FormControl>
      </Center>
    </Container>
  );
};
