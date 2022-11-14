import { Flex, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import {  AiOutlineCloseSquare } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import SidebarWithHeader from "../../Sidebar";
import { DeleteUserModalComponent } from "../DeleteUserModal";

export default function ListUser() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <SidebarWithHeader>
            <Link to="/usuario" style={{ width: "max-content" }}>
                <Flex align="center" gap="2" my="1rem">
                    <Image as={FiArrowLeft} size={24} />
                    <Text w="max-content">Voltar</Text>
                </Flex>
            </Link>
            <Flex flexDirection="column" bg="#F8F5F2" p="10" h="100%" border="1px solid" w="100%">
                <DeleteUserModalComponent isOpen={isOpen} onClose={onClose} />
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Usuario</Th>
                                <Th>Senha</Th>
                                <Th>Email</Th>
                                <Th>Permissão</Th>
                                <Th>Ação</Th>

                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Gabriel Prediger</Td>
                                <Td>********</Td>
                                <Td>gabrielprediger046@gmail.com</Td>
                                <Td>Admin</Td>
                                <Td>
                                    <Flex gap="2" cursor="pointer">
                                        <Link to="/editar-usuario">
                                            <Image as={BsPencilSquare} size={15} />
                                        </Link>
                                        <Image cursor="pointer" as={AiOutlineCloseSquare} size={15} onClick={onOpen} />
                                    </Flex>
                                </Td>

                            </Tr>
                            <Tr>
                                <Td>Gabriel Prediger</Td>
                                <Td>********</Td>
                                <Td>gabrielprediger046@gmail.com</Td>
                                <Td>Admin</Td>
                                <Td>
                                    <Flex gap="2">
                                        <Image as={BsPencilSquare} size={15} />
                                        <Image as={AiOutlineCloseSquare} size={15} />
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
