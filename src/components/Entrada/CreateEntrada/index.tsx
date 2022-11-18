import { Button, Collapse, Flex, Icon, Image, Input, Select, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import api from "../../../services/api";
import SidebarWithHeader from "../../Sidebar";
import { useEffect, useState } from "react";
import { IoMdClose } from 'react-icons/io'

const select_options = [{id: 1, value: 'Aluguel'}, {id: 2, value: 'Venda'}]


export default function CreateEntradaComponent() {

    const theme = usePicasso();
    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [produtosAdicionados, setProdutosAdicionados] = useState<any[]>([]);
    const [produtoCounter, setProdutoCounter] = useState(0)
    const { register, handleSubmit } = useForm();
    
    const onSubmitForm = (data: any) => {
        console.log(data, 'data')
        api
            .post("/create-entrada", { tipoVenda: data.tipoVenda, data: data.data, valor: data.valor, clienteId: data.clienteId, produtoIds: data.produtosAdicionados  })
            .then((response: any) => console.log(response))
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    useEffect(() => {
        api
            .get("/clientes")
            .then((response: any) => setClientes(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        }, []);

    useEffect(() => {
        api
            .get("/produtos")
            .then((response: any) => setProdutos(response.data))
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);

    const handleProdutosAdicionados = (produto: any) => {
        const produtoExiste = produtosAdicionados.includes(produto)

        if(!produto) return;

        if(produtoExiste) {
            setProdutoCounter(produtoCounter + 1)
        }
        console.log(produtosAdicionados);
        setProdutosAdicionados([...produtosAdicionados, produto]);
    }
    
    return (
        <SidebarWithHeader>
            <Flex justifyContent="center" alignItems="center">
                <Flex flexDirection="column" gap="10" p="10">
                    <Link to="/entradas" style={{ width: "max-content" }}>
                        <Flex align="center" gap="2">
                            <Image as={FiArrowLeft} size={24} />
                            <Text w="max-content">Voltar</Text>
                        </Flex>
                    </Link>
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <Flex flexDirection="column" gap="2" pb="4">
                            <Text>Valor</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="number" {...register("valor")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="4">
                            <Text>Data</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="date" {...register("data")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="4">
                            <Text>Cliente</Text>
                            <Stack spacing={3}>
                                <Select variant='outline' placeholder='Escolha uma opção...' {...register("cliente")}>
                                    {clientes.map((options: any) => 
                                        <option key={options.id} value={options.value}>{options.nome}</option>
                                    )}
                                </Select>
                            </Stack>
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="4">
                            <Text>Produto</Text>
                            <Stack spacing={3}>
                                <Select variant='outline' placeholder='Escolha uma opção...' {...register("produto", {onChange: (e) => {handleProdutosAdicionados(e.target.selectedOptions[0].value); console.log(e.target.selectedOptions)}})}>
                                    {produtos.map((options: any) => 
                                        <option key={options.id} value={options.value}>{options.nome}</option>
                                    )}
                                </Select>
                                <Collapse in={produtosAdicionados.length !== 0} animateOpacity>
                                    {produtosAdicionados.filter(function(item, pos) {
                                         return produtosAdicionados.indexOf(item) === pos;
                                    }).map((value: any) => 
                                        <Flex alignItems="center" gap="2" ml="4" justifyContent="space-between" w="max-content" >
                                            <Flex alignItems="center" gap="2" borderLeft="1px solid #A0AEC0" borderBottom="1px solid #A0AEC0" borderBottomLeftRadius="0.5rem">
                                                <Text pl="1" w="100%" py="1" fontSize="xs" >- {value}</Text>
                                                <Text fontSize="xs">{produtoCounter}</Text>
                                            </Flex>
                                            <Icon onClick={() => setProdutosAdicionados(prevState => ([...prevState.filter(i => i !== value)]))} as={IoMdClose} style={{width: '15px', height: "15px", cursor: "pointer"}} />
                                        </Flex>
                                    )}
                                    
                                </Collapse>
                            </Stack>
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="4">
                            <Text>Tipo</Text>
                            <Stack spacing={3}>
                                <Select variant='outline' placeholder='Escolha uma opção...' {...register("tipo")}>
                                    {select_options.map(options =>
                                       <option key={options.id} value={options.value}>{options.value}</option>
                                    )}
                                </Select>
                            </Stack>
                        </Flex>
                        <Button 
                            type="submit"
                            bg={'#dfbda1'}
                            color={'white'}
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
