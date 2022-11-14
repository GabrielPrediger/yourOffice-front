import { Button, Flex, Image, Input, Select, Stack, Text } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import SidebarWithHeader from "../../Sidebar";

export default function EditUserComponent() {
    const theme = usePicasso();

    return (
        <SidebarWithHeader>
            <Flex justifyContent="center" alignItems="center">

                <Flex flexDirection="column" gap="10" p="10" >
                    <Link to="/usuario" style={{ width: "max-content" }}>
                        <Flex align="center" gap="2">
                            <Image as={FiArrowLeft} size={24} />
                            <Text w="max-content">Voltar</Text>
                        </Flex>
                    </Link>
                    <Flex flexDirection="column" gap="2">
                        <Text>Usuario</Text>
                        <Input w="25rem" h="max" py="2" size={"lg"} />
                    </Flex>
                    <Flex flexDirection="column" gap="2">
                        <Text>Senha</Text>
                        <Input w="25rem" h="max" py="2" size={"lg"} />
                    </Flex>
                    <Flex flexDirection="column" gap="2">
                        <Text>Email</Text>
                        <Input w="25rem" h="max" py="2" size={"lg"} />
                    </Flex>
                    <Flex flexDirection="column" gap="2">
                        <Text>Permissão</Text>
                        <Stack spacing={3}>
                            <Select variant='outline' placeholder='Escolha uma opção...' />
                        </Stack>
                    </Flex>
                    <Button bg={'#dfbda1'}
                        color={'white'}
                        _hover={{
                            bg: '#dfbda1',
                            opacity: 0.5
                        }}>Salvar</Button>
                </Flex>
            </Flex>
        </SidebarWithHeader>
    )
}
