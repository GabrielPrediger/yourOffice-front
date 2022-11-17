import { Button, Flex, Image, Input,  Select,  Stack,  Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import api from "../../../services/api";
import SidebarWithHeader from "../../Sidebar";

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

    useEffect(() => {
        api
            .get(`/get-saida-id/${Number(id)}`)
            .then((response) => {setEditSaida(response.data); reset(response.data);})
            .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            });
    }, [id, reset]);


    const onEditForm = (data: any) => {
        console.log(data, 'data')
        api
            .put(`/update-saida/${Number(id)}`, data)
            .then((response) => console.log(response, 'Foi!'))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    return (
        <SidebarWithHeader>
            <Flex justifyContent="center" alignItems="center">
            <Flex flexDirection="column" gap="10" p="10">
                    <Link to="/listar-saidas" style={{ width: "max-content" }}>
                        <Flex align="center" gap="2">
                            <Image as={FiArrowLeft} size={24} />
                            <Text w="max-content">Voltar</Text>
                        </Flex>
                    </Link>
                    <form onSubmit={handleSubmit(onEditForm)}>
                        <Flex flexDirection="column" gap="2" py="2">
                            <Text>Valor</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="number" defaultValue={editSaida?.valor} {...register("valor")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" py="2">
                            <Text>Descrição</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="text" defaultValue={editSaida?.descricao} {...register("descricao")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" py="2">
                            <Text>Data</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="date" defaultValue={editSaida?.data} {...register("data")} />
                        </Flex>
                        <Button 
                            type="submit"
                            bg={'#dfbda1'}
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
