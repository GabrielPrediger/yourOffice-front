import {
    Flex, 
    useDisclosure,
    Text,
    Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import { useUserLogged } from "../../../hooks/useUserLogged";
import { DeleteUserModalComponent } from "../DeleteUserModal";

interface IUser {
    id: number;
    usuario: string;
    senha: string;
    email: string;
    permissao: string;
}

export const CardUser: React.FC<IUser> = props => {
    
    const theme = usePicasso();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { id, usuario, senha, email, permissao } = props
    const { logged } = useUserLogged()
    const str = permissao
    const nomePermissao = str?.charAt(0).toUpperCase() + str?.slice(1);
    return (
        <Flex flexDirection="column" alignItems="center" p="4" w="20rem" h="18rem" bgColor={theme.background.userCard} border="1.5px solid" borderColor={theme.border.userCard} borderRadius="0.5rem">
            <DeleteUserModalComponent isOpen={isOpen} onClose={onClose} id={id} />
            <Flex w='100%' left="13rem" bottom="1rem" position="relative">
                <Flex fontWeight="500" color={theme.colors.brownWhite} px="2" py="1" border="1.5px solid" borderTop="none" borderColor={theme.border.typeCard} borderBottomRadius="1rem" bgColor='transparent'>{nomePermissao}</Flex>
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
                <Flex gap="2" justifyContent="space-between" >
                    <Text fontWeight={500} fontSize={'sm'} textTransform="uppercase">Email:</Text>
                    <Text color={'gray.500'} fontSize={'sm'} overflow="hidden">{email}</Text>
                </Flex>
            </Flex>
            <Flex gap="8" pt="4">
                <Link to={`/editar-usuario/${id}`}>
                    <Button py="1" w="max" h="max" color='white' bgColor={theme.background.editButton} border="1px solid" borderColor={theme.border.editButton} borderRadius="2xl">Editar</Button>
                </Link>
                <Button onClick={onOpen} py="1" w="max" h="max" color={theme.colors.brownWhite} bgColor={theme.background.deleteButton} border="1px solid" borderColor={theme.border.deleteButton} borderRadius="2xl">Deletar</Button>
            </Flex>
        </Flex>
    )
}

