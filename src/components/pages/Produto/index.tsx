import { Text, Flex, } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { usePicasso } from '../../../hooks/usePicasso';
import SidebarWithHeader from '../../Sidebar';

const ProdutoPage = () => {

    const theme = usePicasso()
    return (
        <SidebarWithHeader>
            <Flex gap="4" justifyContent="center" alignItems="center" h="100%" mt="5rem">
                <Link to="/criar-produto">
                    <Flex w="max-content" h="max-content" bgColor={theme.colors.brown} p="2" borderRadius="0.5rem" alignItems="center">
                        <Text fontSize="lg">Criar Produto</Text>
                    </Flex>
                </Link>
                <Link to="/listar-produtos">
                    <Flex w="max-content" h="max-content" bgColor={theme.colors.brown} p="2" borderRadius="0.5rem" alignItems="center">
                        <Text fontSize="lg">Listar Produto</Text>
                    </Flex>
                </Link>
            </Flex>
        </SidebarWithHeader>
    );
}

export { ProdutoPage }