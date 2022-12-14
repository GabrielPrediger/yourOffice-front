import { Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";
import { usePicasso } from "../../../hooks/usePicasso";
import { useState, useEffect, useMemo } from 'react'
import api from "../../../services/api";
import { handlePaginate } from "../../../utils/handlePaginate";
import { usePaginator } from "chakra-paginator";
import { Pagination } from "../../Pagination";
import { useToasty } from "../../Tooltip";
import {IEntradaProducts, IProduct, IProductsIdAndQuantity} from '../../../Types/index'

interface IModal {
    isOpen: boolean;
    onClose: () => void;
    getProdutos: React.Dispatch<React.SetStateAction<IProductsIdAndQuantity[]>>;
    produtosEdit: IEntradaProducts;
    setProdutosEdit: React.Dispatch<React.SetStateAction<IEntradaProducts>>;
    valorTotal: number;
    setSavedValueCart: React.Dispatch<React.SetStateAction<number>>;
}

export const EditProdutosModal: React.FC<IModal> = props => {

    const { isOpen, onClose, getProdutos, produtosEdit, setProdutosEdit, valorTotal, setSavedValueCart } = props;
    console.log(valorTotal, 'valorTotal');

    const [produto, setProduto] = useState<IProduct[]>([]);
    const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(0);
    const [valorTotalCarrinho, setValorTotalCarrinho] = useState<number>(0);
    const [produtoSliced, setProdutoSliced] = useState<IProduct[]>([]);
    console.log(valorTotalCarrinho, 'valorTotalCarrinho');

    const { toast } = useToasty();   
    const theme = usePicasso();
    const { token } = useAuth()
    const { currentPage, setCurrentPage } = usePaginator({
		initialState: { currentPage: 1 },
	});
    
	const quantityPerPage = 5;
    const quantityOfPages = Math.ceil(
		produto.length / quantityPerPage
	);

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
    
    const decreaseQuantity = (id: number) => {  
        let newSelected = [...(produtosEdit?.produtos ?? [])]

        const previousSelectedProduct = newSelected.find(p => p.id === id)

        if (previousSelectedProduct && previousSelectedProduct.quantidadeVenda) {
            previousSelectedProduct.quantidadeVenda = previousSelectedProduct.quantidadeVenda - 1
            previousSelectedProduct.quantidade = previousSelectedProduct.quantidade + 1
            setValorTotalCarrinho(prevState => prevState - previousSelectedProduct.preco)
            setQuantidadeCarrinho(prevState => prevState - 1)

                if (!previousSelectedProduct.quantidadeVenda) {
                    newSelected = newSelected.filter(p => p.id !== id)
                    setToast("Removido")

                    const newAllProducts = [...produto]

                     const product = newAllProducts.find(p => p.id === id)

                     if (product) {
                        product.quantidadeVenda = 0
                        product.quantidade = previousSelectedProduct.quantidade
                     }
                } 
            }

        setProdutosEdit({
            ...(produtosEdit ?? {}),
            produtos: newSelected
        })     
    }

    const increaseQuantity = (id: number, isNew?: boolean) => {
        const newSelected = [...(produtosEdit?.produtos ?? [])]

        if (isNew) {
            const newSelectedProduct = produto.find(p => p.id === id)
            if (newSelectedProduct && newSelectedProduct.quantidade) {
                setToast("Adicionado")
                setQuantidadeCarrinho(prevState => prevState + 1)
                setValorTotalCarrinho(prevState => prevState + newSelectedProduct.preco)
                newSelected.push({
                    ...newSelectedProduct,
                    quantidadeVenda:  1,
                    quantidade: newSelectedProduct.quantidade - 1
                })
            }
        } else {
            const previousSelectedProduct = newSelected.find(p => p.id === id)

            if (previousSelectedProduct && previousSelectedProduct.quantidade) {
                
                previousSelectedProduct.quantidadeVenda = previousSelectedProduct.quantidadeVenda + 1
                previousSelectedProduct.quantidade = previousSelectedProduct.quantidade - 1
                setValorTotalCarrinho(prevState => prevState + previousSelectedProduct.preco)
                
                setProdutosEdit({
                    ...(produtosEdit ?? {}),
                    produtos: newSelected
                })
            } else {
                setToast("Maximo")
            }
        }

        setProdutosEdit({
            ...(produtosEdit ?? {}),
            produtos: newSelected
        })
    }

    const retonarProdutos = () => {
        const onlyProdutosAlterados = produtoSliced.filter((produto: any) => {
            return produto.quantidadeSelecionada ? {id: produto?.id, quantidade: produto.quantidadeSelecionada } : null   
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
        if(status === "Removido"){
            toast({
                id: "toastEntradaCreateError",
                position: "top-right",
                status: "warning",
                title: "Produto removido!",
                description: "Você removeu o produto da sua entrada!",
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
        if(status === "Minimo"){
            toast({
                id: "toastEntradaCreateError",
                position: "top-right",
                status: "error",
                title: "Erro ao remover!",
                description: "Voce chegou no minimo do estoque!",
            });
        }
    }

    
    const selectedProducts = useMemo(() => {
        return (produtosEdit?.produtos ?? []).map(p => p.id)
    }, [produtosEdit])
    
    const showProducts = useMemo(() => {
        return produto.filter(p => !selectedProducts.includes(p.id))
    }, [selectedProducts, produto])

    useEffect(() => {
		handlePaginate(showProducts, quantityPerPage, currentPage, setProdutoSliced);
	}, [showProducts, currentPage]);


    useEffect(() => {
        if (produtosEdit?.produtos?.length) setQuantidadeCarrinho(produtosEdit?.produtos?.length);
    }, [produtosEdit?.produtos])

    useEffect(() => {
        setValorTotalCarrinho(valorTotal);
    }, [valorTotal])

    useEffect(() => {
        setSavedValueCart(valorTotalCarrinho)
    }, [setSavedValueCart, valorTotalCarrinho])
    

    return (
        <Modal blockScrollOnMount isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontWeight="500">Escolha os produtos</ModalHeader>
                <ModalCloseButton />
                <ModalBody flexDir="column" p="4">
                    {produtosEdit?.produtos?.length ? (
                        <>
                            <Text pb="4" fontSize={"1xl"} fontWeight="500">Produtos ja selecionados:</Text>
                            <Flex gap="5" alignItems="center" pb="5">
                                    <Text flex="3">Nome</Text>
                                    <Flex flex="4" justifyContent="space-between">
                                        <Text>Preço</Text>
                                        <Text>Estoq.</Text>
                                        <Text>Qtd.</Text>
                                    </Flex>
                            </Flex>
                        </>
                    ): null}
                    {produtosEdit?.produtos?.map((prodsEdit: any, index: any) => 
                            <Flex w="100%" justifyContent={"space-between"} alignItems="center">
                                <Flex flex='1' key={prodsEdit.id}  justifyContent="space-between"  rounded={'lg'} gap="8" alignItems="center" py="2" px="2" mr="2" _hover={{ background: theme.background.filtroHover, cursor: 'pointer'}}>
                                    <Flex flex="10" alignItems="center"  gap="2">
                                        <Image objectFit={'cover'} w="3rem" h="3rem" rounded={'lg'} src={prodsEdit.foto} />
                                        <Text>{prodsEdit.nome.slice(0, 16)}</Text>
                                    </Flex>
                                    <Flex flex="4.5">
                                        <Text>R${prodsEdit.preco}</Text>                                     
                                    </Flex>
                                    <Flex flex="4.5">
                                        <Text>{prodsEdit.quantidade}</Text>                                     
                                    </Flex>
                                </Flex>
                                <Flex gap="2" zIndex="9">
                                    <Text 
                                    px="1" 
                                    cursor="pointer" 
                                    rounded={'lg'} 
                                    transition="0.4s"
                                    _hover={{ background: "white", opacity: "0.5"}} 
                                    onClick={() => decreaseQuantity(prodsEdit.id)}
                                    >
                                    -
                                    </Text>
                                        <Text>{prodsEdit.quantidadeVenda? prodsEdit.quantidadeVenda : prodsEdit.quantidadeSelecionada}</Text>
                                    <Text 
                                    px="1" 
                                    cursor="pointer" 
                                    rounded={'lg'} 
                                    transition="0.4s"
                                    _hover={{ background: "white", opacity: "0.5"}} 
                                    onClick={() => increaseQuantity(prodsEdit.id)}
                                    >
                                    +
                                    </Text>
                                </Flex>
                            </Flex>
                    )}
                    {!!produtoSliced?.length && (
                        <>
                        <Text pb={produtosEdit?.produtos?.length ? "4" : "unset"} pt={produtosEdit?.produtos?.length ? "10" : "unset"} fontSize={"1xl"} fontWeight="500">Produtos disponiveis:</Text>
                        <Flex gap="5" alignItems="center" pb="5">
                                <Text flex="3">Nome</Text>
                                <Flex flex="4" justifyContent="space-between">
                                    <Text>Preço</Text>
                                    <Text>Estoq.</Text>
                                    <Text>Qtd.</Text>
                                </Flex>
                        </Flex>
                    </>
                    )}
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
                                        <Text>{prods.quantidadeSelecionada}</Text>
                                        <Text 
                                        px="1" 
                                        cursor="pointer" 
                                        rounded={'lg'} 
                                        transition="0.4s"
                                        _hover={{ background: "white", opacity: "0.5"}} 
                                        onClick={() => increaseQuantity(prods.id, true)}
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
                            <Text>Quantidade total: {quantidadeCarrinho}</Text>
                            <Text>Valor total: R${valorTotalCarrinho.toFixed(2)} </Text>
                        </Flex> 

                        <Button disabled={!produtosEdit?.produtos?.length} my="4" w="100%" bgColor="green.300" onClick={() => retonarProdutos()}>Salvar</Button>   
                </ModalBody>              
            </ModalContent>
        </Modal>
    )
}