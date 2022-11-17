import React, { createContext, useState } from "react";
import { IChildren, IPeopleContext, IPeople, IPerson } from "../utils/interfaces";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";

import nProgress from "nprogress";

export const PeopleContext = createContext({} as IPeopleContext);
export const PeopleProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();
  const [peopleList, setPeopleList] = useState<IPeople | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getPeople = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/pessoa?pagina=0&tamanhoDasPaginas=20");
      setPeopleList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addNewPerson = async (person: IPerson) => {
    nProgress.start();
    try {
      await api.post("/pessoa", person);
      navigate("/dashboard");
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
