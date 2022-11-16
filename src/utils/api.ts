import axios from "axios";
export const APIBASE: string =
  "http://vemser-dbc.dbccompany.com.br:39000/vemser/dbc-pessoa-api";

export const api = axios.create({
  baseURL: APIBASE,
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});
