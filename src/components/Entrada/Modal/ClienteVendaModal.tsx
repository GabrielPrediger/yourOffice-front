import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { usePicasso } from "../../../hooks/usePicasso";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";

interface IModal {
    clienteId: number;
    isOpen: boolean;
    onClose: () => void;
}

interface ICliente {
    id?: number;
    nome?: string;
    data_nascimento: string;
    cpf_cnpj?: string;
    rg?: string;
    endereco?: string;
}

export const ClienteVendaModal: React.FC<IModal> = props => {

    const [cliente, setCliente] = useState<ICliente>()
    const { clienteId, isOpen, onClose } = props;
    const theme = usePicasso();

    useEffect(() => {
        api
            .get(`/cliente/${clienteId}`)
            .then((response: any) => setCliente(response.data))
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, [cliente, clienteId]);

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
                        <Link to={`/listar-cliente`}>
                            <Text mb='1rem' _hover={{ cursor: 'pointer', color: theme.colors.brown }} transition="0.5s">
                                {cliente?.nome}
                            </Text>
                        </Link>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}