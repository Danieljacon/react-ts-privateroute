import React, { createContext, useContext, useState } from "react";
import { APIBASE } from "../utils/api";
import { IAdressContext, IChildren, IPersonAdress } from "../utils/interfaces";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import nProgress from "nprogress";

export const AdressContext = createContext({} as IAdressContext);
export const AdressProvider = ({ children }: IChildren) => {
  const { token } = useContext(AuthContext);
  const [adressList, setAdressList] = useState<IPersonAdress[]>([]);
  const navigate = useNavigate();
  const toast = useToast();

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

  const getAdressByAdress = async (idAdress: number, adress: IPersonAdress) => {
    nProgress.start();
    try {
      axios
        .put(`${APIBASE}/endereco${idAdress}`, adress, {
          headers: {
            Authorization: token,
          },
        })
        .then(() => {
          navigate("/details");

          toast({
            title: "O usuário foi editado.",
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
    <AdressContext.Provider value={{ getAdressByIdPessoa, getAdressByAdress, adressList }}>
      {children}
    </AdressContext.Provider>
  );
};
