import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import api from "../../../services/api";

interface IModal {
    isOpen: boolean;
    onClose: () => void;
    id: number;
}

export const DeleteUserModalComponent: React.FC<IModal> = props => {
    const { isOpen, onClose, id } = props;

    const onEditForm = () => {
        api
        .delete(`/delete-user/${Number(id)}`)
        .then((response) => console.log('User deletado!'),)
        .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        });
        onClose()
    }

    return (

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontWeight="500">Remover usuario?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontWeight='semibold' mb='1rem'>
                        Você deseja excluir o usuario da base de dados?
                    </Text>
                </ModalBody>

                <ModalFooter justifyContent="center">
                    <Button onClick={onEditForm} bgColor="#F56565" color="white" _hover={{ opacity: 0.8 }}>Excluir</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}