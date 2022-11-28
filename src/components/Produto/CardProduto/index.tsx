import {
    Flex, Image, useDisclosure,
    Text,
    Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import { DeleteProdutoModalComponent } from "../DeleteProdutoModal";

interface IProduct {
    id: number;
    nome: string;
    descricao: string;
    quantidade: number;
    tipo: string; //alugar ou vender
    foto?: string;
    preco: number;
}

export const CardProduto: React.FC<IProduct> = props => {

    const {id, nome, descricao, quantidade, tipo, foto, preco} = props;
    const theme = usePicasso();
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex flexDirection="column" justifyContent="flex-start" alignItems="center" w="20rem" h="32rem" bgColor="white"  border="1.5px solid" borderColor={theme.colors.brown} borderRadius="0.5rem">
            <DeleteProdutoModalComponent isOpen={isOpen} onClose={onClose} id={id} />
            <Flex w='100%' left="16rem" position="relative">
                <Flex fontWeight="500" color={theme.colors.brown} px="2" py="1" border="1.5px solid" borderTop="none" borderColor={theme.colors.brown} borderBottomRadius="1rem" bgColor="white">{quantidade}</Flex>
            </Flex>
            <Flex flexDirection="column" w="max" px="5" py="5"  >
                <Image objectFit={'cover'} w="18rem" h="14rem" rounded={'lg'} src={foto} />
            </Flex>
            <Flex gap="2" flexDirection="column" w="90%" justifyContent="center" alignItems="center">
                <Text color={'gray.500'} fontSize={'sm'} textTransform="uppercase">{nome}</Text>
                <Text fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>{descricao}</Text>
                <Text fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>R$ {preco}</Text>
                <Text color={'gray.500'} fontSize={'xs'} fontFamily={'body'} fontWeight={500}>({tipo})</Text>
                <Flex gap="8" pt="4">
                    <Link to={`/editar-produto/${id}`}>
                        <Button py="1" w="max" h="max" color='white' bgColor={theme.colors.brown} border="1px solid" borderColor={theme.colors.brown} borderRadius="2xl">Editar</Button>
                    </Link>
                    <Button onClick={onOpen} py="1" w="max" h="max" color={theme.colors.brown} bgColor="white" border="1px solid" borderColor={theme.colors.brown} borderRadius="2xl">Deletar</Button>
                </Flex>
            </Flex>
        </Flex>
    )
}

