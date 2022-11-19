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
	const [contactList, setContactList] = useState<IContact | null>(null);
	const navigate = useNavigate();

	const addNeWContact = async (idPessoa: number, newContact: IContact) => {
		try {
			await axios
				.post(`${APIBASE}/contato/{idPessoa}`, newContact, {
					headers: {
						Authorization: token,
					},
				})
				.then(() => {
					// navigate("/add-contact");
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
				title: "Houve algum erro, contato não pode ser criado.",
				status: "error",
				duration: 6000,
				isClosable: true,
			});
		}
	};
	const getContactList = async (idPessoa: number) => {
		try {
			await axios
				.get(`${APIBASE}/contato/{idPessoa}`, {
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

	const editContactById = async (idPessoa: number, contact: IContact) => {
		//precisa pegar a pessoa com contato, tem q alterar a requisição no peoleContext
		try {
			await axios.put(`${APIBASE}/contato/{contact.id}`,{
				headers: {
					Authorization: token,
				},
			})
			.then (() => {
				toast({
					title: "Contato editado com sucesso.",
					status: "success",
					duration: 6000,
					isClosable: true,
				});
				// navigate(pagina da pessoa mostrando os contatos);
			})
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

	const removeContactById = async (idPessoa: number, contact: IContact) => {
		try {
			await axios.delete(`${APIBASE}/contato/{contact.id}`, {
				headers: {
					Authorization: token,
				},
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
			}}
		>
			{children}
		</ContactContext.Provider>
	);
};
