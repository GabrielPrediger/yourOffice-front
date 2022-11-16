import { Button, Flex, FormControl, Image, Input, Select, Stack, Text } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import SidebarWithHeader from "../../Sidebar";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useForm } from "react-hook-form";

export default function CreateUserComponent() {

    const theme = usePicasso();
    const { register, handleSubmit } = useForm();

    const onSubmitForm = (data: any) => {
        api
        .post("/create-user", { usuario: data.usuario, senha: data.senha, email: data.email, permissao: data.permissao })
        .then((response: any) => console.log(response))
        .catch((err: any) => {
        console.error("ops! ocorreu um erro" + err);
        });
    }

    return (
        <SidebarWithHeader>
            <Flex justifyContent="center" alignItems="center">
                <Flex flexDirection="column" gap="10" p="10">
                    <Link to="/usuarios" style={{ width: "max-content" }}>
                        <Flex align="center" gap="2">
                            <Image as={FiArrowLeft} size={24} />
                            <Text w="max-content">Voltar</Text>
                        </Flex>
                    </Link>
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <Flex flexDirection="column" gap="2" pb="4">
                            <Text>Usuario</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="text" {...register("usuario")}  />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Senha</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="password" {...register("senha")}  />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Email</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="email" {...register("email")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Permissão</Text>
                            <Stack spacing={3}>
                                <Select variant='outline' placeholder='Escolha uma opção...' {...register("permissao")}>
                                    <option value='admin'>Admin</option>
                                    <option value='gerente'>Gerente</option>
                                    <option value='usuario'>Usuario</option>
                                </Select>
                            </Stack>
                        </Flex>
                        <Button 
                            bg={'#dfbda1'}
                            type="submit"
                            color={'white'}
                            _hover={{
                                bg: '#dfbda1',
                                opacity: 0.5
                            }}>
                            Criar
                        </Button>
                    </form>
                </Flex>
            </Flex>
        </SidebarWithHeader>
    )

}
