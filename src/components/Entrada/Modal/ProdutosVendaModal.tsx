import { Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { usePicasso } from "../../../hooks/usePicasso";
import api from "../../../services/api";
import { useEffect, useState } from 'react'

interface IModal {
    isOpen: boolean;
    onClose: () => void;
    produtos: [];
}

export const ProdutosVendaModal: React.FC<IModal> = props => {
    const { isOpen, onClose, produtos } = props;
    const theme = usePicasso();
    const [clientes, setClientes] = useState();

    // useEffect(() => {
    //     api
    //         .get(`/cliente/${Number(cliente)}`, {headers: {
    //             Authorization: `Bearer ${token}`
    //          }})
    //         .then((response) => {setClientes(response.data)})
    //         .catch((err) => {
    //         console.error("ops! ocorreu um erro" + err);
    //         });
    // }, [cliente, token]);
    console.log(produtos, 'produtos');
    return (

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontWeight="500">Produtos</ModalHeader>
                <ModalCloseButton />
                <ModalBody mb="2">
                    <Flex gap="2" flexDir="column">
                        {produtos.map((prod: any) =>
                            <Flex flexDir="row" alignItems="center" gap="2">
                                <Image objectFit={'cover'} w="3rem" h="3rem" rounded={'lg'} src={prod.foto} />
                                <Flex justifyContent="space-between" w='100%'>
                                    <Text  _hover={{ cursor: 'pointer', color: theme.colors.brown }} transition="0.5s">
                                        {prod.nome}
                                    </Text>
                                    <Text  _hover={{ cursor: 'pointer', color: theme.colors.brown }} transition="0.5s">
                                        R${prod.preco}
                                    </Text>
                                </Flex>
                            </Flex>
                        )}
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}