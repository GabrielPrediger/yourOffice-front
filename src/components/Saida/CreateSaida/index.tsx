import { Button, Flex, Image, Input, Select, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import api from "../../../services/api";
import SidebarWithHeader from "../../Sidebar";

export default function CreateSaidaComponent() {

    const theme = usePicasso();

    const { register, handleSubmit } = useForm();

    const onSubmitForm = (data: any) => {
        api
            .post("/create-saida", { valor: data.valor, data: data.data, descricao: data.descricao })
            .then((response: any) => console.log(response))
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    return (
        <SidebarWithHeader>
            <Flex justifyContent="center" alignItems="center">
                <Flex flexDirection="column" gap="10" p="10">
                    <Link to="/saidas" style={{ width: "max-content" }}>
                        <Flex align="center" gap="2">
                            <Image as={FiArrowLeft} size={24} />
                            <Text w="max-content">Voltar</Text>
                        </Flex>
                    </Link>
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <Flex flexDirection="column" gap="2">
                            <Text>Valor</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="number" {...register("valor")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2">
                            <Text>Descrição</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="text" {...register("descricao")} />
                        </Flex>
                        <Flex flexDirection="column" gap="2">
                            <Text>Data</Text>
                            <Input w="25rem" h="max" py="2" size={"lg"} type="date" {...register("data")} />
                        </Flex>
                        <Button 
                            type="submit"
                            bg={'#dfbda1'}
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
