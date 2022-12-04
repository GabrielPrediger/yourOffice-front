import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Img,
  Image,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MdNightlightRound } from 'react-icons/md';
import { BsSun } from 'react-icons/bs';
import { usePicasso } from '../../../hooks/usePicasso';


const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate()
  const theme = usePicasso();

  return (
    <>
      <Box boxShadow={theme.boxShadow.header} w="100vw" zIndex="999" bg={useColorModeValue('linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)', 'gray.900')} px={8} position="fixed">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Flex gap="5">
            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">yourOffice</Text>
          </Flex>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode} bg="transparent" _hover={{ background: 'transparent', opacity: 0.9}} color='white'>
                {colorMode === 'light' ? <MdNightlightRound size={24} /> : <BsSun size={24} />}
              </Button>

              <Button 
                bg={'#dfbda1'}
                color={'white'}
                _hover={{
                    bg: '#e2d1c3',
                    opacity: 0.5
                }} onClick={() => navigate('/entrar')}>
                Log in
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}