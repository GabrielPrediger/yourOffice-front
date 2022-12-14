import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";
import api from "../../../services/api";
import { useToasty } from "../../Tooltip";

interface IModal {
    id: number;
    isOpen: boolean;
    onClose: () => void;
    setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteEntradaModalComponent: React.FC<IModal> = props => {
    const { id, isOpen, onClose, setIsDeleting } = props;
    const { toast } = useToasty();
    const { token } = useAuth()

    const onEditForm = () => {
        setIsDeleting(true);
        api
        .delete(`/delete-entrada/${Number(id)}`, {headers: {
            Authorization: `Bearer ${token}`
         }})
        .then((response) => {console.log('Entrada deletado!'); setIsDeleting(false)},)
        .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        });
        setToast()
        onClose()
    }

    const setToast = () => {
        toast({
            id: "toastDeleteEntrada",
            position: "top-right",
            status: "success",
            title: "Dados cancelados!",
            description: "Entrada cancelada com sucesso!",
        });
    }

    return (

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontWeight="500">Cancelar entrada?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontWeight='semibold' mb='1rem'>
                        Clicando no botão abaixo você ira cancelar essa entrada e o estoque será atualizado.
                    </Text>
                </ModalBody>

                <ModalFooter justifyContent="center">
                    <Button onClick={onEditForm} bgColor="#F56565" color="white" _hover={{ opacity: 0.8 }}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}