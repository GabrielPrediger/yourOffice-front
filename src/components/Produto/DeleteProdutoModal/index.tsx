import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import api from "../../../services/api";

interface IModal {
    id: number;
    isOpen: boolean;
    onClose: () => void;
}

export const DeleteProdutoModalComponent: React.FC<IModal> = props => {
    const { id, isOpen, onClose } = props;

    const onDelete = () => {
        api
        .delete(`/delete-produto/${Number(id)}`)
        .then((response) => console.log('Produto deletado!'),)
        .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        });
        onClose()
    }

    return (

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontWeight="500">Remover produto?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontWeight='semibold' mb='1rem'>
                        Você deseja excluir o produto da base de dados?
                    </Text>
                </ModalBody>

                <ModalFooter justifyContent="center">
                    <Button onClick={onDelete} bgColor="#F56565" color="white" _hover={{ opacity: 0.8 }}>Excluir</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}