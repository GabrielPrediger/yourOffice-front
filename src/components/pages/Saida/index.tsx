import { Text, Flex, } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { usePicasso } from '../../../hooks/usePicasso';
import SidebarWithHeader from '../../Sidebar';

const SaidaPage = () => {

    const theme = usePicasso()
    return (
        <SidebarWithHeader>
            <Flex gap="4" justifyContent="center" alignItems="center" h="100%" mt="5rem">
                <Link to="/criar-saida">
                    <Flex w="max-content" h="max-content" bgColor={theme.colors.brown} p="2" borderRadius="0.5rem" alignItems="center">
                        <Text fontSize="lg">Criar Saida</Text>
                    </Flex>
                </Link>
                <Link to="/listar-saidas">
                    <Flex w="max-content" h="max-content" bgColor={theme.colors.brown} p="2" borderRadius="0.5rem" alignItems="center">
                        <Text fontSize="lg">Listar Saida</Text>
                    </Flex>
                </Link>
            </Flex>
        </SidebarWithHeader>
    );
}

export { SaidaPage }