import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";
import { usePicasso } from "../../../hooks/usePicasso";
import { useEffect, useState } from 'react'
import api from "../../../services/api";
import { formatDate } from "../../../utils/formatDate";
interface IModal {
    isOpen: boolean;
    onClose: () => void;
    cliente:  number;
}

interface IUser {
    id: number;
    nome: string;
    data_nascimento: number;
    cpf_cnpj: string;
    rg: string;
    endereco: string;
}

export const ClienteVendaModal: React.FC<IModal> = props => {
    const { isOpen, onClose, cliente } = props;
    const theme = usePicasso();
    const { token } = useAuth();
    const [clientes, setClientes] = useState<IUser>();

    useEffect(() => {
        api
            .get(`/cliente/${Number(cliente)}`, {headers: {
                Authorization: `Bearer ${token}`
             }})
            .then((response) => {setClientes(response.data)})
            .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            });
    }, [cliente, token]);

    return (

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent p="1">
                <ModalHeader fontWeight="500">Cliente</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex gap="4" flexDir="column">
                        <Flex justifyContent="space-between">
                            <Text fontWeight='semibold'>
                                Nome
                            </Text>
                            <Text  _hover={{ cursor: 'pointer', color: theme.colors.brown }} transition="0.5s">
                                {clientes?.nome}
                            </Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                            <Text fontWeight='semibold'>
                                Data Nascimento
                            </Text>
                            <Text  _hover={{ cursor: 'pointer', color: theme.colors.brown }} transition="0.5s">
                                {formatDate(clientes?.data_nascimento)}
                            </Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                            <Text fontWeight='semibold'>
                                Cpf/Cnpj
                            </Text>
                            <Text  _hover={{ cursor: 'pointer', color: theme.colors.brown }} transition="0.5s">
                                {clientes?.cpf_cnpj}
                            </Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                            <Text fontWeight='semibold'>
                                Rg
                            </Text>
                            <Text  _hover={{ cursor: 'pointer', color: theme.colors.brown }} transition="0.5s">
                                {clientes?.rg}
                            </Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                            <Text fontWeight='semibold'>
                                Endereço
                            </Text>
                            <Text  _hover={{ cursor: 'pointer', color: theme.colors.brown }} transition="0.5s">
                                {clientes?.endereco}
                            </Text>
                        </Flex>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}