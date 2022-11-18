import {
    Flex, Image, useDisclosure,
    Text,
    Button,
    Icon,
} from "@chakra-ui/react";
import { FiBox } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi";
import { Link } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import { DeleteEntradaModalComponent } from "../DeleteEntradaModal";
import { ClienteVendaModal } from "../Modal/ClienteVendaModal";
import { ProdutosVendaModal } from "../Modal/ProdutosVendaModal";

interface IEntrada {
    id?: any;
    tipoVenda: string;
    data: string;
    descricao?: string;
    valor: number;
    clienteId: any;
    produtoId: any;
}

export const CardVenda: React.FC<IEntrada> = props => {

    const { id, tipoVenda, data, descricao, valor, clienteId, produtoId } = props;
    const theme = usePicasso();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: clientesOpen, onOpen: clientesOn, onClose: clientesClose } = useDisclosure()
    const { isOpen: produtosOpen, onOpen: produtosOn, onClose: produtosClose } = useDisclosure()

    return (
        <Flex flexDirection="column" p="3" justifyContent="flex-start" alignItems="center" w="20rem" h="max" bgColor="white"  border="1.5px solid" borderColor={theme.colors.brown} borderRadius="0.5rem">
            <DeleteEntradaModalComponent isOpen={isOpen} onClose={onClose} id={id} />
            <ClienteVendaModal isOpen={clientesOpen} onClose={clientesClose} clienteId={clienteId} />
            <ProdutosVendaModal isOpen={produtosOpen} onClose={produtosClose} produtoId={produtoId} />

            <Flex w='100%' bottom="0.5rem" position="relative" justifyContent="space-between">
                <Text fontWeight={'500'} fontSize={'sm'} textTransform="uppercase">{data}</Text>
                <Text color={'green.300'} fontSize={'1rem'} fontFamily={'body'} fontWeight={500}>({tipoVenda})</Text>
            </Flex>
            <Flex gap="5" flexDirection="column" w="90%" justifyContent="flex-start" py="10">
                <Flex flexDirection="row" gap="4" justifyContent="center">
                    <Icon as={HiOutlineUsers} style={{ width: '1.5rem', height: '1.5rem'}} cursor="pointer" _hover={{ color: theme.colors.brown }} transition="0.5s" onClick={clientesOn} />
                    <Icon as={FiBox} style={{ width: '1.5rem', height: '1.5rem'}} cursor="pointer" _hover={{ color: theme.colors.brown }} transition="0.5s" onClick={produtosOn} />
                </Flex>
                <Flex justifyContent="center">
                    <Text fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>R$ {valor}</Text>
                </Flex>
            </Flex>
            <Flex gap="8" alignItems="center" justifyContent="center">
                    <Link to={`/editar-entrada/${id}`}>
                        <Button py="1" w="max" h="max" color='white' bgColor={theme.colors.brown} border="1px solid" borderColor={theme.colors.brown} borderRadius="2xl">Editar</Button>
                    </Link>
                    <Button onClick={onOpen} py="1" w="max" h="max" color={theme.colors.brown} bgColor="white" border="1px solid" borderColor={theme.colors.brown} borderRadius="2xl">Deletar</Button>
                </Flex>
        </Flex>
    )
}

