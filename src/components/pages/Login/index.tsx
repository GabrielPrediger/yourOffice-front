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
  useColorMode,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { BsSun } from 'react-icons/bs';
import { MdNightlightRound } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { usePicasso } from '../../../hooks/usePicasso'
import { useUserLogged } from '../../../hooks/useUserLogged';
import api from '../../../services/api';
import { useToasty } from '../../Tooltip';


const LoginComponent = () => {

  const theme = usePicasso();
  const { register, handleSubmit } = useForm();
  const { setToken, setRefreshToken } = useAuth()
  const { setLogged } = useUserLogged()
  const navigate = useNavigate()
  const { colorMode, toggleColorMode } = useColorMode();
  const { toast } = useToasty();

  const onSubmitForm = (data: any) => {
    setLogged(data.usuario)
    api
        .post("/login", { usuario: data.usuario, senha: data.senha })
        .then((response: any) => {console.log(response.data.refreshToken);setToken(response.data.token); setRefreshToken(response.data.refreshToken); navigate('/inicio');})
        .catch((err: any) => {
            console.error("ops! ocorreu um erro" + setLogged(''));
            setToastError();
        });
  }

const setToastError = () => {
    toast({
        id: "toastDeleteEntrada",
        position: "top-right",
        status: "error",
        title: "Erro ao efetuar o login!",
        description: "Usuario ou senha estão errados.",
    });
}
  
  return (
    <Flex
      minW={'max'}
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={theme.background.login}
    >
      <Stack align={'center'} justify={'center'} spacing={8} py={12}>
        <Button w="25%" onClick={toggleColorMode} _hover={{  opacity: 0.5 }} bg={'transparent'} color={theme.colors.blackWhite}>
            {colorMode === 'light' ? <MdNightlightRound size={24} /> : <BsSun size={24} />}
        </Button>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          py={'16'}
          px={['22','22','10','10']}
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
                  bg={theme.background.loginButton}
                  color={'white'}
                  type="submit"
                  transition="0.5s"
                  _hover={{
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
