import * as yup from "yup";

export const schemaAccount = yup
  .object({
    login: yup
      .string()
      .required("O login não pode ser vazio.")
      .min(2, "O login deve ter no mínimo 2 caracteres"),
    senha: yup
      .string()
      .required("A senha não pode ser vazia.")
      .min(3, "A senha deve ter no mínimo 3 caracteres"),
  })
  .required();
