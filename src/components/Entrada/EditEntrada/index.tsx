import { Button, Collapse, Flex, Image, Input,  Select,  Stack,  Text, useDisclosure } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import SidebarWithHeader from "../../Sidebar";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useToasty } from "../../Tooltip";
import { useAuth } from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { ICreateCliente } from "../../../Types/CrudTypes";
import { formatDate } from "../../../utils/formatDate";
import { BsCartPlus } from "react-icons/bs";
import { IEntradaProducts, IProduct, IProductsIdAndQuantity } from '../../../Types/index'
import { EditProdutosModal } from "../EditProdutosModal";


export default function EditarEntradaComponent() {

    const { isOpen: isOpenEditProdutos, onOpen: onOpenEditProdutos, onClose: onCloseEditProdutos } = useDisclosure()
    const { toast } = useToasty();
    const theme = usePicasso();
    const [editEntrada, setEditEntrada] = useState<IEntradaProducts>({} as IEntradaProducts);
    const [valorTotal, setValorTotal] = useState<number>(0)
    const [savedValueCart, setSavedValueCart] = useState<number>(0)

    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm({defaultValues: editEntrada });
    const { token } = useAuth()
    const [clientes, setClientes] = useState<ICreateCliente[]>();
    const [selectedpProdutos, setSelectedProdutos] = useState<IProductsIdAndQuantity[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        api
            .get(`/entrada/${Number(id)}`, {headers: {
                Authorization: `Bearer ${token}`
             }})
            .then((response) => {              
                setEditEntrada(response.data); 
                reset(response.data);
                response?.data?.produtos?.map((produto:IProduct) => setValorTotal(prevState => prevState + Number(produto?.preco)))
                console.log(response?.data, "response data");
            })
            .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            });

    }, [id, reset, token]);

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

    const onEditForm = async (data: any) => {
        console.log("data:", data)

        const request = { produtos: editEntrada.produtos, tipoVenda: data?.tipoVenda, data: data.data, descricao: data.descricao, valor: data.valor, clienteId: Number(data.clienteId), data_inicio_aluguel: data?.data_inicio_aluguel, data_fim_aluguel: data?.data_fim_aluguel}
        console.log("request:", request)
        api
            .put(`/update-entrada/${Number(id)}`, request, {headers: {
                Authorization: `Bearer ${token}`
             }})
             .then((response) => {console.log(response, 'Foi!'); setToast(1); navigate('/listar-entradas');})
             .catch((err: Error) => {
                console.error("ops! ocorreu um erro" + setToast(2));
        });
    }
    

    const setToast = (status: any) => {
        console.log(status)
        if (status === 1){
            toast({
                id: "toastProdutoEditSuc",
                position: "top-right",
                status: "success",
                title: "Dados editados!",
                description: "As informações foram alteradas com sucesso!",
            });
        } 
        if(status === 2){
            toast({
                id: "toastProdutoEditError",
                position: "top-right",
                status: "error",
                title: "Dados ja existentes!",
                description: "Nome de produto já cadastrado!",
            });
        }
    }



    console.log('editEntrada.tsx:', editEntrada);

    return (
        <SidebarWithHeader>
            <EditProdutosModal 
                isOpen={isOpenEditProdutos} 
                onClose={onCloseEditProdutos} 
                setProdutosEdit={setEditEntrada} 
                produtosEdit={editEntrada} 
                getProdutos={setSelectedProdutos} 
                valorTotal={valorTotal}
                setSavedValueCart={setSavedValueCart}
            />
            <Flex justifyContent="center" alignItems="center">
            <Flex flexDirection="column" gap="10" p="10">
                    <Link to="/listar-entradas" style={{ width: "max-content" }}>
                        <Flex align="center" gap="2" transition="0.5s" _hover={{ opacity: 0.4 }}>
                            <Image as={FiArrowLeft} size={24} />
                            <Text w="max-content">Voltar</Text>
                        </Flex>
                        
                    </Link>
                    <form onSubmit={handleSubmit(onEditForm)}>
                    <Flex flexDirection="column" gap="2" pb="5">
                        <Text>Valor</Text>                      
                        <Input w="25rem" h="max" py="2" size={"lg"} defaultValue={editEntrada?.valor} {...register("valor")} />
                        <Text fontSize={"sm"}>Valor total do carrinho atualizado: R$ {savedValueCart?.toFixed(2)}</Text>

                    </Flex>
                    <Flex flexDirection="column" gap="2" pb="5">
                        <Text>Descrição</Text>
                        <Input w="25rem" h="max" py="2" size={"lg"} type="text" defaultValue={String(editEntrada?.descricao)} {...register("descricao")} />
                    </Flex>
                    <Collapse in={editEntrada?.tipoVenda === 'aluguel'}>
                        <Flex flexDirection="column" gap="2" pb="5">
                                <Flex gap="2">
                                    <Text>Data do aluguel:</Text>
                                    <Text fontSize={"md"} fontWeight={500}>{formatDate(String(editEntrada?.data_inicio_aluguel))}</Text>
                                </Flex>     
                            <Input w="25rem" h="max" py="2" size={"lg"} type="date" defaultValue={String(editEntrada?.data_inicio_aluguel)} {...register("data_inicio_aluguel")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                                <Flex gap="2">
                                    <Text>Data de entrega:</Text>
                                    <Text fontSize={"md"} fontWeight={500}>{formatDate(String(editEntrada?.data_fim_aluguel))}</Text>
                                </Flex>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="date" defaultValue={String(editEntrada?.data_fim_aluguel)} {...register("data_fim_aluguel")} />
                        </Flex>
                        </Collapse>
                        <Collapse in={editEntrada?.tipoVenda === 'venda'}>
                            <Flex flexDirection="column" gap="2" pb="5">
                                <Flex gap="2">
                                    <Text>Data: </Text>
                                    <Text fontSize={"md"} fontWeight={500}>{formatDate(editEntrada?.data)}</Text>
                                </Flex>
                                <Input w="25rem" h="max" py="2" size={"lg"} type="date" defaultValue={String(editEntrada?.data)}  {...register("data")}  />
                            </Flex>
                        </Collapse>
                    <Flex flexDirection="column" gap="2" pb="5">
                        <Text>Cliente</Text>
                        <Stack spacing={3}>
                                <Select variant='outline' placeholder='Escolha uma opção...' defaultValue={editEntrada?.clienteId} {...register("clienteId")}>
                                    {clientes?.map((client: any) => 
                                       <option key={client.id} value={client.id}>{client.nome}</option>
                                    )}
                                </Select>
                        </Stack>
                    </Flex>
                    <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Produtos</Text>
                            <Button onClick={onOpenEditProdutos}>Editar/Adicionar<Image as={BsCartPlus} size="20px" ml="2" /></Button>                         
                        </Flex>
                    <Flex flexDirection="row" gap="2" alignItems="center" pb="5"> 
                        <Text>Tipo:</Text>
                        <Text color={editEntrada?.tipoVenda === 'venda' ? 'green.300' : 'orange.300' } fontSize={"lg"} fontWeight={500} defaultValue={editEntrada?.tipoVenda} {...register("tipoVenda")}>
                             {editEntrada?.tipoVenda?.toUpperCase()}
                        </Text>
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
                        Salvar
                    </Button>
                    </form>
                </Flex>
            </Flex>
        </SidebarWithHeader>
    )

}
