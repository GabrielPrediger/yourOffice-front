import {
    Flex, Image, useDisclosure,
    Text,
    Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import { DeleteUserModalComponent } from "../DeleteUserModal";
import { useEffect, useState } from "react";
import api from "../../../services/api";

interface IUser {
    usuario: string;
    senha: string;
    email: string;
    permissao: string;
}

export const CardUser: React.FC<IUser> = props => {
    
    const theme = usePicasso();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {usuario, senha, email, permissao} = props

    return (
        <Flex flexDirection="column" alignItems="center" p="4" w="20rem" h="max" bgColor="white"  border="1.5px solid" borderColor={theme.colors.brown} borderRadius="0.5rem">
            <DeleteUserModalComponent isOpen={isOpen} onClose={onClose} />
            <Flex w='100%' left="13rem" bottom="1rem" position="relative">
                <Flex fontWeight="500" color={theme.colors.brown} px="2" py="1" border="1.5px solid" borderTop="none" borderColor={theme.colors.brown} borderBottomRadius="1rem" bgColor="white">{permissao}</Flex>
            </Flex>
            <Flex gap="2" flexDirection="column" w="100%" justifyContent="flex-start" px="4" my="10">
                <Flex gap="2" justifyContent="space-between">
                    <Text fontWeight={500} fontSize={'sm'} textTransform="uppercase">Usuario:</Text>
                    <Text color={'gray.500'} fontSize={'sm'}>{usuario}</Text>
                </Flex>
                <Flex gap="2" justifyContent="space-between">
                    <Text fontWeight={500} fontSize={'sm'} textTransform="uppercase">Senha:</Text>
                    <Text color={'gray.500'} fontSize={'sm'}>*********</Text>
                </Flex>
                <Flex gap="2" justifyContent="space-between" flexWrap="wrap">
                    <Text fontWeight={500} fontSize={'sm'} textTransform="uppercase">Email:</Text>
                    <Text color={'gray.500'} fontSize={'sm'}>{email}</Text>
                </Flex>
            </Flex>
            <Flex gap="8" pt="4">
                    <Link to='/editar-usuario'>
                        <Button py="1" w="max" h="max" color='white' bgColor={theme.colors.brown} border="1px solid" borderColor={theme.colors.brown} borderRadius="2xl">Editar</Button>
                    </Link>
                    <Button onClick={onOpen} py="1" w="max" h="max" color={theme.colors.brown} bgColor="white" border="1px solid" borderColor={theme.colors.brown} borderRadius="2xl">Deletar</Button>
                </Flex>
        </Flex>
    )
}

