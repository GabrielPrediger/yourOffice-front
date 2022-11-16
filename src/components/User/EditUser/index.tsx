import { Button, Flex, Image, Input, Select, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import api from "../../../services/api";
import SidebarWithHeader from "../../Sidebar";

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
    const { register, handleSubmit } = useForm({defaultValues: editUser});

    useEffect(() => {
        api
            .get(`/get-user-id/${Number(id)}`)
            .then((response) => setEditUser(response.data))
            .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
            });
    }, [id]);


    const onEditForm = (data: any) => {
        api
            .put(`/update-user/${Number(id)}`, data)
            .then((response) => console.log(response, 'Foi!'))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    return (
        <SidebarWithHeader>
            <Flex justifyContent="center" alignItems="center">
                <Flex flexDirection="column" gap="10" p="10" >
                    <Link to="/listar-usuario" style={{ width: "max-content" }}>
                        <Flex align="center" gap="2">
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
                            <Input w="25rem" h="max" py="2" size={"lg"} defaultValue={editUser?.senha} {...register("senha")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" py="2">
                            <Text>Email</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} defaultValue={editUser?.email} {...register("email")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2" py="2">
                            <Text>Permissão</Text>
                            <Stack spacing={3}>
                                <Select variant='outline' placeholder='Escolha uma opção...' {...register("permissao")}>
                                    {select_options.map(options =>
                                       <option key={options.id} value={options.value} selected={options.value.toLowerCase() === editUser?.permissao} color="black">{options.value}</option>
                                    )}
                                </Select>
                            </Stack>
                        </Flex>
                        <Button bg={'#dfbda1'}
                            color={'white'}
                            type="submit"
                            mt="2"
                            _hover={{
                                bg: '#dfbda1',
                                opacity: 0.5
                            }}>Salvar</Button>
                    </form>
                </Flex>
            </Flex>
        </SidebarWithHeader>
    )
}
