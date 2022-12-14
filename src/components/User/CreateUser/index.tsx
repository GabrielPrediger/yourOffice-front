import { Button, Flex, FormControl, Image, Input, Select, Stack, Text } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import SidebarWithHeader from "../../Sidebar";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useForm } from "react-hook-form";
import { useToasty } from "../../Tooltip";
import { useAuth } from "../../../hooks/useAuth";

export default function CreateUserComponent() {

    const theme = usePicasso();
    const { toast } = useToasty();
    const { register, handleSubmit, reset, formState: {isSubmitSuccessful} } = useForm();
    const { token } = useAuth()

    const onSubmitForm = (data: any) => {
        console.log(data, 'user')
        api
        .post("/create-user",{ usuario: data.usuario, senha: data.senha, email: data.email, permissao: data.permissao }, {headers: {
            Authorization: `Bearer ${token}`
         }})
         .then((response: any) => {console.log(response); setToastSuc();})
         .catch((err: Error) => {
            console.log("ops! ocorreu um erro" + setToastError());
        });
    }

    
    useEffect(() => {
        if(isSubmitSuccessful){
            reset({ usuario: "", senha: "", email: "", permissao: ""})
        }
    }, [isSubmitSuccessful, reset])

    const setToastSuc = () => {
            toast({
                id: "toast1",
                position: "top-right",
                status: "success",
                title: "Usuario criado!",
                description: "Vá para a lista de usuario para visualizar!",
            });
    }

    const setToastError = () => {
            toast({
                id: "toast2",
                position: "top-right",
                status: "error",
                title: "Dados ja existentes!",
                description: "Usuario e/ou email já cadastrados!",
            });
    }

    return (
        <SidebarWithHeader>
            <Flex justifyContent="center" alignItems="center">
                <Flex flexDirection="column" gap="10" p="10">
                    <Link to="/usuarios" style={{ width: "max-content" }}>
                        <Flex align="center" gap="2" transition="0.5s" _hover={{ opacity: 0.4 }}>
                            <Image as={FiArrowLeft} size={24} />
                            <Text w="max-content">Voltar</Text>
                        </Flex>
                    </Link>
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <Flex flexDirection="column" gap="2" pb="4">
                            <Text>Usuario</Text>
                            <Input placeholder="Digite aqui um usuario..." _placeholder={{ color: "#A0AEC0"}} w="25rem" h="max" py="2" size={"lg"} type="text" {...register("usuario", { required: true })}  />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Senha</Text>
                            <Input placeholder="Digite aqui uma senha..." _placeholder={{ color: "#A0AEC0"}} w="25rem" h="max" py="2" size={"lg"} type="password" {...register("senha", { required: true })}  />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Email</Text>
                            <Input placeholder="Digite aqui um email..." _placeholder={{ color: "#A0AEC0"}} w="25rem" h="max" py="2" size={"lg"} type="email" {...register("email", { required: true })} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" pb="5">
                            <Text>Permissão</Text>
                            <Stack spacing={3}>
                                <Select variant='outline' placeholder='Escolha uma opção...' {...register("permissao", { required: true })}>
                                    <option value='admin'>Admin</option>
                                    <option value='gerente'>Gerente</option>
                                    <option value='usuario'>Usuario</option>
                                </Select>
                            </Stack>
                        </Flex>
                        <Button 
                            w="100%"
                            type="submit"
                            bgColor={theme.background.criarButton}
                            color={'white'}
                            transition="0.5s"
                            _hover={{
                                opacity: 0.7,
                            }}
                        >
                            Criar
                        </Button>
                    </form>
                </Flex>
            </Flex>
        </SidebarWithHeader>
    )

}
