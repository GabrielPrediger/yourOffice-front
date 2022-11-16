import {
    Flex, useDisclosure,
    Text,
    Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { DeleteClienteModalComponent } from "../DeleteClienteModal";

interface IUser {
    nome?: string;
    data?: string;
    CPFCNPJ?: string;
    rg?: string;
    endereco?: string;
}
export const CardCliente: React.FC<IUser> = props => {
    
    const theme = usePicasso();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {nome, data, CPFCNPJ, rg, endereco} = props

    const [listCliente, setListCliente] = useState([]);

    useEffect(() => {
    api
        .get("/get-cliente")
        .then((response: any) => setListCliente(response.data))
        .catch((err: any) => {
        console.error("ops! ocorreu um erro" + err);
        });
    }, [listCliente]);

    return (
        <Flex flexDirection="column" alignItems="center" p="4" w="20rem" h="max" bgColor="white"  border="1.5px solid" borderColor={theme.colors.brown} borderRadius="0.5rem">
            <DeleteClienteModalComponent isOpen={isOpen} onClose={onClose} />
            <Flex gap="2" flexDirection="column" w="100%" justifyContent="flex-start" px="4" my="10">
                <Flex gap="2" justifyContent="space-between">
                    <Text fontWeight={500} fontSize={'sm'} textTransform="uppercase">Nome:</Text>
                    <Text color={'gray.500'} fontSize={'sm'}>{nome}</Text>
                </Flex>
                <Flex gap="2" justifyContent="space-between">
                    <Text fontWeight={500} fontSize={'sm'} textTransform="uppercase">Data:</Text>
                    <Text color={'gray.500'} fontSize={'sm'}>{data}</Text>
                </Flex>
                <Flex gap="2" justifyContent="space-between" flexWrap="wrap">
                    <Text fontWeight={500} fontSize={'sm'} textTransform="uppercase">Cpf/Cnpj:</Text>
                    <Text color={'gray.500'} fontSize={'sm'}>{CPFCNPJ}</Text>
                </Flex>
                <Flex gap="2" justifyContent="space-between" flexWrap="wrap">
                    <Text fontWeight={500} fontSize={'sm'} textTransform="uppercase">Rg:</Text>
                    <Text color={'gray.500'} fontSize={'sm'}>{rg}</Text>
                </Flex>
                <Flex gap="2" justifyContent="space-between" flexWrap="wrap">
                    <Text fontWeight={500} fontSize={'sm'} textTransform="uppercase">Endereço:</Text>
                    <Text color={'gray.500'} fontSize={'sm'}>{endereco}</Text>
                </Flex>
            </Flex>
            <Flex gap="8" pt="4">
                    <Link to='/editar-cliente'>
                        <Button py="1" w="max" h="max" color='white' bgColor={theme.colors.brown} border="1px solid" borderColor={theme.colors.brown} borderRadius="2xl">Editar</Button>
                    </Link>
                    <Button onClick={onOpen} py="1" w="max" h="max" color={theme.colors.brown} bgColor="white" border="1px solid" borderColor={theme.colors.brown} borderRadius="2xl">Deletar</Button>
                </Flex>
        </Flex>
    )
}

