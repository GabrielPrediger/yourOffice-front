import { Button, Flex, Image, Input, Select, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import api from "../../../services/api";
import SidebarWithHeader from "../../Sidebar";

interface IProduct {
    id?: number;
    nome: string;
    descricao: string;
    quantidade: number;
    tipo: string; //alugar ou vender
    foto: string;
    preco: number;
}

export default function CreateProdutoComponent() {

    const { register, handleSubmit } = useForm();
    const { token } = useAuth()

    function convertImageToBase64(file: File) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)

            fileReader.onload = () => resolve(fileReader.result)
            fileReader.onerror = (err) => reject(err)
        })
    }

    const onSubmitForm = async (data: IProduct | any) => {
        console.log(data.foto[0].size > 50000000)
        const request = { nome: data.nome, descricao: data.descricao, quantidade: data.quantidade, tipo: data.tipo, foto: await convertImageToBase64(data.foto[0]), preco: data.preco}
        api
            .post("/create-produto", request, {headers: {
                Authorization: `Bearer ${token}`
             }})
            .then((response: any) => console.log(response, 'foi'))
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    return (
        <SidebarWithHeader>
            <Flex justifyContent="center" alignItems="center">
                <Flex flexDirection="column" gap="10" p="10">
                    <Link to="/produtos" style={{ width: "max-content" }}>
                        <Flex align="center" gap="2">
                            <Image as={FiArrowLeft} size={24} />
                            <Text w="max-content">Voltar</Text>
                        </Flex>
                    </Link>
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Nome</Text>
                            <Input placeholder="Digite aqui um nome..." _placeholder={{ color: "#A0AEC0"}} w="25rem" h="max" py="2" size={"lg"} type="text" {...register("nome", { required: true })} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Descrição</Text>
                            <Input placeholder="Digite aqui uma descrição..." _placeholder={{ color: "#A0AEC0"}} w="25rem" h="max" py="2" size={"lg"} type="text" {...register("descricao, { required: true }")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Quantidade</Text>
                            <Input placeholder="Digite aqui uma quantidade..." _placeholder={{ color: "#A0AEC0"}} w="25rem" h="max" py="2" size={"lg"} type="number" {...register("quantidade, { required: true }")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Tipo</Text>
                            <Stack spacing={3}>
                                <Select variant='outline' placeholder='Escolha uma opção...' {...register("tipo", { required: true })}>
                                    <option value='Aluguel'>Aluguel</option>
                                    <option value='Venda'>Venda</option>
                                </Select>
                            </Stack>
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Foto</Text>
                            <Input placeholder="Escolhe uma foto..." _placeholder={{ color: "#A0AEC0"}} w="25rem" h="max" py="2" size={"lg"} type="file" {...register("foto", { required: true })} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Preço</Text>
                            <Input placeholder="Digite aqui um valor..." _placeholder={{ color: "#A0AEC0"}} w="25rem" h="max" py="2" size={"lg"} type="number" {...register("preco", { required: true })} />
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
