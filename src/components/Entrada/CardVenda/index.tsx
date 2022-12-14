import {useState} from 'react'
import {
    Flex, Image, useDisclosure,
    Text,
    Button,
    Icon,
    Collapse,
} from "@chakra-ui/react";
import { FiBox } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi";
import { Link } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import { DeleteEntradaModalComponent } from "../DeleteEntradaModal";
import { GerenciarEntradaAluguelModal } from "../GerenciarEntradaAluguelModal";
import { ClienteVendaModal } from "../Modal/ClienteVendaModal";
import { ProdutosVendaModal } from "../Modal/ProdutosVendaModal";
import { CiTimer } from 'react-icons/ci'
import { formatDate } from '../../../utils/formatDate';
import { IoIosSwap } from 'react-icons/io';
import { IEntradaProducts } from '../../../Types';

export const CardVenda: React.FC<IEntradaProducts> = props => {

    const { id, tipoVenda, data, descricao, valor, clienteId, produtos, data_inicio_aluguel, data_fim_aluguel, isAtrasado, setIsDeleting } = props
    const theme = usePicasso();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: clientesOpen, onOpen: clientesOn, onClose: clientesClose } = useDisclosure()
    const { isOpen: produtosOpen, onOpen: produtosOn, onClose: produtosClose } = useDisclosure()
    const { isOpen: gerenciarAluguelOpen, onOpen: gerenciarAluguelOn, onClose: gerenciarAluguelClose } = useDisclosure()
    const [ atrasado, setAtrasdo ] = useState(isAtrasado)
    
    return (
        <Flex flexDirection="column" px="3" py="1" justifyContent="space-between" alignItems="center" w="20rem" h="18rem" bgColor={theme.background.entradaCard}  border="1.5px solid" borderColor={theme.border.entradaCard} borderRadius="0.5rem">
            <DeleteEntradaModalComponent id={id} setIsDeleting={setIsDeleting} isOpen={isOpen} onClose={onClose} />
            <GerenciarEntradaAluguelModal id={id} setIsDeleting={setIsDeleting} isOpen={gerenciarAluguelOpen} onClose={gerenciarAluguelClose} sAtrsado={setAtrasdo} />
            <ClienteVendaModal isOpen={clientesOpen} onClose={clientesClose} cliente={clienteId} />
            <ProdutosVendaModal isOpen={produtosOpen} onClose={produtosClose} produtos={produtos} />

            <Flex w='100%'  position="relative" justifyContent="space-between" alignItems={"center"}>
                <Text color={tipoVenda === 'venda' ? 'green.300' : 'orange.300' } fontSize={'1rem'} fontFamily={'body'} fontWeight={500} textTransform="uppercase">({tipoVenda})</Text>
                <Collapse in={atrasado || isAtrasado}>
                    <Flex w='100%' >
                        <Flex top="-0.35rem" right="0rem" position="absolute" fontWeight="500" color='red.300' px="2" py="2" border="1.5px solid" borderTop="none" borderColor={theme.border.quantityCard} borderBottomRadius="1rem" bgColor={theme.background.quantityCard}>
                            <Image as={CiTimer} size="26px" color={'orange.500'} />
                        </Flex>
                    </Flex>
                </Collapse>
            </Flex>
            <Flex gap="3" flexDirection="column" w="90%" justifyContent="flex-start" py="10" alignItems={"center"}>
                <Flex flexDirection="row" gap="4" justifyContent="center">
                    <Icon as={HiOutlineUsers} style={{ width: '1.5rem', height: '1.5rem'}} cursor="pointer" _hover={{ color: theme.colors.brown }} transition="0.5s" onClick={clientesOn} />
                    <Icon as={FiBox} style={{ width: '1.5rem', height: '1.5rem'}} cursor="pointer" _hover={{ color: theme.colors.brown }} transition="0.5s" onClick={produtosOn} />
                </Flex>
                {tipoVenda === 'venda' ? (
                    <Text fontWeight={'500'} fontSize={'sm'} textTransform="uppercase">{formatDate(data)}</Text>
                ) : (
                    <Flex gap="1" alignItems="center">
                        <Text fontWeight={'500'} fontSize={'sm'} textTransform="uppercase">{formatDate(data_inicio_aluguel)}</Text>
                        <Image as={IoIosSwap} />
                        <Text fontWeight={'500'} fontSize={'sm'} textTransform="uppercase">{formatDate(data_fim_aluguel)}</Text>
                    </Flex>
                )}
                <Flex justifyContent="center">
                    <Text fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>R${valor}</Text>
                </Flex>
            </Flex>
            <Flex gap="4" alignItems="center" justifyContent="center" mb="4">
                    <Link to={`/editar-entrada/${id}`}>
                        <Button py="1" w="max" h="max" color='white' bgColor={theme.background.editButton} border="1px solid" borderColor={theme.border.editButton} borderRadius="2xl">Editar</Button>
                    </Link>
                    {tipoVenda === 'aluguel' ? (
                        <Button bgColor={theme.background.deleteButton} onClick={gerenciarAluguelOn} py="1" w="max" h="max" color={theme.colors.brownWhite} border="1px solid" borderColor={theme.border.deleteButton} borderRadius="2xl">Gerenciar</Button>
                    ) : (
                        <Button bgColor={theme.background.deleteButton} onClick={onOpen} py="1" w="max" h="max" color={theme.colors.brownWhite} border="1px solid" borderColor={theme.border.deleteButton} borderRadius="2xl">Cancelar</Button>
                    )}

            </Flex>
        </Flex>
    )
}

