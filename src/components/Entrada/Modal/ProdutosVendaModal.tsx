import { Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { usePicasso } from "../../../hooks/usePicasso";
import { useState, useEffect } from 'react'
import api from "../../../services/api";
interface IModal {
    produtoId: number;
    isOpen: boolean;
    onClose: () => void;
}

interface IProduct {
    id?: number;
    nome: string;
    descricao: string;
    quantidade: number;
    tipo: string; //alugar ou vender
    foto: string;
    preco: number;
}

export const ProdutosVendaModal: React.FC<IModal> = props => {

    const [produto, setProduto] = useState<IProduct>()
    const { produtoId, isOpen, onClose } = props;
    const theme = usePicasso();

    useEffect(() => {
        api
            .get(`/produto/${produtoId}`)
            .then((response: any) => setProduto(response.data))
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, [produto, produtoId]);

    return (

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontWeight="500">Produtos</ModalHeader>
                <ModalCloseButton />
                <ModalBody mb="2">
                        <Flex gap="2" alignItems="center">
                            <Image objectFit={'cover'} w="3rem" h="3rem" rounded={'lg'} src={`${produto?.foto}`} />
                            <Flex justifyContent="space-between" w='100%'>
                                <Text  _hover={{ cursor: 'pointer', color: theme.colors.brown }} transition="0.5s">
                                    {produto?.nome}
                                </Text>
                                <Text  _hover={{ cursor: 'pointer', color: theme.colors.brown }} transition="0.5s">
                                    R$ {produto?.preco}
                                </Text>
                            </Flex>
                        </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}