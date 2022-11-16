import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { usePicasso } from "../../../hooks/usePicasso";

interface IModal {
    isOpen: boolean;
    onClose: () => void;
}

export const ClienteVendaModal: React.FC<IModal> = props => {
    const { isOpen, onClose } = props;
    const theme = usePicasso();

    return (

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontWeight="500">Cliente</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex gap="2">
                        <Text fontWeight='semibold' mb='1rem'>
                            Nome:
                        </Text>
                        {/* Leva ou mostra os dados do cliente */}
                        <Text  mb='1rem' _hover={{ cursor: 'pointer', color: theme.colors.brown }} transition="0.5s">
                            Gabriel Prediger 
                        </Text>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}