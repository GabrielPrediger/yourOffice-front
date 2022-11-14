import { Button, Flex, Image, Input,  Text } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import SidebarWithHeader from "../../Sidebar";

export default function EditarClienteComponent() {

    const theme = usePicasso();

    return (
        <SidebarWithHeader>
            <Flex justifyContent="center" alignItems="center">
                <Flex flexDirection="column" gap="10" p="10">
                    <Link to="/cliente" style={{ width: "max-content" }}>
                        <Flex align="center" gap="2">
                            <Image as={FiArrowLeft} size={24} />
                            <Text w="max-content">Voltar</Text>
                        </Flex>
                    </Link>
                    <Flex flexDirection="column" gap="2">
                        <Text>Nome</Text>
                        <Input w="25rem" h="max" py="2" size={"lg"} />
                    </Flex>
                    <Flex flexDirection="column" gap="2">
                        <Text>Data de nascimento</Text>
                        <Input w="25rem" h="max" py="2" size={"lg"} />
                    </Flex>
                    <Flex flexDirection="column" gap="2">
                        <Text>CPF/CNPJ</Text>
                        <Input w="25rem" h="max" py="2" size={"lg"} />
                    </Flex>
                    <Flex flexDirection="column" gap="2">
                        <Text>RG</Text>
                        <Input w="25rem" h="max" py="2" size={"lg"} />
                    </Flex>
                    <Flex flexDirection="column" gap="2">
                        <Text>Endereço</Text>
                        <Input w="25rem" h="max" py="2" size={"lg"} />
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
