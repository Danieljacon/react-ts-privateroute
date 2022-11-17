import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { IUser } from "../../utils/interfaces";
import {
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export const Register = () => {
  const { createNewUser } = useContext(AuthContext);
  const { register, handleSubmit } = useForm<IUser>();

  const onSubmit = (data: IUser) => {
    createNewUser(data);
  };

  return (
    <Container>
      <Center minH={"100vh"} display="flex" flexDir="column">
        <FormControl
          onSubmit={handleSubmit(onSubmit)}
          as="form"
          p={10}
          borderRadius={20}
          shadow="lg"
        >
          <FormLabel htmlFor="login">Login</FormLabel>
          <Input type="text" {...register("login")} />
          <FormLabel htmlFor="senha">Senha</FormLabel>
          <Input type="text" {...register("senha")} />
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
