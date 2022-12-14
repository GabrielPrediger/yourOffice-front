import { Collapse, Flex, Image, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { BsSortDown, BsSortUp } from "react-icons/bs"
import { FiBox, FiUsers } from "react-icons/fi"
import { IoIosSwap } from "react-icons/io"
import { MdPriceCheck } from "react-icons/md"
import { TbCurrencyReal } from 'react-icons/tb'
import { useAuth } from "../../hooks/useAuth"
import { usePicasso } from "../../hooks/usePicasso"
import api from "../../services/api"
import { useUserLogged } from "../../hooks/useUserLogged"
import { useToasty } from "../Tooltip"


const History = () => {
    
    const theme = usePicasso()
    const { token } = useAuth()
    const [ produto, setProduto] = useState([]);
    const [ entradas, setEntradas] = useState([]);
    const [ saidas, setSaidas] = useState([]);
    const [ cliente, setCliente] = useState([]);
    const { logged } = useUserLogged()
    const { toast } = useToasty();
    console.log(logged, 'logggggggggggg')

    // useEffect(() => {
    //         toast({
    //             id: "toastDeleteEntrada",
    //             position: "top-right",
    //             status: "success",
    //             title: "Logado!",
    //             description: "Login realizado com sucesso.",
    //         });
    // }, [logged])
    
    useEffect(() => {
        api
            .get("/produtos-name-asc", {headers: {
                Authorization: `Bearer ${token}`
             }})
            .then((response: any) => setProduto(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        }, [token]);

    useEffect(() => {
        api
            .get("/clientes-nome-asc", {headers: {
                authorization: `Bearer ${token}`
            }})
            .then((response: any) => setCliente(response.data))
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, [token]);

    useEffect(() => {
        api
            .get("/get-saida-by-valueAsc", {headers: {
                authorization: `Bearer ${token}`
            }})
            .then((response: any) => setSaidas(response.data))
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, [token]);

    useEffect(() => {
        api
            .get("/entradas-by-dateDesc", {headers: {
                authorization: `Bearer ${token}`
            }})
            .then((response: any) => setEntradas(response.data))
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, [token]);

    const initialValue = 0;
    const onlyVenda = entradas.filter((vend: any) => vend.tipoVenda === "venda")
    const onlyAluguel = entradas.filter((vend: any) => vend.tipoVenda === "aluguel")
    const onlyVendaPreco = onlyVenda.map((vend: any) => vend.valor)
    const onlyAluguelPreco = onlyAluguel.map((vend: any) => vend.valor)
    const onlyDespesasPreco= saidas.map((vend: any) => vend.valor)

    const vendaTotalValor = onlyVendaPreco.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
    );

    const aluguelTotalValor = onlyAluguelPreco.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
    );

    const valorTotalEntradas = aluguelTotalValor + vendaTotalValor

    const despesasTotalValor = onlyDespesasPreco.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
    );

    const valorFinal = valorTotalEntradas - despesasTotalValor
    if(valorFinal < 0){
    } else {
    }
    
    return (
        <Collapse in={!!produto}>
            <Flex gap="10" pb="10" mt="24" flexDir="column" alignItems="center" justifyContent="center" w="100%" borderRadius="2xl" border="1px solid" borderColor={theme.border.quantityCard}>
                <Flex bg={theme.background.menuStatistc} border="1px solid" borderTop="none" px="8" py="2" borderBottomRadius="2xl" borderColor={theme.border.quantityCard}>
                    <Text>Alguns dados gerais</Text>
                </Flex>
                <Flex flexWrap={"wrap"} pt="10" gap={["3rem","6rem","10rem","14rem"]} px="10" w="100%" justifyContent="center">         
                    <Flex flexDir="column" alignItems="center" justifyContent={"center"}>
                        <Image as={BsSortUp} size={50} mb="2" />
                        <Text fontSize={"3xl"} fontWeight="">{entradas.length}</Text>
                        <Text fontSize={"sm"}>Entradas</Text>  
                    </Flex>
                    <Flex  flexDir="column" alignItems="center" justifyContent={"center"}>
                        <Image as={BsSortDown} size={50} mb="2" />
                        <Text fontSize={"3xl"} fontWeight="">{saidas.length}</Text>
                        <Text fontSize={"sm"}>Saídas</Text>  
                    </Flex>
                    <Flex flexDir="column" alignItems="center" justifyContent={"center"}>
                        <Image as={MdPriceCheck} size={50} mb="2" />
                        <Text fontSize={"3xl"} fontWeight="">{onlyVenda.length}</Text>
                        <Text fontSize={"sm"}>Vendas</Text>
                    </Flex>
                    <Flex  flexDir="column" alignItems="center" justifyContent={"center"}>
                        <Image as={IoIosSwap} size={48} mb="2" />
                        <Text fontSize={"3xl"}>{onlyAluguel.length}</Text>
                        <Text fontSize={"sm"}>Aluguéis</Text>                                          
                    </Flex>
                    <Flex  flexDir="column" alignItems="center" justifyContent={"center"}>
                        <Image as={FiBox} size={48} mb="2" />
                        <Text fontSize={"3xl"}>{produto.length}</Text>
                        <Text fontSize={"sm"}>Produtos</Text>   
                    </Flex>
                    <Flex  flexDir="column" alignItems="center" justifyContent={"center"}>
                        <Image as={FiUsers} size={48} mb="2" />
                        <Text fontSize={"3xl"}>{cliente.length}</Text>
                        <Text fontSize={"sm"}>Cliente</Text>

                    </Flex>
                </Flex>
            </Flex>
            {logged === "admin" && (           
            <Flex gap="10" pb="10" mt="24" flexDir="column" alignItems="center" justifyContent="center" w="100%" borderRadius="2xl" border="1px solid" borderColor={theme.border.quantityCard}>
                <Flex bg={theme.background.menuStatistc} border="1px solid" borderTop="none" px="8" py="2" borderBottomRadius="2xl" borderColor={theme.border.quantityCard}>
                    <Text>Financeiro</Text>
                </Flex>
                <Flex flexWrap={"wrap"} pt="10" gap={["3rem","6rem","8rem","12rem"]} px="10" w="100%" justifyContent="center">
                    <Flex  flexDir="column" alignItems="center" justifyContent={"center"}>
                        <Image as={TbCurrencyReal} size={48} mb="2" />
                        <Text fontSize={"3xl"}>R${vendaTotalValor.toFixed(2)}</Text>
                        <Text fontSize={"sm"}>Valor total das vendas</Text>
                    </Flex>
                    <Flex  flexDir="column" alignItems="center" justifyContent={"center"}>
                        <Image as={TbCurrencyReal} size={48} mb="2" />
                        <Text fontSize={"3xl"}>R${aluguelTotalValor.toFixed(2)}</Text>
                        <Text fontSize={"sm"}>Valor dos alugueis</Text>
                    </Flex>
                    <Flex  flexDir="column" alignItems="center" justifyContent={"center"}>
                        <Image as={TbCurrencyReal} size={48} mb="2" />
                        <Text color={'red.400'} fontSize={"3xl"}>R$ -{despesasTotalValor.toFixed(2)}</Text>
                        <Text fontSize={"sm"}>Valor total das despesas</Text>
                    </Flex>
                    <Flex  flexDir="column" alignItems="center" justifyContent={"center"}>
                        <Image as={TbCurrencyReal} size={48} mb="2" />
                        <Text color={'green.400'} fontSize={"3xl"}>R$ +{valorTotalEntradas.toFixed(2)}</Text>
                        <Text fontSize={"sm"}>Valor total das entradas</Text>
                    </Flex>
                    <Flex  flexDir="column" alignItems="center" justifyContent={"center"}>
                        <Image as={TbCurrencyReal} size={48} mb="2" />
                            {valorFinal < 0 ? (
                                <Text color={'red.400'} fontSize={"3xl"}>
                                    R$ {valorFinal.toFixed(2)}
                                </Text>
                            ) : (
                                <Text color={'green.400'} fontSize={"3xl"}>
                                    R$ +{valorFinal.toFixed(2)}
                                </Text>

                            )}
                        <Text fontWeight={600} fontSize={"sm"}>Valor final</Text>
                    </Flex>
                </Flex>
            </Flex>
            )}
        </Collapse>

    )
        
    
}

export { History }