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

	export const schemaContact = yup
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