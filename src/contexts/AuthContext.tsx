import React, { createContext, useState } from "react";
import { api } from "../utils/api";
import { IAuthContext, IChildren, IUser } from "../utils/interfaces";
import { useNavigate } from "react-router-dom";
import nProgress from "nprogress";

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );

  const createNewUser = async (newUser: IUser) => {
    // Falta: Toast de sucesso
    nProgress.start();
    try {
      await api.post("/auth/create", newUser);
      navigate("/");
    } catch (error) {
      // Falta: Toast de erro
      console.log(error);
    } finally {
      nProgress.done();
    }
  };

  const handleLogin = async (user: IUser) => {
    nProgress.start();
    try {
      const { data } = await api.post("/auth", user);
      localStorage.setItem("token", data);
      setToken(data);
      navigate("/dashboard");
    } catch (error) {
      // Falta: Toast de erro
      console.log(error);
    } finally {
      nProgress.done();
    }
  };

  const handleLoggout = () => {
    localStorage.removeItem("token");
    setToken("");
    delete api.defaults.headers.common["Authorization"];
    navigate("/");
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
