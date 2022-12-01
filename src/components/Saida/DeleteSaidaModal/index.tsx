import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";
import api from "../../../services/api";

interface IModal {
    id: number;
    isOpen: boolean;
    onClose: () => void;
}

export const DeleteSaidaModalComponent: React.FC<IModal> = props => {
    const { id, isOpen, onClose } = props;
    const { token } = useAuth()

    const onEditForm = () => {
        api
        .delete(`/delete-saida/${Number(id)}`, {headers: {
            Authorization: `Bearer ${token}`
         }})
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
                <ModalHeader fontWeight="500">Remover a Saida?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontWeight='semibold' mb='1rem'>
                        Você deseja excluir a despesa da base de dados?
                    </Text>
                </ModalBody>

                <ModalFooter justifyContent="center">
                    <Button onClick={onEditForm} bgColor="#F56565" color="white" _hover={{ opacity: 0.8 }}>Excluir</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}