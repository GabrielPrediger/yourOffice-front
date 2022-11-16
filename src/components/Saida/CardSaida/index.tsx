import {
    Flex, 
    useDisclosure,
    Text,
    Button,

} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import { DeleteSaidaModalComponent } from "../DeleteSaidaModal";


export default function CardSaida() {
    const theme = usePicasso();
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex flexDirection="column" p="3" justifyContent="flex-start" alignItems="center" w="20rem" h="max" bgColor="white"  border="1.5px solid" borderColor={theme.colors.brown} borderRadius="0.5rem">
            <DeleteSaidaModalComponent isOpen={isOpen} onClose={onClose} />
            <Flex w='100%' bottom="0.5rem" position="relative" justifyContent="space-between">
                <Text fontWeight={'500'} fontSize={'sm'} textTransform="uppercase">12/12/2121</Text>
            </Flex>
            <Flex gap="5" flexDirection="column" w="90%" justifyContent="center" alignItems="center" py="10">
            <Flex justifyContent="center">
                    <Text fontSize={'xs'} fontFamily={'body'} fontWeight={400}>Umt exto cdsa cdasd dasd asddddasd  dasda sad dasdf fd a fa sd  fasdfasdfasdf fasdfa</Text>
                </Flex>
                <Flex justifyContent="center">
                    <Text fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>R$ 67,90</Text>
                </Flex>
            </Flex>
            <Flex gap="8" alignItems="center" justifyContent="center">
                    <Link to='/editar-saida'>
                        <Button py="1" w="max" h="max" color='white' bgColor={theme.colors.brown} border="1px solid" borderColor={theme.colors.brown} borderRadius="2xl">Editar</Button>
                    </Link>
                    <Button onClick={onOpen} py="1" w="max" h="max" color={theme.colors.brown} bgColor="white" border="1px solid" borderColor={theme.colors.brown} borderRadius="2xl">Deletar</Button>
                </Flex>
        </Flex>
    )
}

