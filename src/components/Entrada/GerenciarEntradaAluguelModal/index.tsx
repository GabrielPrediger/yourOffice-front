import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";
import api from "../../../services/api";
import { useToasty } from "../../Tooltip";

interface IModal {
    id: number;
    isOpen: boolean;
    onClose: () => void;
    sAtrsado: any;
    setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GerenciarEntradaAluguelModal: React.FC<IModal> = props => {
    const { id, isOpen, onClose, sAtrsado, setIsDeleting} = props;
    const { toast } = useToasty();
    const { token } = useAuth()

    const onEditForm = () => {
        setIsDeleting(true)
        api
        .delete(`/delete-entrada/${Number(id)}`, {headers: {
            Authorization: `Bearer ${token}`
         }})
        .then((response) => {console.log('User deletado!'); setIsDeleting(false)},)
        .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        });
        setToastEntregue()
        onClose()
    }

    const setToastEntregue = () => {
        toast({
            id: "toastDeleteEntrada",
            position: "top-right",
            status: "success",
            title: "Entregue!",
            description: "Aluguel foi entregue pelo cliente.",
        });
    }

    const setToastAtrasado = () => {
        toast({
            id: "toastDeleteEntrada",
            position: "top-right",
            status: "warning",
            title: "Atraso!",
            description: "Esse aluguel está atrasado, consulte o cliente!",
        });

    }


    const handleLateRent = () => {
        sAtrsado(true)
        api
            .put(`/update-is-atrasado/${Number(id)}`, { isAtrasado: true}, {headers: {
                Authorization: `Bearer ${token}`
             }})
             .then((response) => {console.log(response, 'Foi!');})
             .catch((err: Error) => {
                console.error("ops! ocorreu um erro");
        });
        setToastAtrasado()
        onClose()
    }

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
                    <Button onClick={onEditForm} bgColor="green.400" color="white" _hover={{ opacity: 0.8 }}>Entregue</Button>
                    <Button onClick={handleLateRent} bgColor="#F56565" color="white" _hover={{ opacity: 0.8 }}>Atrasado</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}