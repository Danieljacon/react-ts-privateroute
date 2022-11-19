import React, { useContext, useEffect } from "react";
import { AdressContext } from "../../contexts/AdressContext";
import { useLocation } from "react-router-dom";

export const Details = () => {
  const { state } = useLocation();
  const { adressList, getAdressByIdPessoa } = useContext(AdressContext);

  useEffect(() => {
    getAdressByIdPessoa(state.idPessoa);
  }, []);

  useEffect(() => {
    console.log(adressList);
  }, [adressList]);
  return <div></div>;
};
