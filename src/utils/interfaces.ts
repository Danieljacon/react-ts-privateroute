import React from "react";

export interface IAuthContext {
	createNewUser: (newUser: IUser) => Promise<void>;
	handleLogin: (user: IUser) => Promise<void>;
	handleLoggout: () => void;
	token: string;
}

export interface IPeopleContext {
<<<<<<< HEAD
  getPeople: (page?: string) => Promise<void>;
  addNewPerson: (person: IPerson) => Promise<void>;
  removePerson: (person: number) => Promise<void>;
  editPerson: (idPessoa: number, person: IPerson) => Promise<void>;
  peopleList: IPeople | null;
  loading: boolean;
  attState: boolean;
  totalPages: number;
}

export interface IAdressContext {
  getAdressByIdPessoa: (idPessoa: number) => Promise<void>;
  editAdressByEndereco: (
    idAdress: number,
    adress: IPersonAdress
  ) => Promise<void>;
  deleteAdressByIdEndereco: (idAdress: number) => Promise<void>;
  addAdressByIdPessoa: (
    idPerson: number,
    adress: IPersonAdress
  ) => Promise<void>;
  attState: boolean;
  adressList: IPersonAdress[];
=======
	getPeople: (page?: string) => Promise<void>;
	addNewPerson: (person: IPerson) => Promise<void>;
	removePerson: (person: number) => Promise<void>;
	editPerson: (idPessoa: number, person: IPerson) => Promise<void>;
	peopleList: IPeople | null;
	loading: boolean;
	attState: boolean;
}

export interface IContactContext {
	addNeWContact: (idPessoa: number, newContact: IContact) => Promise<void>;
	getContactList: (idPessoa: number) => Promise<void>;
	editContactById: (idPessoa: number, contact: IContact) => Promise<void>;
	removeContactById: (idPessoa: number, contact: IContact) => Promise<void>,
	contactList: IContact | null
>>>>>>> origin/gicelly
}

export interface IChildren {
	children: React.ReactNode;
}

export interface IUser {
	login: string;
	senha: string;
}

export interface IPerson {
	nome: string;
	dataNascimento: string;
	cpf: string;
	email: string;
	idPessoa: number;
}

export interface IPeople {
	page: number;
	size: number;
	totalElements: number;
	totalPages: number;
	content: [IPerson];
}

export interface IContact {
	idPessoa: number;
	tipoContato: string;
	telefone: string;
	descricao: string;
}

export interface IPersonAdress {
  idEndereco: number;
  tipo: "RESIDENCIAL" | "COMERCIAL";
  logradouro?: string;
  numero: number;
  complemento: string;
  cep: number;
  estado: string;
  pais: string;
  idPessoa: number;
  cidade: string;
}
