import React, { createContext, useContext, useState } from "react";
import { APIBASE } from "../utils/api";
import { IContactContext, IChildren, IContact } from "../utils/interfaces";
import { useNavigate } from "react-router-dom";
import nProgress from "nprogress";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { AuthContext } from "./AuthContext";

export const ContactContext = createContext({} as IContactContext);

export const ContactProvider = ({ children }: IChildren) => {
	const { token } = useContext(AuthContext);
	const toast = useToast();
	const [contactList, setContactList] = useState<IContact[]>([]);
	const [attStateContact, setAttState] = useState<boolean>(false);
	const navigate = useNavigate();

	const addNeWContact = async (idPerson: number, newContact: IContact) => {
		try {
			await axios
				.post(`${APIBASE}/contato/${idPerson}?idPessoa=${idPerson}`, newContact, {
					headers: {
						Authorization: token,
					},
				})
				.then(() => {
					navigate(-1);
					

					toast({
						title: "Contato adicionado com sucesso",
						status: "success",
						duration: 6000,
						isClosable: true,
					});
				});
		} catch (error) {
			console.log(error);

			toast({
				title: "Houve algum erro, contato não pode ser adiconado.",
				status: "error",
				duration: 6000,
				isClosable: true,
			});
		}
	};
	const getContactList = async (idPessoa: number) => {
		try {
			await axios
				.get(`${APIBASE}/contato/${idPessoa}`, {
					headers: {
						Authorization: token,
					},
				})
				.then((response) => setContactList(response.data));
		} catch (error) {
			console.log(error);
		} finally {
			nProgress.done();
		}
	};

	const editContactById = async (idContact: number, contact: IContact) => {
		
		try {
			await axios
				.put(`${APIBASE}/contato/${idContact}`, contact, {
					headers: {
						Authorization: token,
					},
				})
				.then(() => {
					navigate(-1);
					toast({
						title: "Contato editado com sucesso.",
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
		}
	};

	const removeContactById = async (idContact: number) => {
		try {
			await axios
				.delete(`${APIBASE}/contato/${idContact}`, {
					headers: {
						Authorization: token,
					},
				})
				.then(() => {
					setAttState((state) => !state);

					toast({
						title: "O contato foi deletado.",
						status: "success",
						duration: 6000,
						isClosable: true,
					  });
				});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<ContactContext.Provider
			value={{
				addNeWContact,
				getContactList,
				editContactById,
				removeContactById,
				contactList,
				attStateContact
			}}
		>
			{children}
		</ContactContext.Provider>
	);
};
