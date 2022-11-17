import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { PeopleContext } from "../../contexts/PeopleContext";
import { IPerson } from "../../utils/interfaces";

export const AddNewPerson = () => {
  const { addNewPerson } = useContext(PeopleContext);
  const { register, handleSubmit } = useForm<IPerson>();
  const onSubmit = (data: IPerson) => {
    addNewPerson(data);
  };
  return (
    <div>
      <form className="flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="nome">Nome</label>
        <input type="text" {...register("nome")} />
        <label htmlFor="cpf">CPF</label>
        <input type="text" {...register("cpf")} />
        <label htmlFor="email">Email</label>
        <input type="text" {...register("email")} />
        <label htmlFor="data">Data</label>
        <input type="date" {...register("dataNascimento")} />
        <input type="submit" value="Adicionar" />
      </form>
    </div>
  );
};
