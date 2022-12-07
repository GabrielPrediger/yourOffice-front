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

interface IEntrada {
    id?: any;
    tipoVenda: string;
    data: string;
    descricao: string;
    valor: number;
    clienteId: any;
    produtos: any;
    data_fim_aluguel?: any;
    data_inicio_aluguel?: any;
}

export const CardVenda: React.FC<IEntrada> = props => {

    const { id, tipoVenda, data, descricao, valor, clienteId, produtos, data_inicio_aluguel, data_fim_aluguel } = props
    const theme = usePicasso();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: clientesOpen, onOpen: clientesOn, onClose: clientesClose } = useDisclosure()
    const { isOpen: produtosOpen, onOpen: produtosOn, onClose: produtosClose } = useDisclosure()
    const { isOpen: gerenciarAluguelOpen, onOpen: gerenciarAluguelOn, onClose: gerenciarAluguelClose } = useDisclosure()

    const [isAtrasado, setIsAtrasado] = useState<any>(false)
    console.log(produtos, 'produtos');

    return (
        <Flex flexDirection="column" p="3" justifyContent="flex-start" alignItems="center" w="20rem" h="max" bgColor={theme.background.entradaCard}  border="1.5px solid" borderColor={theme.border.entradaCard} borderRadius="0.5rem">
            <DeleteEntradaModalComponent isOpen={isOpen} onClose={onClose} />
            <GerenciarEntradaAluguelModal isOpen={gerenciarAluguelOpen} onClose={gerenciarAluguelClose} sAtrsado={setIsAtrasado} />
            <ClienteVendaModal isOpen={clientesOpen} onClose={clientesClose} cliente={clienteId} />
            <ProdutosVendaModal isOpen={produtosOpen} onClose={produtosClose} produtos={produtos} />

            <Flex w='100%' bottom="0.5rem" position="relative" justifyContent="space-between">
                {tipoVenda === 'venda' ? (
                    <Text fontWeight={'500'} fontSize={'sm'} textTransform="uppercase">{data}</Text>
                ) : (
                    <Flex gap="1">
                        <Text fontWeight={'500'} fontSize={'sm'} textTransform="uppercase">{data_inicio_aluguel}</Text>
                        <Text fontWeight={'500'} fontSize={'sm'} textTransform="uppercase">{'>'}</Text>
                        <Text fontWeight={'500'} fontSize={'sm'} textTransform="uppercase">{data_fim_aluguel}</Text>
                    </Flex>
                )}
                <Text color={tipoVenda === 'venda' ? 'green.300' : 'orange.300' } fontSize={'1rem'} fontFamily={'body'} fontWeight={500} textTransform="uppercase">({tipoVenda})</Text>
                <Collapse in={isAtrasado && tipoVenda === 'aluguel'}>
                 <Flex w='100%' left="0rem" position="relative">
                     <Flex fontWeight="500" color='red.300' px="2" py="2" border="1.5px solid" borderTop="none" borderColor={theme.border.quantityCard} borderBottomRadius="1rem" bgColor={theme.background.quantityCard}>
                         <Icon as={CiTimer} color={'red.700'} />
                     </Flex>
                 </Flex>
             </Collapse>
            </Flex>
            <Flex gap="5" flexDirection="column" w="90%" justifyContent="flex-start" py="10">
                <Flex flexDirection="row" gap="4" justifyContent="center">
                    <Icon as={HiOutlineUsers} style={{ width: '1.5rem', height: '1.5rem'}} cursor="pointer" _hover={{ color: theme.colors.brown }} transition="0.5s" onClick={clientesOn} />
                    <Icon as={FiBox} style={{ width: '1.5rem', height: '1.5rem'}} cursor="pointer" _hover={{ color: theme.colors.brown }} transition="0.5s" onClick={produtosOn} />
                </Flex>
                <Flex justifyContent="center">
                    <Text fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>R${valor}</Text>
                </Flex>
            </Flex>
            <Flex gap="4" alignItems="center" justifyContent="center">
                    <Link to={`/editar-entrada/:${id}`}>
                        <Button py="1" w="max" h="max" color='white' bgColor={theme.background.editButton} border="1px solid" borderColor={theme.border.editButton} borderRadius="2xl">Editar</Button>
                    </Link>
                    {tipoVenda === 'aluguel' && (
                        <Button bgColor={theme.background.deleteButton} onClick={gerenciarAluguelOn} py="1" w="max" h="max" color={theme.colors.brownWhite} border="1px solid" borderColor={theme.border.deleteButton} borderRadius="2xl">Gerenciar</Button>
                    )}
                    <Button bgColor={theme.background.deleteButton} onClick={onOpen} py="1" w="max" h="max" color={theme.colors.brownWhite} border="1px solid" borderColor={theme.border.deleteButton} borderRadius="2xl">Deletar</Button>

            </Flex>
        </Flex>
    )
}

