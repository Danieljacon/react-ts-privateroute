import React, { createContext, useContext, useState } from "react";
import { APIBASE } from "../utils/api";
import { IAdressContext, IChildren, IPersonAdress } from "../utils/interfaces";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const AdressContext = createContext({} as IAdressContext);
export const AdressProvider = ({ children }: IChildren) => {
  const { token } = useContext(AuthContext);
  const [adressList, setAdressList] = useState<IPersonAdress[]>([]);

  const getAdressByIdPessoa = async (idPessoa: number) => {
    try {
      await axios
        .get(`${APIBASE}/endereco/retorna-por-id-pessoa?idPessoa=${idPessoa}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setAdressList(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AdressContext.Provider value={{ getAdressByIdPessoa, adressList }}>
      {children}
    </AdressContext.Provider>
  );
};
