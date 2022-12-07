import { Collapse, Flex, Image, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { BsSortDown, BsSortUp } from "react-icons/bs"
import { FiBox, FiUsers } from "react-icons/fi"
import { IoIosSwap } from "react-icons/io"
import { MdPriceCheck } from "react-icons/md"
import { useAuth } from "../../hooks/useAuth"
import { usePicasso } from "../../hooks/usePicasso"
import api from "../../services/api"



const History = () => {
    
    const theme = usePicasso()
    const { token } = useAuth()
    const [ produto, setProduto] = useState([]);
    const [ entradas, setEntradas] = useState([]);
    const [ saidas, setSaidas] = useState([]);
    const [ vendas, setVendas] = useState([]);
    const [ alugueis, setAlugueis] = useState([]);
    const [ cliente, setCliente] = useState([]);

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
    }, [cliente, token]);

    useEffect(() => {
        api
            .get("/get-saida-by-value", {headers: {
                authorization: `Bearer ${token}`
            }})
            .then((response: any) => setSaidas(response.data))
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, [cliente, token]);

    useEffect(() => {
        api
            .get("/entradas", {headers: {
                authorization: `Bearer ${token}`
            }})
            .then((response: any) => setEntradas(response.data))
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, [cliente, token]);

    const onlyVenda = entradas.filter((vend: any) => vend.tipoVenda === "venda")
    const onlyAluguel = entradas.filter((vend: any) => vend.tipoVenda === "aluguel")

    return (
        <Collapse in={!!produto && !!cliente}>
            <Flex gap="10" pb="10" mt="24" flexDir="column" alignItems="center" justifyContent="center" w="100%" borderRadius="2xl" border="1px solid" borderColor={theme.border.quantityCard}>
                <Flex bg={theme.background.menuStatistc} border="1px solid" borderTop="none" px="8" py="2" borderBottomRadius="2xl" borderColor={theme.border.quantityCard}>
                    <Text>Alguns dados gerais</Text>
                </Flex>
                <Flex flexWrap={"wrap"} pt="10" gap={["2rem","6rem","10rem","14rem"]} px="10" w="100%" justifyContent="center">
                    <Flex flexDir="column" alignItems="center">
                        <Image as={BsSortUp} size={50} mb="2" />
                        <Text fontSize={"3xl"} fontWeight="">{entradas.length}</Text>
                        <Text fontSize={"sm"}>Entradas</Text>
                    </Flex>
                    <Flex flexDir="column" alignItems="center">
                        <Image as={BsSortDown} size={50} mb="2" />
                        <Text fontSize={"3xl"} fontWeight="">{saidas.length}</Text>
                        <Text fontSize={"sm"}>Saídas</Text>
                    </Flex>
                    <Flex flexDir="column" alignItems="center">
                        <Image as={MdPriceCheck} size={50} mb="2" />
                        <Text fontSize={"3xl"} fontWeight="">{onlyVenda.length}</Text>
                        <Text fontSize={"sm"}>Vendas</Text>
                    </Flex>
                    <Flex flexDir="column" alignItems="center">
                        <Image as={IoIosSwap} size={48} mb="2" />
                        <Text fontSize={"3xl"}>{onlyAluguel.length}</Text>
                        <Text fontSize={"sm"}>Aluguéis</Text>
                    </Flex>
                    <Flex flexDir="column" alignItems="center">
                        <Image as={FiBox} size={48} mb="2" />
                        <Text fontSize={"3xl"}>{produto.length}</Text>
                        <Text fontSize={"sm"}>Produtos</Text>
                    </Flex>
                    <Flex flexDir="column" alignItems="center">
                        <Image as={FiUsers} size={48} mb="2" />
                        <Text fontSize={"3xl"}>{cliente.length}</Text>
                        <Text fontSize={"sm"}>Cliente</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Collapse>

    )
        
    
}

export { History }