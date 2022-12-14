import React, { ReactNode } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiBox
} from 'react-icons/fi';
import {
  AiOutlineUser
} from 'react-icons/ai';
import {
  HiOutlineUsers
} from 'react-icons/hi';
import {
  BsSortDown,
  BsSortUp,
  BsSun
} from 'react-icons/bs';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useUserLogged } from '../../hooks/useUserLogged';
import { useAuth } from '../../hooks/useAuth';
import { MdNightlightRound } from 'react-icons/md';
import { usePicasso } from '../../hooks/usePicasso';
import { authRoutes } from '../../routes';

interface LinkItemProps {
  name: string;
  icon: IconType;
  link?: any;
  relatedLinks?: string[];
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, link: '/inicio' },
  // { name: 'Graficos', icon: FiTrendingUp, link: '/charts' },
  { name: 'Entradas', icon: BsSortUp, link: '/entradas', relatedLinks: ['/criar-entrada', '/listar-entradas', '/editar-entrada'] },
  { name: 'Despesas', icon: BsSortDown, link: '/saidas', relatedLinks: ['/criar-saida', '/listar-saidas', '/editar-saida'] },
  { name: 'Produtos', icon: FiBox, link: '/produtos', relatedLinks: ['/criar-produto', '/listar-produtos', '/editar-produto'] },
  { name: 'Clientes', icon: HiOutlineUsers, link: '/clientes', relatedLinks: ['/criar-cliente', '/listar-cliente', '/editar-cliente'] },
  { name: 'Usuarios', icon: AiOutlineUser, link: '/usuarios', relatedLinks: ['/criar-usuario', '/listar-usuario', '/editar-usuario'] },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* Sidebar */}
      <Sidebar onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {

  const { isOpen, onToggle } = useDisclosure()
  const navigate = useNavigate()
  const theme = usePicasso()

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text transition={"0.5s"} _hover={{ color: theme.colors.brown}} cursor={"pointer"} fontSize="2xl" fontFamily="monospace" fontWeight="bold" onClick={() => navigate('/inicio')}>
          yourOffice
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link.link} onClick={onToggle} relatedLinks={link?.relatedLinks as string[]}>
          {link.name}
        </NavItem>
      ))}

    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  link: any;
  relatedLinks: string[];
  children: ReactText;
}
const NavItem = ({ icon, link, relatedLinks, children, ...rest }: NavItemProps) => {
  const theme = usePicasso()
  const {pathname} = useLocation()

  const pathnameThreatedSlashed = pathname.substring(
    pathname.indexOf('/'),
    pathname.lastIndexOf('/')
  )

  const validatePathCountOfSlash = pathname.split('/').length - 1

  const bgColorValidation = validatePathCountOfSlash === 2 ? relatedLinks?.includes(pathnameThreatedSlashed) : relatedLinks?.includes(pathname)

  return (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        my="1"
        colo
        bgColor={(bgColorValidation || pathname === link) ? theme.background.navItem : 'transparent'}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        transition="0.3s"
        fontWeight={(bgColorValidation || pathname === link) ? '600' : '400'}
        color={theme.colors.blackWhite}
        _hover={{
          bg: theme.background.navItem,
          color: 'white'
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const Sidebar = ({ onOpen, ...rest }: MobileProps) => {

  const { logged, handleDisconnect } = useUserLogged()
  const str = logged
  const nome = str?.charAt(0).toUpperCase() + str?.slice(1);
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = usePicasso()
  const navigate = useNavigate()

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={theme.background.siderBar}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
        <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          onClick={() => navigate('/inicio')}
        >
          yourOffice
        </Text>
      <HStack spacing={{ base: '0', md: '6' }}>
        <Button onClick={toggleColorMode} bg="transparent" _hover={{ opacity: 0.9}} color='white'>
            {colorMode === 'light' ? <MdNightlightRound size={24} /> : <BsSun size={24} />}
        </Button>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    ''
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{nome}</Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            > 
              <Link to='/' onClick={() => handleDisconnect()}>
                <MenuItem>Sign out</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};