import {
    Flex, 
    useDisclosure,
    Text,
    Button,

} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import { DeleteSaidaModalComponent } from "../DeleteSaidaModal";

interface ISaidas {
    id: number;
    valor: number;
    data: string;
    descricao: string;
}

export const CardSaida: React.FC<ISaidas> = props => {

    const { id, valor, data, descricao } = props;
    const theme = usePicasso();
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex flexDirection="column" p="3" justifyContent="flex-start" alignItems="center" w="20rem" h="max" bgColor={theme.background.saidaCard}  border="1.5px solid" borderColor={theme.border.saidaCard} borderRadius="0.5rem">
            <DeleteSaidaModalComponent isOpen={isOpen} onClose={onClose} id={id} />
            <Flex w='100%' bottom="0.5rem" position="relative" justifyContent="space-between">
                <Text fontWeight={'500'} fontSize={'sm'} textTransform="uppercase">{data}</Text>
            </Flex>
            <Flex gap="5" flexDirection="column" w="90%" justifyContent="center" alignItems="center" py="10">
            <Flex justifyContent="center">
                    <Text fontSize={'xs'} fontFamily={'body'} fontWeight={400}>{descricao}</Text>
                </Flex>
                <Flex justifyContent="center">
                    <Text fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>R$ {valor}</Text>
                </Flex>
            </Flex>
            <Flex gap="8" alignItems="center" justifyContent="center">
                    <Link to={`/editar-saida/${id}`}>
                        <Button py="1" w="max" h="max" color='white' bgColor={theme.background.editButton} border="1px solid" borderColor={theme.border.editButton} borderRadius="2xl">Editar</Button>
                    </Link>
                    <Button onClick={onOpen} py="1" w="max" h="max" color={theme.colors.brownWhite} bgColor={theme.background.deleteButton} border="1px solid" borderColor={theme.border.deleteButton} borderRadius="2xl">Deletar</Button>
                </Flex>
        </Flex>
    )
}

