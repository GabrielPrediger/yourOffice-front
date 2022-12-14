import {
    Box,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    Flex,
    Tag,
    useColorModeValue,
    Img,
  } from '@chakra-ui/react';
  import { ReactNode } from 'react';

  
  const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
      <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
        {children}
      </Text>
    );
  };
  
  export default function LandingFooter() {
    return (
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
        mt="8rem"
        >
        <Container alignItems="center" as={Stack} maxW={'6xl'} py={10}>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
            <Stack align={'flex-start'}>
              <ListHeader>Produto</ListHeader>
              <Link href={'#'}>Overview</Link>
              <Stack direction={'row'} align={'center'} spacing={2}>
                <Link href={'#'}>Projetos</Link>
                <Tag
                  size={'sm'}
                  bg={useColorModeValue('green.300', 'green.800')}
                  ml={2}
                  color={'white'}>
                  New
                </Tag>
              </Stack>
              <Link href={'#'}>Doc</Link>
              <Link href={'#'}>Preço</Link>
              <Link href={'#'}>Lançamentos</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Empresa</ListHeader>
              <Link href={'#'}>Sobre nós</Link>
              <Link href={'#'}>Trabalhe com nós</Link>
              <Link href={'#'}>Contate-nos</Link>
              <Link href={'#'}>Parceiros</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Legal</ListHeader>
              <Link href={'#'}>Politica de Cookies</Link>
              <Link href={'#'}>Politica de privacidade</Link>
              <Link href={'#'}>Termos de serviços</Link>
              <Link href={'#'}>Status</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Social</ListHeader>
              <Link href={'#'}>Facebook</Link>
              <Link href={'#'}>Twitter</Link>
              <Link href={'#'}>Youtube</Link>
              <Link href={'#'}>Instagram</Link>
              <Link href={'#'}>LinkedIn</Link>
            </Stack>
          </SimpleGrid>
        </Container>
        <Box py={10}>
          <Flex
            align={'center'}
            _before={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              mr: 8,
            }}
            _after={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              ml: 8,
            }}>
              <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">yourOffice</Text>
          </Flex>
          <Text pt={6} fontSize={'sm'} textAlign={'center'}>
            © 2022 yourOffice. All rights reserved
          </Text>
        </Box>
      </Box>
    );
  }