import { Text, Flex, } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { usePicasso } from '../../../hooks/usePicasso';
import SidebarWithHeader from '../../Sidebar';

const ProdutoPage = () => {

    const theme = usePicasso()
    return (
        <SidebarWithHeader>
            <Flex flexDir="column" justifyContent="center" alignItems="center" gap="4"  h="100%" mt="5rem">
                <Text fontSize="2xl" fontFamily="heading">Escolha uma opção</Text>
                <Flex gap="4" justifyContent="center" alignItems="center">
                <Link to="/criar-produto">
                    <Flex w="max-content" h="max-content" bg={theme.background.crudsButton} p="2" borderRadius="0.5rem" alignItems="center" transition="0.5s" _hover={{ opacity: 0.5 }}>
                        <Text fontSize="lg">Criar Produto</Text>
                    </Flex>
                </Link>
                <Link to="/listar-produtos">
                    <Flex w="max-content" h="max-content" bg={theme.background.crudsButton} p="2" borderRadius="0.5rem" alignItems="center" transition="0.5s" _hover={{ opacity: 0.5 }}>
                        <Text fontSize="lg">Listar Produto</Text>
                    </Flex>
                </Link>
                </Flex>
            </Flex>
        </SidebarWithHeader>
    );
}

export { ProdutoPage }