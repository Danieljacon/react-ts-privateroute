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

export const schemaPeople = yup
  .object({
    nome: yup
      .string()
      .required("O nome não pode ser vazio.")
      .min(3, "O nome deve ter no mínimo 3 caracteres"),
    dataNascimento: yup.string().required("A data precisa ser válida."),
    cpf: yup
      .string()
      .required("O CPF não pode ser vazio.")
      .min(11, "O CPF deve ter no mínimo 11 números"),
    email: yup
      .string()
      .email("O campo precisa ser um email válido")
      .required("O email não pode ser vazio."),
  })
  .required();

export const schemaAdress = yup.object().shape({
  tipo: yup.string().required("O tipo é obrigatório."),
  logradouro: yup
    .string()
    .min(3, "É necessário ter, no mínimo, 3 caracteres.")
    .required("O logradouro é obrigatório."),
  numero: yup.string().required("O número é obrigatório."),
  complemento: yup.string(),
  cep: yup
    .string()
    .min(8, "É necessário ter, no mínimo, 3 caracteres.")
    .required("O CEP é obrigatório."),
  cidade: yup
    .string()
    .min(2, "É necessário ter, no mínimo, 2 caracteres.")
    .required("A cidade é obrigatória."),
  estado: yup
    .string()
    .min(2, "É necessário ter, no mínimo, 2 caracteres.")
    .required("O estado é obrigatório."),
  pais: yup
    .string()
    .min(2, "É necessário ter, no mínimo, 2 caracteres.")
    .required("O país é obrigatório."),
});

export const schemaContact = yup
  .object({
    telefone: yup.string().required("O telefone precisa ser válido.")
    .matches(/^(?:(?:+|00)?(55)\s?)?(?:(?([1-9][0-9]))?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/,""),
    descricao: yup
      .string()
      .required("A descrição não pode ser vazia.")
      .min(3, "A descrição deve ter no mínimo 3 caracteres"),
  
  }).required();
