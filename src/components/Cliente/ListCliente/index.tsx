import { Flex, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import {  AiOutlineCloseSquare } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import SidebarWithHeader from "../../Sidebar";
import { DeleteClienteModalComponent } from "../DeleteClienteModal";

export default function ListCliente() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <SidebarWithHeader>
            <Link to="/clientes" style={{ width: "max-content" }}>
                <Flex align="center" gap="2" my="1rem">
                    <Image as={FiArrowLeft} size={24} />
                    <Text w="max-content">Voltar</Text>
                </Flex>
            </Link>
            <Flex flexDirection="column" bg="#F8F5F2" p="10" h="100%" border="1px solid" w="100%">
                <DeleteClienteModalComponent isOpen={isOpen} onClose={onClose} />
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Nome</Th>
                                <Th>Data de nascimento</Th>
                                <Th>CPF/CNPJ</Th>
                                <Th>RG</Th>
                                <Th>Endereço</Th>
                                <Th>Ação</Th>

                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Gabriel Prediger</Td>
                                <Td>26/01/2000</Td>
                                <Td>028.604.123-12</Td>
                                <Td>12312312313</Td>
                                <Td>Porto Alegre, Rua Albion 268, Ap 602</Td>
                                <Td>
                                    <Flex gap="2" cursor="pointer">
                                        <Link to="/editar-cliente">
                                            <Image as={BsPencilSquare} size={15} />
                                        </Link>
                                        <Image cursor="pointer" as={AiOutlineCloseSquare} size={15} onClick={onOpen} />
                                    </Flex>
                                </Td>

                            </Tr>
                            <Tr>
                                <Td>Gabriel Prediger</Td>
                                <Td>26/01/2000</Td>
                                <Td>028.604.123-12</Td>
                                <Td>12312312313</Td>
                                <Td>Porto Alegre, Rua Albion 268, Ap 602</Td>
                                <Td>
                                    <Flex gap="2" cursor="pointer">
                                        <Link to="/editar-cliente">
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
