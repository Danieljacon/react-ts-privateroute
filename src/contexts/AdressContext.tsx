import React, { createContext, useContext, useState } from "react";
import { APIBASE } from "../utils/api";
import { IAdressContext, IChildren, IPersonAdress } from "../utils/interfaces";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import nProgress from "nprogress";

export const AdressContext = createContext({} as IAdressContext);
export const AdressProvider = ({ children }: IChildren) => {
  const { token } = useContext(AuthContext);
  const [adressList, setAdressList] = useState<IPersonAdress[]>([]);
  const [attState, setAttState] = useState<boolean>(false);
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

  const editAdressByEndereco = async (
    idAdress: number,
    adress: IPersonAdress
  ) => {
    nProgress.start();
    try {
      axios
        .put(`${APIBASE}/endereco/${idAdress}`, adress, {
          headers: {
            Authorization: token,
          },
        })
        .then(() => {
          navigate(-1);

          toast({
            title: "O endereço foi editado.",
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

  const deleteAdressByIdEndereco = async (idAdress: number) => {
    nProgress.start();
    try {
      await axios
        .delete(`${APIBASE}/endereco/${idAdress}`, {
          headers: {
            Authorization: token,
          },
        })
        .then(() => {
          setAttState((state) => !state);

          toast({
            title: "O endereço foi deletado.",
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

  const addAdressByIdPessoa = async (
    idPerson: number,
    adress: IPersonAdress
  ) => {
    nProgress.start();
    try {
      await axios
        .post(`${APIBASE}/endereco/${idPerson}?idPessoa=${idPerson}`, adress, {
          headers: {
            Authorization: token,
          },
        })
        .then(() => {
          navigate(-1);

          toast({
            title: "Um novo endereço foi adicionado.",
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
    <AdressContext.Provider
      value={{
        getAdressByIdPessoa,
        editAdressByEndereco,
        deleteAdressByIdEndereco,
        addAdressByIdPessoa,
        adressList,
        attState
      }}
    >
      {children}
    </AdressContext.Provider>
  );
};
