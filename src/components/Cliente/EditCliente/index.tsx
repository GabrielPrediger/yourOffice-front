import { useEffect, useState } from "react";
import { Button, Flex, Image, Input,  Text } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import SidebarWithHeader from "../../Sidebar";
import { Controller, useForm } from "react-hook-form";
import api from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";
import { useToasty } from "../../Tooltip";
import InputMask from "react-input-mask";
import { formatDate } from "../../../utils/formatDate";

interface IUser {
    id: number;
    nome: string;
    data_nascimento: string;
    cpf_cnpj: string;
    rg: string;
    endereco: string;
}

export default function EditarClienteComponent() {

    const theme = usePicasso();
    const { token } = useAuth()
    const { toast } = useToasty();
    const [editCliente, setEditCliente] = useState<IUser>();
    const { id } = useParams();
    const { register, handleSubmit, reset, control } = useForm({defaultValues: editCliente });

    useEffect(() => {
        api
            .get(`/cliente/${Number(id)}`, {headers: {
                Authorization: `Bearer ${token}`
             }})
            .then((response) => {setEditCliente(response.data); reset(response.data);})
            .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            });
    }, [id, reset, token]);

    const onEditForm = (data: any) => {
        api
            .put(`/update-cliente/${Number(id)}`, data, {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response) => {console.log(response, 'Foi!'); setToast()})
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
        });
    }

    const setToast = () => {
        toast({
            id: "toastEditCliente",
            position: "top-right",
            status: "success",
            title: "Dados editados!",
            description: "As informações foram alteradas com sucesso!",
        });
}

    return (
        <SidebarWithHeader>
            <Flex justifyContent="center" alignItems="center">
                <Flex flexDirection="column" gap="10" p="10">
                    <Link to="/listar-cliente" style={{ width: "max-content" }}>
                        <Flex align="center" gap="2" transition="0.5s" _hover={{ opacity: 0.4 }}>
                            <Image as={FiArrowLeft} size={24} />
                            <Text w="max-content">Voltar</Text>
                        </Flex>
                    </Link>
                    <form onSubmit={handleSubmit(onEditForm)}>
                        <Flex flexDirection="column" gap="2" pb="4">
                            <Text>Nome</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} defaultValue={editCliente?.nome} {...register("nome")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="4">
                            <Flex gap="2">
                                    <Text>Data de nascimento</Text>
                                    <Text fontSize={"md"} fontWeight={500}>{formatDate(String(editCliente?.data_nascimento))}</Text>
                                </Flex>  
                            <Input w="25rem" h="max" py="2" size={"lg"} type="date" defaultValue={editCliente?.data_nascimento} {...register("data_nascimento")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="4">
                            <Text>CPF</Text>
                            <Controller
                                control={control}    
                                name="cpf_cnpj"
                                render={({ onChange, value }: any) => (
                                    <InputMask mask="999.999.999-99" defaultValue={editCliente?.cpf_cnpj}  {...register("cpf_cnpj")} style={{ fontSize:"1.15rem", padding: '0.7rem 1rem', border: '1px solid', borderRadius: "6px", borderColor: theme.border.inputDefault}}>
    
                                    </InputMask>
                                )}                       
                            />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="4">
                            <Text>RG</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} defaultValue={editCliente?.rg} {...register("rg")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="4">
                            <Text>Endereço</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} defaultValue={editCliente?.endereco} {...register("endereco")} />
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
                            Salvar
                        </Button>
                    </form>
                </Flex>
            </Flex>
        </SidebarWithHeader>
    )

}
