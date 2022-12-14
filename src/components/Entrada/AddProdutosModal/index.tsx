import { Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";
import { usePicasso } from "../../../hooks/usePicasso";
import { useState, useEffect } from 'react'
import api from "../../../services/api";
import { handlePaginate } from "../../../utils/handlePaginate";
import { usePaginator } from "chakra-paginator";
import { Pagination } from "../../Pagination";
import { useToasty } from "../../Tooltip";
import { IProduct, IProductsIdAndQuantity} from '../../../Types/index'

interface IModal {
    isOpen: boolean;
    onClose: () => void;
    getProdutos: React.Dispatch<React.SetStateAction<IProductsIdAndQuantity[]>>;
    valorTotalDoCarrinho: any;
}

export const AddProdutosModal: React.FC<IModal> = props => {

    const { isOpen, onClose, getProdutos, valorTotalDoCarrinho } = props;
    const [produto, setProduto] = useState<IProduct[]>([]);
    const [quantidade, setQuantidade] = useState(0);
    const [valorTotal, setValorTotal] = useState<number>(0);
    const [produtoSliced, setProdutoSliced] = useState<IProduct[]>([]);

    const theme = usePicasso();
    const { token } = useAuth()
    const { toast } = useToasty();
    const { currentPage, setCurrentPage } = usePaginator({
		initialState: { currentPage: 1 },
	});
 
	const quantityPerPage = 5;

    const quantityOfPages = Math.ceil(
		produto.length / quantityPerPage
	);

    useEffect(() => {
		handlePaginate(produto, quantityPerPage, currentPage, setProdutoSliced);
	}, [ produto, currentPage]);

    useEffect(() => {
        api
            .get("/produtos-name-asc", {headers: {
                Authorization: `Bearer ${token}`
             }})
            .then((response: any) => {
                const products = response.data

                const productsWithQuantity = products.map((product: IProduct) => {
                    return {
                        ...product,
                        quantidadeSelecionada: 0
                    }
                })

                setProduto(productsWithQuantity)
            })
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        }, [token]);

       
    
    const decreaseQuantity = (index: number) => {      
            setQuantidade(prevState => {
                if(prevState === 0) return prevState

                return prevState - 1
            })
            setValorTotal(prevState => {
                if(produtoSliced[index].quantidadeSelecionada === 0 || produtoSliced[index].quantidade === 0){
                    return prevState
                }
                return prevState - produtoSliced[index].preco
            }) 
            setProdutoSliced((prevState: IProduct[]) => {
                if(prevState[index].quantidadeSelecionada === 0) {
                    setToast("Minimo")
                    return prevState
                } 
                prevState[index].quantidadeSelecionada = prevState[index].quantidadeSelecionada - 1    
                return [...prevState]
            })
            
          
            return        
    }

    const increaseQuantity = (index: number) => {    
            setQuantidade(prevState => {
                if(prevState === produtoSliced[index].quantidade) return prevState

                return prevState + 1
            })
            setValorTotal((prevState: number) => {
                // nao soma quando o ta igual, teoricamente deveria adicionar mais 1 quando se iguala
                if(produtoSliced[index].quantidade === produtoSliced[index].quantidadeSelecionada || produtoSliced[index].quantidade === 0) {
                    return prevState;
                }

                return prevState + produtoSliced[index].preco
            }) 
        
            setProdutoSliced((prevState: IProduct[]) => {
                if (prevState[index].quantidadeSelecionada >= prevState[index].quantidade) {
                    setToast("Maximo")
                    return prevState
                }
    
                prevState[index].quantidadeSelecionada = prevState[index].quantidadeSelecionada + 1
    
                return [...prevState]
            })
           
                   
    }

    useEffect(() => {
        valorTotalDoCarrinho(valorTotal)
    }, [valorTotal, valorTotalDoCarrinho])

    const retonarProdutos = () => {
        const onlyProdutosAlterados = produtoSliced.filter((produto: any) => {
            return produto.quantidadeSelecionada ? {id: produto?.id, quantidade: produto.quantidadeSelecionada} : null   
        })

        const produtosCerto = onlyProdutosAlterados.map((produto: any) => {
            return {id: produto?.id, quantidade: produto.quantidadeSelecionada}
        })
        onClose()
        return getProdutos(produtosCerto)
    }

    const setToast = (status: any) => {
        if (status === "Maximo"){
            toast({
                id: "toastEntradaCreateSuc",
                position: "top-right",
                status: "error",
                title: "Erro ao adicionar!",
                description: "Voce chegou no maximo do estoque!",
            });
        } 
        if(status === "Minimo"){
            toast({
                id: "toastEntradaCreateError",
                position: "top-right",
                status: "error",
                title: "Erro ao remover!",
                description: "Voce chegou no minimo do estoque!",
            });
        }
        if(status === "Adicionado"){
            toast({
                id: "toastEntradaCreateError",
                position: "top-right",
                status: "success",
                title: "Produtos adicionados!",
                description: "Você adicionou os produtos a sua entrada!",
            });
        }
    }

    return (
        <Modal blockScrollOnMount isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontWeight="500">Escolha os produtos</ModalHeader>
                <ModalCloseButton />
                <ModalBody flexDir="column" p="4">               
                    <Text fontSize={"1xl"} fontWeight="500">Produtos:</Text>
                    <Flex gap="5" alignItems="center" pb="5">
                            <Text flex="3">Nome</Text>
                            <Flex flex="4" justifyContent="space-between">
                                <Text>Preço</Text>
                                <Text>Estoq.</Text>
                                <Text>Qtd.</Text>
                            </Flex>
                    </Flex>
                    {produtoSliced?.map((prods: IProduct, index) => 
                        <>
                            {prods.quantidade > 0 && (
                                <Flex w="100%" justifyContent={"space-between"} alignItems="center">
                                    <Flex flex='1' key={prods.id}  justifyContent="space-between"  rounded={'lg'} gap="8" alignItems="center" py="2" px="2" mr="2" _hover={{ background: theme.background.filtroHover, cursor: 'pointer'}}>
                                        <Flex flex="10" alignItems="center"  gap="2">
                                            <Image objectFit={'cover'} w="3rem" h="3rem" rounded={'lg'} src={prods.foto} />
                                            <Text>{prods.nome.slice(0, 16)}</Text>
                                        </Flex>
                                        <Flex flex="4.5">
                                            <Text>R${prods.preco}</Text>                                     
                                        </Flex>
                                        <Flex flex="4">
                                            <Text>{prods.quantidade}</Text>  
                                        </Flex>
                                    </Flex> 
                                    <Flex gap="2" zIndex="9">
                                        <Text 
                                        px="1" 
                                        cursor="pointer" 
                                        rounded={'lg'} 
                                        transition="0.4s"
                                        _hover={{ background: "white", opacity: "0.5"}} 
                                        onClick={() => decreaseQuantity(index)}
                                        >
                                         -
                                        </Text>
                                            <Text>{prods.quantidadeSelecionada}</Text>
                                        <Text 
                                        px="1" 
                                        cursor="pointer" 
                                        rounded={'lg'} 
                                        transition="0.4s"
                                        _hover={{ background: "white", opacity: "0.5"}} 
                                        onClick={() => increaseQuantity(index)}
                                        >
                                         +
                                        </Text>
                                    </Flex>
                                </Flex>  
                            )}  
                        </>  
                    )}
                    <Pagination quantityOfPages={quantityOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                        <Flex bgColor={theme.background.menuStatistc} gap="4" w="100%" mt="4" p="4" rounded={'lg'} flexDir="column" border="1px solid" borderColor={theme.border.produtoCard} >                
                            <Text>Quantidade total: {quantidade}</Text>
                            <Text>Valor total: R${valorTotal.toFixed(2)} </Text>
                        </Flex> 

                        <Button disabled={quantidade === 0} my="4" w="100%" bgColor="green.300" onClick={() => retonarProdutos()}>Salvar</Button>   
                </ModalBody>              
            </ModalContent>
        </Modal>
    )
}