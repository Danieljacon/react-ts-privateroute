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
import { AdressContext } from "../../contexts/AdressContext";
import { IPersonAdress } from "../../utils/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaAdress } from "../../utils/schemas";
import InputMask from "react-input-mask";

export const EditAdress = () => {
  const { state } = useLocation();
  const { editAdressByEndereco } = useContext(AdressContext);
  const VIACEP = "https://viacep.com.br/ws/";

  const getAdressByCep = async (cep: string) => {
    const response = await fetch(`${VIACEP}${cep}/json/`);
    const data = await response.json();
    return data;
  };

  const getValuesByCep = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = await getAdressByCep(e.target.value);
    setValue("logradouro", data.logradouro);
    setValue("cidade", data.localidade);
    setValue("estado", data.uf);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IPersonAdress>({
    defaultValues: {
      cep: state.cep,
      cidade: state.cidade,
      logradouro: state.logradouro,
      numero: state.numero,
      complemento: state.complemento,
      estado: state.estado,
      pais: state.pais,
      tipo: state.tipo,
    },
    resolver: yupResolver(schemaAdress),
  });

  const onSubmit = (data: IPersonAdress) => {
    data.numero = Number(data.numero);
    let cpf = data.cep.toString().replace(/\D/g, "");
    data.cep = Number(cpf);

    editAdressByEndereco(state.idEndereco, {
      ...data,
      idPessoa: state.idPessoa,
    });
  };

  return (
    <Container>
      <Center
        minH={"100vh"}
        display="grid"
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
          display="grid"
          gridGap={5}
          gridTemplateColumns="repeat(2, 1fr)"
        >
          <div>
            <FormLabel>CEP</FormLabel>
            <Input
              as={InputMask}
              mask="99999-999"
              type="text"
              {...register("cep")}
              min="0"
              onBlur={getValuesByCep}
            />
            {errors.cep && (
              <Alert status="error" borderRadius={8} mt={1}>
                <AlertIcon />
                <AlertTitle>{errors.cep.message}</AlertTitle>
              </Alert>
            )}
          </div>

          <div>
            <FormLabel>Cidade</FormLabel>
            <Input type="text" {...register("cidade")} />
            {errors.cidade && (
              <Alert status="error" borderRadius={8} mt={1}>
                <AlertIcon />
                <AlertTitle>{errors.cidade.message}</AlertTitle>
              </Alert>
            )}
          </div>

          <div>
            <FormLabel>Logradouro</FormLabel>
            <Input type="text" {...register("logradouro")} />
            {errors.logradouro && (
              <Alert status="error" borderRadius={8} mt={1}>
                <AlertIcon />
                <AlertTitle>{errors.logradouro.message}</AlertTitle>
              </Alert>
            )}
          </div>

          <div>
            <FormLabel>N??mero</FormLabel>
            <Input type="number" {...register("numero")} min="0" />
            {errors.numero && (
              <Alert status="error" borderRadius={8} mt={1}>
                <AlertIcon />
                <AlertTitle>{errors.numero.message}</AlertTitle>
              </Alert>
            )}
          </div>

          <div>
            <FormLabel>Complemento</FormLabel>
            <Input type="text" {...register("complemento")} />
            {errors.complemento && (
              <Alert status="error" borderRadius={8} mt={1}>
                <AlertIcon />
                <AlertTitle>{errors.complemento.message}</AlertTitle>
              </Alert>
            )}
          </div>

          <div>
            <FormLabel>Estado</FormLabel>
            <Select {...register("estado")}>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amap??</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Cear??</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Esp??rito Santo</option>
              <option value="GO">Goi??s</option>
              <option value="MA">Maranh??o</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Par??</option>
              <option value="PB">Para??ba</option>
              <option value="PR">Paran??</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piau??</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rond??nia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">S??o Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </Select>
            {errors.estado && (
              <Alert status="error" borderRadius={8} mt={1}>
                <AlertIcon />
                <AlertTitle>{errors.estado.message}</AlertTitle>
              </Alert>
            )}
          </div>

          <div>
            <FormLabel>Pa??s</FormLabel>
            <Input type="text" {...register("pais")} />
            {errors.pais && (
              <Alert status="error" borderRadius={8} mt={1}>
                <AlertIcon />
                <AlertTitle>{errors.pais.message}</AlertTitle>
              </Alert>
            )}
          </div>

          <div>
            <FormLabel>Tipo</FormLabel>
            <Select {...register("tipo")}>
              <option value="RESIDENCIAL">Residencial</option>
              <option value="COMERCIAL">Comercial</option>
            </Select>
            {errors.tipo && (
              <Alert status="error" borderRadius={8} mt={1}>
                <AlertIcon />
                <AlertTitle>{errors.tipo.message}</AlertTitle>
              </Alert>
            )}
          </div>

          <Button
            type="submit"
            w={"full"}
            colorScheme="messenger"
            mt={2}
            gridColumn="span 2"
          >
            Editar
          </Button>
        </FormControl>
      </Center>
    </Container>
  );
};
