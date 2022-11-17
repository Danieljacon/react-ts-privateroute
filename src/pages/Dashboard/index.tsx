import React, { useEffect, useContext } from "react";
import { PeopleContext } from "../../contexts/PeopleContext";
import { IPerson } from "../../utils/interfaces";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const { getPeople, peopleList, loading } = useContext(PeopleContext);

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <>
      <Link to="/dashboard/new-person">Adicionar nova pessoa</Link>
      <div>
        {loading ? (
          <h1>Carregando...</h1>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>CPF</th>
                <th>Data de Nascimento</th>
              </tr>
            </thead>
            <tbody>
              {peopleList?.content.map((person: IPerson) => (
                <tr key={person.idPessoa}>
                  <td>{person.nome}</td>
                  <td>{person.email}</td>
                  <td>{person.cpf}</td>
                  <td>{person.dataNascimento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
