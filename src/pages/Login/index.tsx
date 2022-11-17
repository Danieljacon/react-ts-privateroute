import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
import { IUser } from "../../utils/interfaces";
import { Link, Navigate } from "react-router-dom";
import {
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export const Login = () => {
  const { handleLogin, token } = useContext(AuthContext);
  const { register, handleSubmit } = useForm<IUser>();

  const onSubmit = (data: IUser) => {
    handleLogin(data);
  };

  return token ? (
    <Navigate to="/dashboard" />
  ) : (
    <Container>
      <Center minH={"100vh"} display="flex" flexDir="column" opacity="0" animation="slidein 1s ease-in-out forwards">
        <FormControl
          onSubmit={handleSubmit(onSubmit)}
          as="form"
          p={10}
          borderRadius={20}
          shadow="lg"
        >
          <FormLabel htmlFor="login">Login</FormLabel>
          <Input borderColor="gray.300" type="text" {...register("login")} />
          <FormLabel htmlFor="senha">Senha</FormLabel>
          <Input borderColor="gray.300" type="text" {...register("senha")} />
          <Button w={"full"} colorScheme="messenger" mt={2} type="submit">
            Login
          </Button>
          <Link to="/register">Não tem uma conta ainda? Registre-se!</Link>
        </FormControl>
      </Center>
    </Container>
  );
};
