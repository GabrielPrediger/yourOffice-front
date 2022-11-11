import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";

interface IModal {
    isOpen: boolean;
    onClose: () => void;
}

export const DeleteClienteModalComponent: React.FC<IModal> = props => {
    const { isOpen, onClose } = props;

    return (

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontWeight="500">Remover cliente?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontWeight='semibold' mb='1rem'>
                        Você deseja excluir o cliente da base de dados?
                    </Text>
                </ModalBody>

                <ModalFooter justifyContent="center">
                    <Button bgColor="#F56565" color="white" _hover={{ opacity: 0.8 }}>Excluir</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}