import { Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { usePicasso } from "../../../hooks/usePicasso";
import api from "../../../services/api";
import SidebarWithHeader from "../../Sidebar";
import { useToasty } from "../../Tooltip";
import { useCallback } from 'react'

export default function CreateClienteComponent() {

    const theme = usePicasso();
    const { toast } = useToasty();
    const { register, handleSubmit } = useForm();
    const { token } = useAuth()

    const onSubmitForm = (data: any) => {
        api
        .post("/create-cliente", { nome: data.nome, data_nascimento: data.data_nascimento, cpf_cnpj: data.cpf_cnpj, rg: data.rg, endereco: data.endereco}, {headers: {
            Authorization: `Bearer ${token}`
         }})
        .then((response: any) => {console.log(response); setToast(response.status);})
        .catch((err: any) => {
        console.error("ops! ocorreu um erro" + setToast(err));
        });
    }

    const setToast = useCallback((status: any) => {
        if(status === 201){
            toast({
                id: "toastCreateSuccess",
                position: "top-right",
                status: "success",
                title: "Cliente criado!",
                description: "Vá para a lista de clientes para visualizar!",
            });
        } else if(status.response.status === 400 || 500){
            toast({
                id: "toastCreateError",
                position: "top-right",
                status: "error",
                title: status.response.status === 500 ? "Insira dados nos campos" : "Dados ja existentes!",
                description: status.response.status === 500 ? "Insira dados nos campos" : status.response.data.message,
            });
        }     
    }, [toast])

    return (
        <SidebarWithHeader>
            <Flex justifyContent="center" alignItems="center">
                <Flex flexDirection="column" gap="10" p="10">
                    <Link to="/clientes" style={{ width: "max-content" }}>
                        <Flex align="center" gap="2" transition="0.5s" _hover={{ opacity: 0.4 }}>
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
                        <Button 
                            type="submit"
                            bgColor={theme.background.criarButton}
                            color={'white'}
                            transition="0.5s"
                            _hover={{
                                opacity: 0.7,
                            }}
                        >
                            Criar
                        </Button>
                    </form>
                </Flex>
            </Flex>
        </SidebarWithHeader>
    )

}
