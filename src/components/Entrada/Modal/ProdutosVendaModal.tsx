import { Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { usePicasso } from "../../../hooks/usePicasso";
import api from "../../../services/api";
import { useEffect, useState } from 'react'
import { IProduct } from "../../../Types";

interface IModal {
    isOpen: boolean;
    onClose: () => void;
    produtos: IProduct[];
}

export const ProdutosVendaModal: React.FC<IModal> = props => {
    const { isOpen, onClose, produtos } = props;
    const theme = usePicasso();
    const [clientes, setClientes] = useState();


    console.log(produtos, 'produtos');
    return (

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontWeight="500">Produtos</ModalHeader>
                <ModalCloseButton />
                <ModalBody mb="2">
                    <Flex justifyContent="space-between" mb="2">
                        <Text>Nome</Text>
                        <Flex gap="10">
                            <Text>Valor</Text>
                            <Text>Qtd</Text>
                        </Flex>
                    </Flex>
                    <Flex gap="2" flexDir="column">
                        {produtos.map((prod: any) =>
                            <Flex flexDir="row" alignItems="center" gap="2">
                                <Image objectFit={'cover'} w="3rem" h="3rem" rounded={'lg'} src={prod.foto} />
                                <Flex w='100%'>
                                    <Flex flex="5">
                                        <Text  _hover={{ cursor: 'pointer', color: theme.colors.brown }} transition="0.5s">
                                            {prod.nome}
                                        </Text>
                                    </Flex>
                                    <Flex justifyContent={"space-between"} flex="2" gap="8">
                                        <Flex>
                                            <Text  _hover={{ cursor: 'pointer', color: theme.colors.brown }} transition="0.5s">
                                                R${prod.preco}
                                            </Text>
                                        </Flex>
                                        <Flex>
                                            <Text  _hover={{ cursor: 'pointer', color: theme.colors.brown }} transition="0.5s">
                                                {prod.quantidadeVenda}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                        )}
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}