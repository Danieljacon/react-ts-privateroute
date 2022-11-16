import React from "react";

export interface IUser {
  login: string;
  senha: string;
}

export interface IAuthContext {
  createNewUser: (newUser: IUser) => Promise<void>;
}

export interface IChildren {
  children: React.ReactNode;
}

export interface IPeople {
  nome: string;
  dataNascimento: string;
  cpf: string;
  email: string;
}
