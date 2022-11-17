import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
import { IPerson } from "../../utils/interfaces";
import {
	Button,
	Center,
	Container,
	FormControl,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { PeopleContext } from "../../contexts/PeopleContext";

export const EditPerson = () => {
	const { state } = useLocation();
	const { editPerson } = useContext(PeopleContext);
	const { register, handleSubmit } = useForm<IPerson>({
		defaultValues: {
			nome: state.nome,
			email: state.email,
			cpf: state.cpf,
			dataNascimento: state.dataNascimento,
		},
	});

	const onSubmit = (data: IPerson) => {
		editPerson(data.cpf, data);
	};

	return (
		<Container>
			<Center
				minH={"100vh"}
				display="flex"
				flexDir="column"
				opacity="0"
				animation="slidein 1s ease-in-out forwards"
			>
				<FormControl
					onSubmit={handleSubmit(onSubmit)}
					as="form"
					p={10}
					borderRadius={20}
					shadow="lg"
				>
					<FormLabel htmlFor="nome">Nome</FormLabel>
					<Input
						borderColor="gray.300"
						type="text"
						{...register("nome")}
					/>
					<FormLabel htmlFor="email">Email</FormLabel>
					<Input
						borderColor="gray.300"
						type="email"
						{...register("email")}
					/>
					<FormLabel htmlFor="cpf">CPF</FormLabel>
					<Input
						borderColor="gray.300"
						type="text"
						{...register("cpf")}
					/>
					<FormLabel htmlFor="dataNascimento">
						Data de nascimento
					</FormLabel>
					<Input
						borderColor="gray.300"
						type="date"
						{...register("dataNascimento")}
					/>

					<Button
						w={"full"}
						colorScheme="messenger"
						mt={2}
						type="submit"
					>
						Editar
					</Button>
				</FormControl>
			</Center>
		</Container>
	);
};
