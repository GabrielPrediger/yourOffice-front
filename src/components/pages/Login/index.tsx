import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { usePicasso } from '../../../hooks/usePicasso'


const LoginComponent = () => {

  const theme = usePicasso();

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={"linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)"}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          py={'16'}
          px={'10'}
        >
          <Flex pb="10">
            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
              yourOffice
            </Text>
          </Flex>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Usuario</FormLabel>
              <Input w="20rem" h="max" py="2" size={"lg"} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input w="20rem" h="max" py="2" size={"lg"} type="password" />
            </FormControl>
            <Stack spacing={10} pt={'2'}>
              <Button
                bg={'#dfbda1'}
                color={'white'}
                _hover={{
                  bg: '#e2d1c3',
                  opacity: 0.5
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export { LoginComponent };
