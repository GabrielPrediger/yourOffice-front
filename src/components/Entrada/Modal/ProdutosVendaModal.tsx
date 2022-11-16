import { Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { usePicasso } from "../../../hooks/usePicasso";

interface IModal {
    isOpen: boolean;
    onClose: () => void;
}

export const ProdutosVendaModal: React.FC<IModal> = props => {
    const { isOpen, onClose } = props;
    const theme = usePicasso();

    return (

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontWeight="500">Produtos</ModalHeader>
                <ModalCloseButton />
                <ModalBody mb="2">
                    <Flex gap="2" alignItems="center">
                        <Image objectFit={'cover'} w="3rem" h="3rem" rounded={'lg'} src="https://abracasa.vteximg.com.br/arquivos/ids/180932-400-400/mesa-frente.jpg?v=637891859730970000" />
                        {/* Leva para o produto */}
                        <Flex justifyContent="space-between" w='100%'>
                            <Text  _hover={{ cursor: 'pointer', color: theme.colors.brown }} transition="0.5s">
                                Mesa de centro 
                            </Text>
                            <Text  _hover={{ cursor: 'pointer', color: theme.colors.brown }} transition="0.5s">
                                R$ 67,90
                            </Text>
                        </Flex>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}