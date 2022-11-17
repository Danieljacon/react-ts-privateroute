import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
import { IUser } from "../../utils/interfaces";
import { Link, Navigate } from "react-router-dom";
import { Container } from "@chakra-ui/react";

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
      <form className="flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="login">Login</label>
        <input type="text" {...register("login")} />
        <label htmlFor="senha">Senha</label>
        <input type="text" {...register("senha")} />
        <input type="submit" value="Login" />
      </form>
      <Link to="/register">Não tem uma conta ainda? Registre-se!</Link>
    </Container>
  );
};
