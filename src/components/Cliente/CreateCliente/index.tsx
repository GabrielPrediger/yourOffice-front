import { Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { usePicasso } from "../../../hooks/usePicasso";
import api from "../../../services/api";
import SidebarWithHeader from "../../Sidebar";

export default function CreateClienteComponent() {

    const theme = usePicasso();
    const { register, handleSubmit } = useForm();
    const { token } = useAuth()

    const onSubmitForm = (data: any) => {
        api
        .post("/create-cliente", { nome: data.nome, data_nascimento: data.data_nascimento, cpf_cnpj: data.cpf_cnpj, rg: data.rg, endereco: data.endereco}, 
        {headers: {
            Authorization: `Bearer ${token}`
         }})
        .then((response: any) => console.log(response))
        .catch((err: any) => {
        console.error("ops! ocorreu um erro" + err);
        });
    }

    return (
        <SidebarWithHeader>
            <Flex justifyContent="center" alignItems="center">
                <Flex flexDirection="column" gap="10" p="10">
                    <Link to="/clientes" style={{ width: "max-content" }}>
                        <Flex align="center" gap="2">
                            <Image as={FiArrowLeft} size={24} />
                            <Text w="max-content">Voltar</Text>
                        </Flex>
                    </Link>
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <Flex flexDirection="column" gap="2" pb="4">
                            <Text>Nome</Text>
                            <Input placeholder="Digite aqui um nome..." _placeholder={{ color: "#A0AEC0"}} w="25rem" h="max" py="2" size={"lg"} type="text" {...register("nome", { required: true })} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="4">
                            <Text>Data de nascimento</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="date" {...register("data_nascimento", { required: true })} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="4">
                            <Text>CPF/CNPJ</Text>
                            <Input placeholder="Digite aqui um cpf/cnpj..." _placeholder={{ color: "#A0AEC0"}} w="25rem" h="max" py="2" size={"lg"} {...register("cpf_cnpj", { required: true })} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="4">
                            <Text>RG</Text>
                            <Input placeholder="Digite aqui um rg..." _placeholder={{ color: "#A0AEC0"}} w="25rem" h="max" py="2" size={"lg"} {...register("rg", { required: true })} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="4">
                            <Text>Endereço</Text>
                            <Input placeholder="Digite aqui um endereço..." _placeholder={{ color: "#A0AEC0"}} w="25rem" h="max" py="2" size={"lg"} {...register("endereco", { required: true })} />
                        </Flex>
                        <Button bg={'#dfbda1'}
                            color={'white'}
                            type="submit"
                            _hover={{
                                bg: '#dfbda1',
                                opacity: 0.5
                            }}>Criar</Button>
                    </form>
                </Flex>
            </Flex>
        </SidebarWithHeader>
    )

}
