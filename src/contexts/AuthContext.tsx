import React, { createContext, useState } from "react";
import { APIBASE } from "../utils/api";
import { IAuthContext, IChildren, IUser } from "../utils/interfaces";
import { useNavigate } from "react-router-dom";
import nProgress from "nprogress";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: IChildren) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );

  const createNewUser = async (newUser: IUser) => {
    nProgress.start();
    try {
      await axios.post(`${APIBASE}/auth/create`, newUser).then(() => {
        navigate("/");
      });
      toast({
        title: "Conta criada.",
        description: "Sua conta foi criada com sucesso!",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);

      toast({
        title: "Houve um erro.",
        description: "Não foi possível criar sua conta.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } finally {
      nProgress.done();
    }
  };

  const handleLogin = async (user: IUser) => {
    nProgress.start();
    try {
      await axios.post(`${APIBASE}/auth`, user).then((response) => {
        setToken(response.data);
        localStorage.setItem("token", response.data);
        navigate("/dashboard");

        toast({
          title: "Bem vindo!",
          status: "info",
          duration: 6000,
          isClosable: true,
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      nProgress.done();
    }
  };

  const handleLoggout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");

    toast({
      title: "Até mais!",
      status: "info",
      duration: 6000,
      isClosable: true,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        createNewUser,
        handleLogin,
        handleLoggout,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
