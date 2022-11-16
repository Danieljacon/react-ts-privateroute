import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
import { IUser } from "../../utils/interfaces";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const { handleLogin, token } = useContext(AuthContext);
  const { register, handleSubmit } = useForm<IUser>();

  const onSubmit = (data: IUser) => {
    handleLogin(data);
  };

  return token ? (
    <Navigate to="/dashboard" />
  ) : (
    <div>
      <form className="flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="login">Login</label>
        <input type="text" {...register("login")} />
        <label htmlFor="senha">Senha</label>
        <input type="text" {...register("senha")} />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};
