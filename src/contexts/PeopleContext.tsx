import React, { createContext, useContext, useState } from "react";
import { IChildren, IPeople, IPeopleContext } from "../utils/interfaces";
import { api } from "../utils/api";
import { AuthContext } from "./AuthContext";

export const PeopleContext = createContext({} as IPeopleContext);
export const PeopleProvider = ({ children }: IChildren) => {
  const { token } = useContext(AuthContext);
  const [peopleList, setPeopleList] = useState<IPeople[]>([]);
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

  return (
    <PeopleContext.Provider value={{ getPeople, peopleList, loading }}>
      {children}
    </PeopleContext.Provider>
  );
};
