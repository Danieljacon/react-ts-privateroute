import React from "react";

export interface IAuthContext {
  createNewUser: (newUser: IUser) => Promise<void>;
  handleLogin: (user: IUser) => Promise<void>;
  handleLoggout: () => void;
  token: string;
}

export interface IPeopleContext {
  getPeople: (page?: string) => Promise<void>
  addNewPerson: (person: IPerson) => Promise<void>;
  removePerson: (person: number) => Promise<void>;
  editPerson: (idPessoa: number, person: IPerson) => Promise<void>;
  peopleList: IPeople | null;
  loading: boolean;
  attState: boolean;

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
