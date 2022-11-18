import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
import { IUser } from "../../utils/interfaces";
import { Link, Navigate } from "react-router-dom";
import {
  Alert,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaAccount } from "../../utils/schemas";

export const Login = () => {
  const { handleLogin, token } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: yupResolver(schemaAccount),
  });

  const onSubmit = (data: IUser) => {
    handleLogin(data);
  };

  return token ? (
    <Navigate to="/dashboard" />
  ) : (
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
          <Input borderColor="gray.300" type="text" {...register("login")} />
          {errors.login && (
            <Alert status="error" borderRadius={8} mt={1}>
              <AlertIcon />
              <AlertTitle>{errors.login.message}</AlertTitle>
            </Alert>
          )}

          <FormLabel htmlFor="senha">Senha</FormLabel>
          <Input
            borderColor="gray.300"
            type="password"
            {...register("senha")}
          />
          {errors.senha && (
            <Alert status="error" borderRadius={8} mt={1}>
              <AlertIcon />
              <AlertTitle>{errors.senha.message}</AlertTitle>
            </Alert>
          )}

          <Button w={"full"} colorScheme="messenger" mt={2} type="submit">
            Login
          </Button>
          <Link to="/register">Não tem uma conta ainda? Registre-se!</Link>
        </FormControl>
      </Center>
    </Container>
  );
};
