import { useEffect, useState } from "react";
import { Button, Flex, Image, Input,  Text } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import SidebarWithHeader from "../../Sidebar";
import { useForm } from "react-hook-form";
import api from "../../../services/api";
import { useToasty } from "../../Toast";

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

    const [editCliente, setEditCliente] = useState<IUser>();
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm({defaultValues: editCliente });
    const { toast } = useToasty();

    useEffect(() => {
        api
            .get(`/cliente/${Number(id)}`)
            .then((response) => {setEditCliente(response.data); reset(response.data);})
            .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            });
    }, [id, reset]);

    const onEditForm = (data: any) => {
        api
            .put(`/update-cliente/${Number(id)}`, data)
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
                        <Flex align="center" gap="2">
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
                            <Text>Data de nascimento</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="date" defaultValue={editCliente?.data_nascimento} {...register("data_nascimento")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="4">
                            <Text>CPF/CNPJ</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} defaultValue={editCliente?.cpf_cnpj} {...register("cpf_cnpj")} />
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
                            bg={'#dfbda1'}
                            type="submit"
                            color={'white'}
                            _hover={{
                                bg: '#dfbda1',
                                opacity: 0.5
                            }}>
                                Salvar
                        </Button>
                    </form>
                </Flex>
            </Flex>
        </SidebarWithHeader>
    )

}
