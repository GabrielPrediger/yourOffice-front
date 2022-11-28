import { useEffect, useState } from "react";
import { Button, Flex, Image, Input,  Select,  Stack,  Text } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import SidebarWithHeader from "../../Sidebar";
import { useForm } from "react-hook-form";
import api from "../../../services/api";

interface IProduct {
    id?: number;
    nome: string;
    descricao: string;
    quantidade: number;
    tipo: string; //alugar ou vender
    foto: string;
    preco: number;
}

const select_options = [{id: 1, value: 'Aluguel'}, {id: 2, value: 'Venda'}]


export default function EditarProdutoComponent() {

    const theme = usePicasso();

    const [editProduto, setEditProduto] = useState<IProduct>();
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm({defaultValues: editProduto });

    function convertImageToBase64(file: File) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)

            fileReader.onload = () => resolve(fileReader.result)
            fileReader.onerror = (err) => reject(err)
        })
    }

    useEffect(() => {
        api
            .get(`/produto/${Number(id)}`)
            .then((response) => {setEditProduto(response.data); reset(response.data);})
            .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            });
    }, [id, reset]);

    const onEditForm = async (data: any) => {
        const request = { nome: data.nome, descricao: data.descricao, quantidade: data.quantidade, tipo: data.tipo, foto: await convertImageToBase64(data.foto[0]), preco: data.preco}
        api
            .put(`/update-produto/${Number(id)}`, request)
            .then((response) => console.log(response, 'Foi!'))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
        });
    }

    return (
        <SidebarWithHeader>
            <Flex justifyContent="center" alignItems="center">
                <Flex flexDirection="column" gap="10" p="10">
                    <Link to="/listar-produtos" style={{ width: "max-content" }}>
                        <Flex align="center" gap="2">
                            <Image as={FiArrowLeft} size={24} />
                            <Text w="max-content">Voltar</Text>
                        </Flex>
                    </Link>
                    <form onSubmit={handleSubmit(onEditForm)}>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Nome</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="text" defaultValue={editProduto?.nome} {...register("nome")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Descrição</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="text" defaultValue={editProduto?.descricao} {...register("descricao")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Quantidade</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="number" defaultValue={editProduto?.quantidade} {...register("quantidade")}  />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Tipo</Text>
                            <Stack spacing={3}>
                                <Select variant='outline' placeholder='Escolha uma opção...' defaultValue={editProduto?.tipo} {...register("tipo")}>
                                    {select_options.map(options =>
                                       <option key={options.id} value={options.value} selected={options.value.toLowerCase() === editProduto?.tipo}>{options.value}</option>
                                    )}
                                </Select>
                            </Stack>
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Foto</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="file" defaultValue={editProduto?.foto} {...register("foto")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Preço</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"}  defaultValue={editProduto?.preco} {...register("preco")} />
                        </Flex>
                        <Button bg={'#dfbda1'}
                            color={'white'}
                            type="submit"
                            _hover={{
                                bg: '#dfbda1',
                                opacity: 0.5
                            }}>Salvar</Button>
                    </form>
                </Flex>
            </Flex>
        </SidebarWithHeader>
    )

}
