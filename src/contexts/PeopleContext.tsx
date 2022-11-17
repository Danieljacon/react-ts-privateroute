import React, { createContext, useContext, useState } from "react";
import {
  IChildren,
  IPeopleContext,
  IPeople,
  IPerson,
} from "../utils/interfaces";
import { APIBASE } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useToast } from "@chakra-ui/react";

import nProgress from "nprogress";
import axios from "axios";

export const PeopleContext = createContext({} as IPeopleContext);
export const PeopleProvider = ({ children }: IChildren) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [peopleList, setPeopleList] = useState<IPeople | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [attState, setAttState] = useState<boolean>(false);
  const { token } = useContext(AuthContext);

  const getPeople = async (page?: string) => {
    setLoading(true);
    try {
      await axios
        .get(`${APIBASE}/pessoa?pagina=${page}&tamanhoDasPaginas=6`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => setPeopleList(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addNewPerson = async (person: IPerson) => {
    nProgress.start();
    try {
      await axios
        .post(`${APIBASE}/pessoa`, person, {
          headers: {
            Authorization: token,
          },
        })
        .then(() => {
          navigate("/dashboard");

          toast({
            title: "Um novo usuário foi adicionado.",
            status: "success",
            duration: 6000,
            isClosable: true,
          });
        });
    } catch (error) {
      console.log(error);

      toast({
        title: "Houve algum erro.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } finally {
      nProgress.done();
    }
  };

  const removePerson = async (person: number) => {
    nProgress.start();
    try {
      await axios
        .delete(`${APIBASE}/pessoa/${person}`, {
          headers: {
            Authorization: token,
          },
        })
        .then(() => {
          navigate("/dashboard");
          setAttState((state) => !state);

          toast({
            title: "O usuário foi deletado.",
            status: "success",
            duration: 6000,
            isClosable: true,
          });
        });
    } catch (error) {
      console.log(error);

      toast({
        title: "Houve algum erro.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } finally {
      nProgress.done();
    }
  };

  return (
    <PeopleContext.Provider
      value={{
        getPeople,
        addNewPerson,
        removePerson,
        peopleList,
        loading,
        attState,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};
