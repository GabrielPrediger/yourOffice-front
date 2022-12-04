import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";

interface IModal {
    isOpen: boolean;
    onClose: () => void;
    sAtrsado: any;
}

export const GerenciarEntradaAluguelModal: React.FC<IModal> = props => {
    const { isOpen, onClose, sAtrsado} = props;



    return (

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontWeight="500">Gerenciar aluguel</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontWeight='semibold' mb='1rem'>
                        O que você deseja fazer com esse aluguel?
                    </Text>
                </ModalBody>

                <ModalFooter justifyContent="center" gap="8">
                    <Button bgColor="green.400" color="white" _hover={{ opacity: 0.8 }}>Entregue</Button>
                    <Button onClick={sAtrsado} bgColor="#F56565" color="white" _hover={{ opacity: 0.8 }}>Atrasado</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}