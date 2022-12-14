import { Button, Flex, Image, Input,  Select,  Stack,  Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { usePicasso } from "../../../hooks/usePicasso";
import api from "../../../services/api";
import { formatDate } from "../../../utils/formatDate";
import SidebarWithHeader from "../../Sidebar";
import { useToasty } from "../../Tooltip";

interface ISaidas {
    valor: number;
    data: string;
    descricao: string;
}

export default function EditarSaidaComponent() {

    const theme = usePicasso();

    const [editSaida, setEditSaida] = useState<ISaidas>();
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm({defaultValues: editSaida});
    const { toast } = useToasty();
    const { token } = useAuth()

    useEffect(() => {
        api
            .get(`/get-saida-id/${Number(id)}`, {headers: {
                Authorization: `Bearer ${token}`
             }})
            .then((response) => {setEditSaida(response.data); reset(response.data);})
            .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            });
    }, [id, reset, token]);


    const onEditForm = (data: any) => {
        console.log(data, 'data')
        api
            .put(`/update-saida/${Number(id)}`, data, {headers: {
                Authorization: `Bearer ${token}`
             }})
             .then((response) => {console.log(response, 'Foi!'); setToast()})
             .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    const setToast = () => {
        toast({
            id: "toastEditSaida",
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
                    <Link to="/listar-saidas" style={{ width: "max-content" }}>
                        <Flex align="center" gap="2" transition="0.5s" _hover={{ opacity: 0.4 }}>
                            <Image as={FiArrowLeft} size={24} />
                            <Text w="max-content">Voltar</Text>
                        </Flex>
                    </Link>
                    <form onSubmit={handleSubmit(onEditForm)}>
                        <Flex flexDirection="column" gap="2" py="2">
                            <Text>Valor</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} defaultValue={editSaida?.valor} {...register("valor")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" py="2">
                            <Text>Descrição</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="text" defaultValue={editSaida?.descricao} {...register("descricao")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" py="2">
                            <Flex gap="2">
                                <Text>Data</Text>
                                <Text fontSize={"md"} fontWeight={500}>{formatDate(editSaida?.data)}</Text>
                            </Flex>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="date" defaultValue={editSaida?.data} {...register("data")} />
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
