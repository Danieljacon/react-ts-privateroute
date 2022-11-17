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

import nProgress from "nprogress";
import axios from "axios";

export const PeopleContext = createContext({} as IPeopleContext);
export const PeopleProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();
  const [peopleList, setPeopleList] = useState<IPeople | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useContext(AuthContext);

  const getPeople = async () => {
    setLoading(true);
    try {
      await axios
        .get(`${APIBASE}/pessoa?pagina=0&tamanhoDasPaginas=20`, {
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
        .then(() => navigate("/dashboard"));
    } catch (error) {
      console.log(error);
    } finally {
      nProgress.done();
    }
  };

  return (
    <PeopleContext.Provider
      value={{ getPeople, addNewPerson, peopleList, loading }}
    >
      {children}
    </PeopleContext.Provider>
  );
};
