import { ReactNode } from 'react';
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { usePicasso } from '../../../hooks/usePicasso';

function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}>
      {children}
    </Box>
  );
}

export default function Price() {

    const theme = usePicasso()

  return (
    <Box pt='12rem'>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
         Nosso planos
        </Heading>
        <Text fontSize="lg" color={'gray.500'}>
          Teste por 7 dias de graça, e comece a pagar somente depois do prazo.
        </Text>
      </VStack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}>
        <PriceWrapper>
          <Box py={4} px={12} w="20rem">
            <Text fontWeight="500" fontSize="2xl">
              Simples
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                R$
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                99
              </Text>
              <Text fontSize="3xl" color="gray.500">
                /mês
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}>
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Suporte 12h/5
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                100GB de armazenamento
              </ListItem>      
            </List>
            <Box w="80%" pt={7}>
              <Button w="full"  borderColor={theme.border.priceCardButton} variant="outline">
                Começar
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>

        <PriceWrapper>
          <Box position="relative" w="20rem">
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: 'translate(-50%)' }}>
              <Text
                textTransform="uppercase"
                bg={theme.background.priceCardButton}                
                px={3}
                py={1}
                color={useColorModeValue('gray.900', 'gray.300')}
                fontSize="sm"
                fontWeight="600"
                rounded="xl">
                Mais popular
              </Text>
            </Box>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Growth
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  R$
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  199
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  /mês
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}>
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Suporte 24/7 
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  1TB de dados
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
                <Button w="full" bg={theme.background.priceCardButton}>
                  Começar
                </Button>
              </Box>
            </VStack>
          </Box>
        </PriceWrapper>
        <PriceWrapper>
          <Box py={4} px={12} w="20rem">
            <Text fontWeight="500" fontSize="2xl">
              Completo
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                R$
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                499
              </Text>
              <Text fontSize="3xl" color="gray.500">
                /month
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}>
            <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Suporte 24/7 
                </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Modifique o seu app
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                5TB de armazenamento
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
            <Button w="full"  borderColor={theme.border.priceCardButton} variant="outline">
                Começar
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>
      </Stack>
    </Box>
  );
}