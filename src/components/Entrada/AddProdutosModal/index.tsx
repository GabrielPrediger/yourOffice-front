import { Button, Collapse, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";
import { usePicasso } from "../../../hooks/usePicasso";
import { useState, useEffect } from 'react'
import api from "../../../services/api";
import { handlePaginate } from "../../../utils/handlePaginate";
import { usePaginator } from "chakra-paginator";
import { useMemo } from 'react'
import { Pagination } from "../../Pagination";

interface IEntradaProdutos {
    id: number;
    quantidade: number;
}

interface IModal {
    isOpen: boolean;
    onClose: () => void;
    produtos: React.Dispatch<React.SetStateAction<IEntradaProdutos[]>>;
    valorTotalDoCarrinho: any;
}

interface IProduct {
    id: number;
    nome: string;
    descricao: string;
    quantidade: number;
    tipo: string; //alugar ou vender
    foto: string;
    preco: number;
}

export const AddProdutosModal: React.FC<IModal> = props => {

    const { isOpen, onClose, produtos, valorTotalDoCarrinho } = props;

    const [produto, setProduto] = useState<IProduct[]>([]);
    const [cart, setCart] = useState<Array<any>>([]);
    const [quantidade, setQuantidade] = useState(0);
    const [valorTotal, setValorTotal] = useState<number>(0);
    const [produtoSliced, setProdutoSliced] = useState<IProduct[]>([]);

    const theme = usePicasso();
    const { token } = useAuth()

        
	const quantityPerPage = 5;

    const { currentPage, setCurrentPage } = usePaginator({
		initialState: { currentPage: 1 },
	});

    const quantityOfPages = Math.ceil(
		produto.length / quantityPerPage
	);


    useMemo(() => {
		handlePaginate(produto, quantityPerPage, currentPage, setProdutoSliced);
	}, [produto, currentPage]);

    useEffect(() => {
        api
            .get("/produtos-name-asc", {headers: {
                Authorization: `Bearer ${token}`
             }})
            .then((response: any) => setProduto(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        }, []);

    const addToEntradaProduto = (itens: IProduct) => {
        const itensToAdd = { id: itens.id, quantidade: itens.quantidade }

        produtos(prevState => [...prevState, itensToAdd]);
    }

    const addToCart = (itens: any) => {
        setCart([...cart, itens]);
    }

    useEffect(() => {
        valorTotalDoCarrinho(valorTotal)
    }, [valorTotal, valorTotalDoCarrinho])
    

    return (

        <Modal blockScrollOnMount isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontWeight="500">Escolha os produtos</ModalHeader>
                <ModalCloseButton />
                <ModalBody flexDir="column" p="4" >
                    <Flex gap="5" alignItems="center" pb="5">
                            <Text flex="2">Nome</Text>
                            <Flex flex="2" justifyContent="space-between">
                                <Text flex='8'>Preço</Text>
                                <Text>Estoq.</Text>
                            </Flex>
                    </Flex>
                    {produtoSliced?.map((prods: IProduct) => 
                        <Flex onClick={() => {setValorTotal(valorTotal + prods.preco); setQuantidade(quantidade + 1); addToEntradaProduto(prods); addToCart({name: prods.nome, price: prods.preco})}} justifyContent="space-between"  rounded={'lg'} gap="8" alignItems="center" mb="4" py="2" px="2" _hover={{ background: theme.background.filtroHover, cursor: 'pointer'}}>
                            <Flex flex="2" alignItems="center"  gap="2">
                                <Image objectFit={'cover'} w="3rem" h="3rem" rounded={'lg'} src={prods.foto} />
                                <Text>{prods.nome.slice(0, 16)}</Text>
                            </Flex>
                            <Flex flex="2" justifyContent="space-between">
                                <Text>R${prods.preco}</Text>
                                <Text>{prods.quantidade > 0 ? prods.quantidade : null}</Text>
                            </Flex>
                        </Flex>
                    )}
                    <Pagination quantityOfPages={quantityOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    <Flex bgColor={theme.background.menuStatistc} gap="4" w="100%" mt="4" p="4" rounded={'lg'} flexDir="column" border="1px solid" borderColor={theme.border.produtoCard} >
                        <Text fontWeight={500}>Itens</Text>
                        <Flex flexDir="column" h={cart.length ? "6rem" : "unset"} overflow="auto">
                            <Flex flexDir="column" px="4" gap="1">
                                <Collapse in={!!cart}>                 
                                    {cart.map((prods: any) => 
                                        <Flex flexDir="row" justifyContent="space-between" alignItems="center">
                                            <Text>{prods.name}</Text>
                                            <Text onClick={() => {setQuantidade(quantidade - 1); setCart(prevState => [...prevState.filter(item => item.name !== prods.name )]); setValorTotal(prevState => prevState - prods.price)}} cursor={"pointer"} _hover={{textDecoration: "underline"}} fontSize="sm" color="red.400">remover</Text>   
                                        </Flex>
                                    )}
                                </Collapse>
                            </Flex>
                        </Flex>
                        <Text>Quantidade total: {quantidade}</Text>
                        <Text>Valor total: R${valorTotal} </Text>
                    </Flex>    
                </ModalBody>              
            </ModalContent>
        </Modal>
    )
}