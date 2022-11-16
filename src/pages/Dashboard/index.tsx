import React, { useEffect, useContext } from "react";
import { PeopleContext } from "../../contexts/PeopleContext";

export const Dashboard = () => {
  const { getPeople, peopleList, loading } = useContext(PeopleContext);

  useEffect(() => {
    getPeople();
  }, []);

  useEffect(() => {
    console.log(peopleList);
  }, [peopleList]);

  return <div>Dashboard</div>;
};
