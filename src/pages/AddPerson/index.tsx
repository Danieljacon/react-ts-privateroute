import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { PeopleContext } from "../../contexts/PeopleContext";
import { IPerson } from "../../utils/interfaces";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaPeople } from "../../utils/schemas";
import InputMask from "react-input-mask";

export const AddNewPerson = () => {
  const { addNewPerson } = useContext(PeopleContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPerson>({
    resolver: yupResolver(schemaPeople),
  });

  const onSubmit = (data: IPerson) => {
    addNewPerson(data);
  };

  return (
    <Container>
      <Center
        minH={"100vh"}
        display="flex"
        flexDir="column"
        opacity="0"
        animation="slidein 1s ease-in-out forwards"
      >
        <FormControl
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          p={10}
          borderRadius={20}
          shadow="lg"
        >
          <FormLabel htmlFor="nome">Nome</FormLabel>
          <Input type="text" {...register("nome")} />
          {errors.nome && (
            <Alert status="error" borderRadius={8} mt={1}>
              <AlertIcon />
              <AlertTitle>{errors.nome.message}</AlertTitle>
            </Alert>
          )}
          <FormLabel htmlFor="cpf">CPF</FormLabel>
          <Input
            as={InputMask}
            mask="999.999.999-99"
            type="text"
            {...register("cpf")}
          />
          {errors.cpf && (
            <Alert status="error" borderRadius={8} mt={1}>
              <AlertIcon />
              <AlertTitle>{errors.cpf.message}</AlertTitle>
            </Alert>
          )}

          <FormLabel htmlFor="email">Email</FormLabel>
          <Input type="text" {...register("email")} />
          {errors.email && (
            <Alert status="error" borderRadius={8} mt={1}>
              <AlertIcon />
              <AlertTitle>{errors.email.message}</AlertTitle>
            </Alert>
          )}

          <FormLabel htmlFor="data">Data</FormLabel>
          <Input type="date" {...register("dataNascimento")} />
          {errors.dataNascimento && (
            <Alert status="error" borderRadius={8} mt={1}>
              <AlertIcon />
              <AlertTitle>{errors.dataNascimento.message}</AlertTitle>
            </Alert>
          )}

          <Button type="submit" w={"full"} colorScheme="messenger" mt={2}>
            Adicionar
          </Button>
        </FormControl>
      </Center>
    </Container>
  );
};
