import { Text, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { usePicasso } from '../../../hooks/usePicasso';
import SidebarWithHeader from '../../Sidebar';


const EntradaPage = () => {

    const theme = usePicasso()
    return (
        <SidebarWithHeader>
            <Flex gap="4" justifyContent="center" alignItems="center" h="100%" mt="5rem">
                <Link to="/criar-entrada">
                    <Flex w="max-content" h="max-content" bg={theme.background.crudsButton} p="2" borderRadius="0.5rem" alignItems="center" transition="0.5s" _hover={{ opacity: 0.5 }}>
                        <Text fontSize="lg">Criar Entrada</Text>
                    </Flex>
                </Link>
                <Link to="/listar-entradas">
                    <Flex w="max-content" h="max-content" bg={theme.background.crudsButton} p="2" borderRadius="0.5rem" alignItems="center" transition="0.5s" _hover={{ opacity: 0.5 }}>
                        <Text fontSize="lg">Listar Entrada</Text>
                    </Flex>
                </Link>
            </Flex>
        </SidebarWithHeader>
    );
}

export { EntradaPage }