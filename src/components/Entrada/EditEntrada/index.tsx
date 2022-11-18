import { Button, Flex, Image, Input,  Select,  Stack,  Text } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import SidebarWithHeader from "../../Sidebar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../../services/api";

interface IEntrada {
    id?: any;
    tipoVenda: string;
    data: string;
    descricao?: string;
    valor: number;
    clienteId: any;
    produtoId: any;
}

export default function EditarEntradaComponent() {

    const theme = usePicasso();

    const [editEntrada, setEditEntrada] = useState<IEntrada>();
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm({defaultValues: editEntrada});

    useEffect(() => {
        api
            .get(`/get-user-id/${Number(id)}`)
            .then((response) => {setEditEntrada(response.data); reset(response.data)})
            .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            });
    }, [id, reset]);


    const onEditForm = (data: any) => {
        api
            .put(`/update-entrada/${Number(id)}`, data)
            .then((response) => console.log(response, 'Foi!'))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    return (
        <SidebarWithHeader>
            <Flex justifyContent="center" alignItems="center">
            <Flex flexDirection="column" gap="10" p="10">
                    <Link to="/listar-entradas" style={{ width: "max-content" }}>
                        <Flex align="center" gap="2">
                            <Image as={FiArrowLeft} size={24} />
                            <Text w="max-content">Voltar</Text>
                        </Flex>
                    </Link>
                    <form onSubmit={handleSubmit(onEditForm)}>
                        <Flex flexDirection="column" gap="2">
                            <Text>Valor</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="number" defaultValue={editEntrada?.valor} {...register("valor")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2">
                            <Text>Data</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="date" defaultValue={editEntrada?.data} {...register("data")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2">
                            <Text>Cliente</Text>
                            <Stack spacing={3}>
                                <Select variant='outline' placeholder='Escolha uma opção...'>
                                    <option value='option1'>Gab</option>
                                    <option value='option1'>Luc</option>
                                </Select>
                            </Stack>
                        </Flex>
                        <Flex flexDirection="column" gap="2">
                            <Text>Produto</Text>
                            <Stack spacing={3}>
                                <Select variant='outline' placeholder='Escolha uma opção...'>
                                    <option value='option1'>Cadeira</option>
                                    <option value='option1'>Mesa verde de marmore italiani</option>
                                </Select>
                            </Stack>
                        </Flex>
                        <Flex flexDirection="column" gap="2">
                            <Text>Tipo</Text>
                            <Stack spacing={3}>
                                <Select variant='outline' placeholder='Escolha uma opção...'>
                                    <option value='option1'>Aluguel</option>
                                    <option value='option1'>Venda</option>
                                </Select>
                            </Stack>
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
