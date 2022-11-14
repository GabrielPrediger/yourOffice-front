import {
    Flex, Image, useDisclosure,
    Text,
    Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import { DeleteProdutoModalComponent } from "../DeleteProdutoModal";

export default function CardProduto() {
    const theme = usePicasso();
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex flexDirection="column" justifyContent="flex-start" alignItems="center" w="20rem" h="32rem" bgColor="white"  border="1.5px solid" borderColor={theme.colors.brown} borderRadius="0.5rem">
            <DeleteProdutoModalComponent isOpen={isOpen} onClose={onClose} />
            <Flex w='100%' left="16rem" position="relative">
                <Flex fontWeight="500" color={theme.colors.brown} px="2" py="1" border="1.5px solid" borderTop="none" borderColor={theme.colors.brown} borderBottomRadius="1rem" bgColor="white">23</Flex>
            </Flex>
            <Flex flexDirection="column" w="max" px="5" py="5"  >
                <Image objectFit={'cover'} w="18rem" h="14rem" rounded={'lg'} src="https://abracasa.vteximg.com.br/arquivos/ids/180932-400-400/mesa-frente.jpg?v=637891859730970000" />
            </Flex>
            <Flex gap="2" flexDirection="column" w="90%" justifyContent="center" alignItems="center">
                <Text color={'gray.500'} fontSize={'sm'} textTransform="uppercase">Mesa de centro - Madeira-madeira</Text>
                <Text fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>Mesa de madeira italiana</Text>
                <Text fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>R$ 67,90</Text>
                <Text color={'gray.500'} fontSize={'xs'} fontFamily={'body'} fontWeight={500}>(venda)</Text>
                <Flex gap="8" pt="4">
                    <Link to='/editar-produto'>
                        <Button py="1" w="max" h="max" color='white' bgColor={theme.colors.brown} border="1px solid" borderColor={theme.colors.brown} borderRadius="2xl">Editar</Button>
                    </Link>
                    <Button onClick={onOpen} py="1" w="max" h="max" color={theme.colors.brown} bgColor="white" border="1px solid" borderColor={theme.colors.brown} borderRadius="2xl">Deletar</Button>
                </Flex>
            </Flex>
        </Flex>
    )
}

