import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { IUser } from "../../utils/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
import { schemaAccount } from "../../utils/schemas";

export const Register = () => {
  const { createNewUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(schemaAccount),
  });

  const onSubmit = (data: IUser) => {
    createNewUser(data);
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
          onSubmit={handleSubmit(onSubmit)}
          as="form"
          p={10}
          borderRadius={20}
          shadow="lg"
        >
          <FormLabel htmlFor="login">Login</FormLabel>
          <Input type="text" {...register("login")} />
          {errors.login && (
            <Alert status="error" borderRadius={8} mt={1}>
              <AlertIcon />
              <AlertTitle>{errors.login.message}</AlertTitle>
            </Alert>
          )}

          <FormLabel htmlFor="senha">Senha</FormLabel>
          <Input type="password" {...register("senha")} />
          {errors.senha && (
            <Alert status="error" borderRadius={8} mt={1}>
              <AlertIcon />
              <AlertTitle>{errors.senha.message}</AlertTitle>
            </Alert>
          )}

          <Button
            w={"full"}
            colorScheme="messenger"
            mt={2}
            type="submit"
            value="Cadastrar"
          >
            Cadastrar
          </Button>
          <Link to="/">Já possui uma conta? Login!</Link>
        </FormControl>
      </Center>
    </Container>
  );
};
