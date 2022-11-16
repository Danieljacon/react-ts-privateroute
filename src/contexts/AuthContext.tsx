import React, { createContext } from "react";
import { APIBASE } from "../utils/api";
import { IAuthContext, IChildren, IUser } from "../utils/interfaces";
import { useNavigate } from "react-router-dom";
import nProgress from "nprogress";
import axios from "axios";

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();

  const createNewUser = async (newUser: IUser) => {
    // Falta: Adicionar toast de sucesso
    nProgress.start();
    try {
      await axios.post(`${APIBASE}/auth/create`, newUser);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      nProgress.done();
    }
  };

  const handleLogin = async (user: IUser) => {
    // Falta: Enviar para a página de Dashboard
    nProgress.start();
    try {
      const { data } = await axios.post(`${APIBASE}/auth`, user);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      nProgress.done();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        createNewUser,
        handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
