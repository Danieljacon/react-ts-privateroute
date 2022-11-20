import React, { useContext } from "react";
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
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { IContact } from "../../utils/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaContact } from "../../utils/schemas";
import InputMask from "react-input-mask";
import { ContactContext } from "../../contexts/ContactContext";

export const EditContact = () => {
  const { state } = useLocation();
  const { editContactById } = useContext(ContactContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContact>({
    defaultValues: {
      tipoContato: state.tipoContato,
      telefone: state.telefone,
      descricao: state.descricao,
    },
    resolver: yupResolver(schemaContact),
  });

  const onSubmit = (data: IContact) => {
    editContactById(state.idContato, {
        ...data,
        idPessoa: state.idPessoa,
    });
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
          Editar
        </Button>
      </FormControl>
    </Center>
  </Container>
  );
};
