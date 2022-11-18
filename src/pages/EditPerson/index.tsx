import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { IPerson } from "../../utils/interfaces";
import {
	Alert,
	AlertIcon,
	AlertTitle,
	Button,
	Center,
	Container,
	FormControl,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { PeopleContext } from "../../contexts/PeopleContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaPeople } from "../../utils/schemas";

export const EditPerson = () => {
	const { state } = useLocation();
	const { editPerson } = useContext(PeopleContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IPerson>({
		defaultValues: {
			nome: state.nome,
			email: state.email,
			cpf: state.cpf,
			dataNascimento: state.dataNascimento,
		},

		resolver: yupResolver(schemaPeople),
	});

	const onSubmit = (data: IPerson) => {
		editPerson(state.idPessoa, data);
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
					{errors.nome && (
						<Alert status="error" borderRadius={8} mt={1}>
							<AlertIcon />
							<AlertTitle>{errors.nome.message}</AlertTitle>
						</Alert>
					)}

					<FormLabel htmlFor="email">Email</FormLabel>
					<Input
						borderColor="gray.300"
						type="email"
						{...register("email")}
					/>
					{errors.email && (
						<Alert status="error" borderRadius={8} mt={1}>
							<AlertIcon />
							<AlertTitle>{errors.email.message}</AlertTitle>
						</Alert>
					)}

					<FormLabel htmlFor="cpf">CPF</FormLabel>
					<Input
						borderColor="gray.300"
						type="text"
						disabled
						{...register("cpf")}
					/>
					<Input type="text" {...register("cpf")} />
					
					<FormLabel htmlFor="dataNascimento">
						Data de nascimento
					</FormLabel>
					<Input
						borderColor="gray.300"
						type="date"
						{...register("dataNascimento")}
					/>
					{errors.dataNascimento && (
						<Alert status="error" borderRadius={8} mt={1}>
							<AlertIcon />
							<AlertTitle>
								{errors.dataNascimento.message}
							</AlertTitle>
						</Alert>
					)}

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
