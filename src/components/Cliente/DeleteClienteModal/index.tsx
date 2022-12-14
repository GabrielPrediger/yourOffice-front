import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";
import api from "../../../services/api";
import { useToasty } from "../../Tooltip";

interface IModal {
    id: number;
    isOpen: boolean;
    onClose: () => void;
}

export const DeleteClienteModalComponent: React.FC<IModal> = props => {
    const { id, isOpen, onClose } = props;
    const { toast } = useToasty();
    const { token } = useAuth()

    const onEditForm = () => {
        api
        .delete(`/delete-cliente/${Number(id)}` , {headers: {
            Authorization: `Bearer ${token}`
         }})
         .then((response) => {console.log('User deletado!'); setToast(response.status)},)
         .catch((err: Error) => {
            console.error("ops! ocorreu um erro" + err);
            setToast(err)
            });
        onClose()
    }

    const setToast = (value: any) => {
        console.log(value);

        if(value === 201) {
            toast({
                id: "toastDeleteUser",
                position: "top-right",
                status: "success",
                title: "Dados deletados!",
                description: "Cliente deletado com sucesso!",
            });
        } else if(value.response.status === 500){
            toast({
                id: "toastDeleteUserError",
                position: "top-right",
                status: "error",
                title: "Impossivel deletar!",
                description: "Cliente está registrado em uma venda",
            });
        }
    }

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
                    <Button onClick={onEditForm} bgColor="#F56565" color="white" _hover={{ opacity: 0.8 }}>Excluir</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}