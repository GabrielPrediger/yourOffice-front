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
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { usePicasso } from '../../../hooks/usePicasso'
import { useUserLogged } from '../../../hooks/useUserLogged';
import api from '../../../services/api';


const LoginComponent = () => {

  const theme = usePicasso();
  const { register, handleSubmit } = useForm();
  const { setToken, setRefreshToken } = useAuth()
  const { setLogged } = useUserLogged()
  const navigate = useNavigate()

  const onSubmitForm = (data: any) => {
    setLogged(data.usuario)
    api
        .post("/login", { usuario: data.usuario, senha: data.senha })
        .then((response: any) => {setToken(response.data.token); setRefreshToken(response.data.refreshToken); navigate('/inicio');})
        .catch((err: any) => {
            console.error("ops! ocorreu um erro" + setLogged(''));
        });
  }

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
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Usuario</FormLabel>
                <Input w="20rem" h="max" py="2" size={"lg"} type="text" {...register("usuario")} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Senha</FormLabel>
                <Input w="20rem" h="max" py="2" size={"lg"} type="password" {...register("senha")} />
              </FormControl>
              <Stack spacing={10} pt={'2'}>
                <Button
                  bg={'#dfbda1'}
                  color={'white'}
                  type="submit"
                  _hover={{
                    bg: '#e2d1c3',
                    opacity: 0.5
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export { LoginComponent };
