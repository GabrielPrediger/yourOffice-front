import { Button, Flex, Image, Input,  Select,  Stack,  Text } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { usePicasso } from "../../../hooks/usePicasso";
import SidebarWithHeader from "../../Sidebar";

export default function EditarEntradaComponent() {

    const theme = usePicasso();

    return (
        <SidebarWithHeader>
            <Flex justifyContent="center" alignItems="center">
            <Flex flexDirection="column" gap="10" p="10">
                    <Link to="/entradas" style={{ width: "max-content" }}>
                        <Flex align="center" gap="2">
                            <Image as={FiArrowLeft} size={24} />
                            <Text w="max-content">Voltar</Text>
                        </Flex>
                    </Link>
                    <Flex flexDirection="column" gap="2">
                        <Text>Valor</Text>
                        <Input w="25rem" h="max" py="2" size={"lg"} type="number" />
                    </Flex>
                    <Flex flexDirection="column" gap="2">
                        <Text>Descrição</Text>
                        <Input w="25rem" h="max" py="2" size={"lg"} type="text" />
                    </Flex>
                    <Flex flexDirection="column" gap="2">
                        <Text>Data</Text>
                        <Input w="25rem" h="max" py="2" size={"lg"} type="date" />
                    </Flex>
                    <Flex flexDirection="column" gap="2">
                        <Text>Cliente</Text>
                        <Stack spacing={3}>
                            <Select variant='outline' placeholder='Escolha uma opção...'>
                                <option value='option1'>Gab</option>
                                <option value='option1'>Luc</option>
                            </Select>
                        </Stack>
                    </Flex>
                    <Flex flexDirection="column" gap="2">
                        <Text>Produto</Text>
                        <Stack spacing={3}>
                            <Select variant='outline' placeholder='Escolha uma opção...'>
                                <option value='option1'>Cadeira</option>
                                <option value='option1'>Mesa verde de marmore italiani</option>
                            </Select>
                        </Stack>
                    </Flex>
                    <Flex flexDirection="column" gap="2">
                        <Text>Tipo</Text>
                        <Stack spacing={3}>
                            <Select variant='outline' placeholder='Escolha uma opção...'>
                                <option value='option1'>Aluguel</option>
                                <option value='option1'>Venda</option>
                            </Select>
                        </Stack>
                    </Flex>
                    <Button bg={'#dfbda1'}
                        color={'white'}
                        _hover={{
                            bg: '#dfbda1',
                            opacity: 0.5
                        }}>Criar</Button>
                </Flex>
            </Flex>
        </SidebarWithHeader>
    )

}
