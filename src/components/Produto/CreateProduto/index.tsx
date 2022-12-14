import { Button, Flex, Image, Input, Select, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { usePicasso } from "../../../hooks/usePicasso";
import api from "../../../services/api";
import SidebarWithHeader from "../../Sidebar";
import { useToasty } from "../../Tooltip";
import { useEffect } from 'react'

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

    const { register, handleSubmit, reset, formState: {isSubmitSuccessful} } = useForm();
    const { toast } = useToasty();
    const { token } = useAuth()
    const theme = usePicasso();

    function convertImageToBase64(file: File) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)

            fileReader.onload = () => resolve(fileReader.result)
            fileReader.onerror = (err) => reject(err)
        })
    }

    const onSubmitForm = async (data: IProduct | any) => {
        const request = { nome: data.nome, descricao: data.descricao, quantidade: data.quantidade, tipo: data.tipo, foto: await convertImageToBase64(data.foto[0]), preco: data.preco}
        api
            .post("/create-produto",  request, {headers: {
                Authorization: `Bearer ${token}`
             }})
             .then((response: any) => {console.log(response, 'foi'); setToast(response);})
             .catch((err: any) => {
                console.error("ops! ocorreu um erro" + setToast(err));
            });
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({ nome: "", descricao: "", quantidade: "", tipo: "", foto: "", preco: ""})
        }
    }, [isSubmitSuccessful, reset])

    const setToast = (status: any) => {
        console.log(status)
        if (status.status === 201){
            toast({
                id: "toastProdutoCreate",
                position: "top-right",
                status: "success",
                title: "Dado criado!",
                description: "Vá para a lista de produtos para visualizar!",
            });
        } 
        else if(status.response.status === 400){
            toast({
                id: "toastProdutoCreateError",
                position: "top-right",
                status: "error",
                title: "Dados ja existentes!",
                description: "Nome de produto já cadastrado!",
            });
        }
    }


    return (
        <SidebarWithHeader>
            <Flex justifyContent="center" alignItems="center">
                <Flex flexDirection="column" gap="10" p="10">
                    <Link to="/produtos" style={{ width: "max-content" }}>
                        <Flex align="center" gap="2" transition="0.5s" _hover={{ opacity: 0.4 }}>
                            <Image as={FiArrowLeft} size={24} />
                            <Text w="max-content">Voltar</Text>
                        </Flex>
                    </Link>
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Nome</Text>
                            <Input placeholder="Digite aqui um nome..." _placeholder={{ color: "#A0AEC0"}} w="25rem" h="max" py="2" size={"lg"} type="text" {...register("nome")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Descrição</Text>
                            <Input placeholder="Digite aqui uma descrição..." _placeholder={{ color: "#A0AEC0"}} w="25rem" h="max" py="2" size={"lg"} type="text" {...register("descricao")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Quantidade</Text>
                            <Input placeholder="Digite aqui uma quantidade..." _placeholder={{ color: "#A0AEC0"}} w="25rem" h="max" py="2" size={"lg"}  {...register("quantidade")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Tipo</Text>
                            <Stack spacing={3}>
                                <Select variant='outline' placeholder='Escolha uma opção...' {...register("tipo")}>
                                    <option value='Aluguel'>Aluguel</option>
                                    <option value='Venda'>Venda</option>
                                </Select>
                            </Stack>
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Foto</Text>
                            <Input placeholder="Escolhe uma foto..." _placeholder={{ color: "#A0AEC0"}} w="25rem" h="max" py="2" size={"lg"} type="file" {...register("foto")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Preço</Text>
                            <Input placeholder="Digite aqui um valor..." _placeholder={{ color: "#A0AEC0"}} w="25rem" h="max" py="2" size={"lg"} {...register("preco")} />
                        </Flex>
                        <Button 
                            w="100%"
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
