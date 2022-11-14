import { Flex, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import {  AiOutlineCloseSquare } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import SidebarWithHeader from "../../Sidebar";
import { DeleteEntradaModalComponent } from "../DeleteEntradaModal";

export default function ListEntrada() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <SidebarWithHeader>
            <Link to="/entradas" style={{ width: "max-content" }}>
                <Flex align="center" gap="2" my="1rem">
                    <Image as={FiArrowLeft} size={24} />
                    <Text w="max-content">Voltar</Text>
                </Flex>
            </Link>
            <Flex flexDirection="column" bg="#F8F5F2" p="10" h="100%" border="1px solid" w="100%">
                <DeleteEntradaModalComponent isOpen={isOpen} onClose={onClose} />
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Valor</Th>
                                <Th>Descrição</Th>
                                <Th>Data</Th>
                                <Th>Cliente</Th>
                                <Th>Produtos</Th>
                                <Th>Tipo</Th>
                                <Th>Ação</Th>

                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>12.32</Td>
                                <Td>descrição da venda</Td>
                                <Td>12/12/2006</Td>
                                <Td>Gabriel Prediger</Td>
                                <Td>Mesa de madeira alemã</Td>
                                <Td>Venda</Td>
                                <Td>
                                    <Flex gap="2" cursor="pointer">
                                        <Link to="/editar-entrada">
                                            <Image as={BsPencilSquare} size={15} />
                                        </Link>
                                        <Image cursor="pointer" as={AiOutlineCloseSquare} size={15} onClick={onOpen} />
                                    </Flex>
                                </Td>

                            </Tr>
                            <Tr>
                                <Td>12.32</Td>
                                <Td>descrição da venda</Td>
                                <Td>12/12/2006</Td>
                                <Td>Gabriel Prediger</Td>
                                <Td>Mesa de madeira alemã</Td>
                                <Td>Venda</Td>
                                <Td>
                                    <Flex gap="2" cursor="pointer">
                                        <Link to="/editar-entrada">
                                            <Image as={BsPencilSquare} size={15} />
                                        </Link>
                                        <Image cursor="pointer" as={AiOutlineCloseSquare} size={15} onClick={onOpen} />
                                    </Flex>
                                </Td>

                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
        </SidebarWithHeader>
    )
}
