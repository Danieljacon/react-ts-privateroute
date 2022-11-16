import React from "react";

export interface IAuthContext {
  createNewUser: (newUser: IUser) => Promise<void>;
  handleLogin: (user: IUser) => Promise<void>;
  handleLoggout: () => void;
  token: string;
}

export interface IPeopleContext {
  getPeople: () => Promise<void>;
  peopleList: IPeople[];
  loading: boolean;
}

export interface IChildren {
  children: React.ReactNode;
}

export interface IUser {
  login: string;
  senha: string;
}

export interface IPeople {
  nome: string;
  dataNascimento: string;
  cpf: string;
  email: string;
}
