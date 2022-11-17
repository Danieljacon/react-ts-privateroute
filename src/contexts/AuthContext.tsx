import React, { createContext, useState } from "react";
import { APIBASE } from "../utils/api";
import { IAuthContext, IChildren, IUser } from "../utils/interfaces";
import { useNavigate } from "react-router-dom";
import nProgress from "nprogress";
import axios from "axios";

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
      await axios.post(`${APIBASE}/auth/create`, newUser).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.log(error);
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
