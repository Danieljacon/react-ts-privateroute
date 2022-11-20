import { yupResolver } from "@hookform/resolvers/yup";
import {
	Container,
	Center,
	FormControl,
	FormLabel,
	Input,
	Alert,
	AlertIcon,
	AlertTitle,
	Button,
	Select,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ContactContext } from "../../contexts/ContactContext";
import { IContact } from "../../utils/interfaces";
import { schemaContact } from "../../utils/schemas";
import { useLocation } from "react-router-dom";
import InputMask from "react-input-mask";

export const NewContact = () => {
	const { state } = useLocation();
	const { addNeWContact } = useContext(ContactContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IContact>({
		resolver: yupResolver(schemaContact),
	});
	const onSubmit = (data: IContact) => {
		addNeWContact(state.idPessoa, {
			...data,

			idPessoa: state.idPessoa,
		});
		console.log(data);
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
					as="form"
					onSubmit={handleSubmit(onSubmit)}
					p={10}
					borderRadius={20}
					shadow="lg"
					display="flex"
					flexDir="column"
				>
					<div>
						<FormLabel>Tipo</FormLabel>
						<Select {...register("tipoContato")}>
							<option value="RESIDENCIAL">Residencial</option>
							<option value="COMERCIAL">Comercial</option>
						</Select>
					</div>
					<div>
						<FormLabel>Descrição</FormLabel>
						<Input type="text" {...register("descricao")} min="0" />
						{errors.descricao && (
							<Alert status="error" borderRadius={8} mt={1}>
								<AlertIcon />
								<AlertTitle>
									{errors.descricao.message}
								</AlertTitle>
							</Alert>
						)}
					</div>

					<div>
						<FormLabel>Telefone</FormLabel>
						<Input
							as={InputMask}
							mask="(99)99999-9999"
							type="text"
							{...register("telefone")}
						/>
						{errors.telefone && (
							<Alert status="error" borderRadius={8} mt={1}>
								<AlertIcon />
								<AlertTitle>
									{errors.telefone.message}
								</AlertTitle>
							</Alert>
						)}
					</div>

					<div>
						{errors.tipoContato && (
							<Alert status="error" borderRadius={8} mt={1}>
								<AlertIcon />
								<AlertTitle>
									{errors.tipoContato.message}
								</AlertTitle>
							</Alert>
						)}
					</div>

					<Button
						type="submit"
						w={"full"}
						colorScheme="messenger"
						mt={2}
					>
						Adicionar
					</Button>
				</FormControl>
			</Center>
		</Container>
	);
};
