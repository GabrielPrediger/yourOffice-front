import { Button, Flex, Image, Input, Select, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { usePicasso } from "../../../hooks/usePicasso";
import api from "../../../services/api";
import SidebarWithHeader from "../../Sidebar";
import { useToasty } from "../../Tooltip";

interface IUser {
    id: number;
    usuario: string;
    email: string;
    permissao: string;
    senha?: string;
}

const select_options = [{id: 1, value: 'Admin'}, {id: 2, value: 'Gerente'}, {id: 3, value: 'Usuario'}]

export default function EditUserComponent() {

    const [editUser, setEditUser] = useState<IUser>();
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm({defaultValues: editUser});
    const { toast } = useToasty();
    const { token } = useAuth()
    const theme = usePicasso();

    useEffect(() => {
        api
            .get(`/get-user-id/${Number(id)}`, {headers: {
                Authorization: `Bearer ${token}`
             }})
            .then((response) => {setEditUser(response.data); reset(response.data)})
            .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            });
    }, [id, reset, token]);


    const onEditForm = (data: any) => {
        api
            .put(`/update-user/${Number(id)}`, data, {headers: {
                Authorization: `Bearer ${token}`
             }})
             .then((response) => {console.log(response, 'Foi!'); setToast()})
             .catch((err: Error) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    const setToast = () => {
            toast({
                id: "toastEditUser2",
                position: "top-right",
                status: "success",
                title: "Dados editados!",
                description: "As informações foram alteradas com sucesso!",
            });
    }


    return (
        <SidebarWithHeader>
            <Flex justifyContent="center" alignItems="center">
                <Flex flexDirection="column" gap="10" p="10" >
                    <Link to="/listar-usuario" style={{ width: "max-content" }}>
                        <Flex align="center" gap="2" transition="0.5s" _hover={{ opacity: 0.4 }}>
                            <Image as={FiArrowLeft} size={24} />
                            <Text w="max-content">Voltar</Text>
                        </Flex>
                    </Link>
                    <form onSubmit={handleSubmit(onEditForm)}>
                        <Flex flexDirection="column" gap="2" py="2">
                            <Text>Usuario</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} defaultValue={editUser?.usuario} {...register("usuario")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" py="2">
                            <Text>Senha</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} defaultValue='' type="password" {...register("senha")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" py="2">
                            <Text>Email</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} defaultValue={editUser?.email} {...register("email")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" py="2">
                            <Text>Permissão</Text>
                            <Stack spacing={3}>
                                <Select variant='outline' placeholder='Escolha uma opção...' defaultValue={editUser?.permissao} {...register("permissao")}>
                                    {select_options.map(options =>
                                       <option key={options.id} value={options.value} selected={options.value.toLowerCase() === editUser?.permissao} color="black">{options.value}</option>
                                    )}
                                </Select>
                            </Stack>
                        </Flex>
                        <Button 
                            bgColor={theme.background.criarButton}
                            color={'white'}
                            type="submit"
                            transition="0.5s"
                            _hover={{
                                opacity: 0.7,
                            }}
                        >
                            Salvar
                        </Button>
                    </form>
                </Flex>
            </Flex>
        </SidebarWithHeader>
    )
}
