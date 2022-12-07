import { Button, Collapse, Flex, Image, Input, Select, Slide, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsCartPlus } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { usePicasso } from "../../../hooks/usePicasso";
import api from "../../../services/api";
import { ICreateCliente, ICreateEntrada, ICreateProduct } from "../../../Types/CrudTypes";
import SidebarWithHeader from "../../Sidebar";
import { AddProdutosModal } from "../AddProdutosModal";

interface IEntradaProdutos {
    id: number;
    quantidade: number;
}

export default function CreateEntradaComponent() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const theme = usePicasso();
    const [isAluguel, setIsAluguel] = useState<boolean>()
    const [isVenda, setIsVenda] = useState<boolean>()
    const [selectedpProdutos, setSelectedProdutos] = useState<IEntradaProdutos[]>([]);
    const [clientes, setClientes] = useState<ICreateCliente[]>();
    const [valorTotal, setValorTotal] = useState();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { token } = useAuth()

    const onSubmitForm = (data: any) => {
        console.log(data, 'data');

        const request = { tipoVenda: data.tipoVenda, data: data.data, descricao: data.descricao, valor: data.valor, clienteId: Number(data.clienteId), produtos: selectedpProdutos, data_inicio_aluguel: data?.data_inicio_aluguel, data_fim_aluguel: data?.data_fim_aluguel}
        console.log(request, 'request');
        api
            .post("/create-entrada", request, {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => console.log(response))
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }
        
    useEffect(() => {
        api
            .get("/clientes-nome-asc", {headers: {
                Authorization: `Bearer ${token}`
             }})
            .then((response: any) => setClientes(response.data))
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
        }, [token]);

        console.log(selectedpProdutos, 'aaaaaaaaaa')

    return (
        <SidebarWithHeader>
            <AddProdutosModal isOpen={isOpen} onClose={onClose} produtos={setSelectedProdutos} valorTotalDoCarrinho={setValorTotal} />
            <Flex justifyContent="center" alignItems="center">
                <Flex flexDirection="column" gap="10" p="10">
                    <Link to="/entradas" style={{ width: "max-content" }}>
                        <Flex align="center" gap="2" transition="0.5s" _hover={{ opacity: 0.4 }}>
                            <Image as={FiArrowLeft} size={24} />
                            <Text w="max-content">Voltar</Text>
                        </Flex>
                    </Link>
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Descrição</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="text" {...register("descricao", { required: true })}  />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Cliente</Text>
                            <Stack spacing={3}>
                                <Select variant='outline' placeholder='Escolha uma opção...' {...register("clienteId", { required: true })}>
                                    {clientes?.map((client: any) => 
                                       <option key={client.id} value={client.id}>{client.nome}</option>
                                    )}
                                </Select>
                            </Stack>
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Produtos</Text>
                            <Button onClick={onOpen}>Adicionar<Image as={BsCartPlus} size="20px" ml="2" /></Button>                         
                        </Flex>
                        <Collapse in={!!selectedpProdutos.length}>
                            <Flex flexDirection="column" gap="2" pb="5">
                                <Text>Valor</Text>
                                <Input placeholder={`Insira um valor...`} id="valor" w="25rem" h="max" py="2" size={"lg"} {...register("valor", { required: true})} />
                                <Text fontSize={"sm"}>Valor total do carrinho: R$ {valorTotal}</Text>
                            </Flex>
                        </Collapse>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Tipo</Text>
                            <Stack spacing={3}>
                                <Select variant='outline' placeholder='Escolha uma opção...' {...register("tipoVenda", { required: true, onChange(event) {
                                    if(event.target.value === 'aluguel'){
                                        setIsAluguel(true)
                                        setIsVenda(false)
                                        return;
                                    }
                                    setIsAluguel(false)
                                    setIsVenda(true)
                                }, })}>
                                    <option value='aluguel'>Aluguel</option>
                                    <option value='venda'>Venda</option>
                                </Select>
                            </Stack>
                        </Flex>
                            <Collapse in={isAluguel}>
                                <Flex flexDirection="column" gap="2" pb="5">
                                    <Text>Data do aluguel</Text>
                                    <Input w="25rem" h="max" py="2" size={"lg"} type="date" {...register("data_inicio_aluguel", { required: isAluguel ? true : false })} />
                                </Flex>
                                <Flex flexDirection="column" gap="2" pb="5">
                                    <Text>Data de entrega</Text>
                                    <Input w="25rem" h="max" py="2" size={"lg"} type="date" {...register("data_fim_aluguel", { required: isAluguel ? true : false })} />
                                </Flex>
                            </Collapse>
                            <Collapse in={isVenda}>
                                <Flex flexDirection="column" gap="2" pb="5">
                                    <Text>Data</Text>
                                    <Input w="25rem" h="max" py="2" size={"lg"} type="date" {...register("data", { required: isVenda ? true : false })}  />
                                </Flex>
                            </Collapse>
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
