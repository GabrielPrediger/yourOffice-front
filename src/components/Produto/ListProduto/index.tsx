import {
    Button,
    Checkbox,
    Flex, 
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    Text,
} from "@chakra-ui/react";

import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import SidebarWithHeader from "../../Sidebar";
import { usePicasso } from "../../../hooks/usePicasso";
import { CardProduto } from "../CardProduto";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";
import { IoIosArrowDown } from "react-icons/io";

export default function ListProduto() {

    const [produto, setProduto] = useState([]);
    const theme = usePicasso();
    const { token } = useAuth()

    useEffect(() => {
        api
            .get("/produtos", {headers: {
                Authorization: `Bearer ${token}`
             }})
            .then((response: any) => setProduto(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        }, [produto, token]);

    return (
        <SidebarWithHeader>
            <Link to="/produtos" style={{ width: "max-content" }}>
                <Flex align="center" gap="2" my="1rem">
                    <Image as={FiArrowLeft} size={24} />
                    <Text w="max-content">Voltar</Text>
                </Flex>
            </Link>
            <Flex justifyContent="space-between" px="11rem" pt="10">
                <Flex>
                    <Menu>
                        <MenuButton 
                            as={Button} 
                            rightIcon={<IoIosArrowDown />}
                            _hover={{ background: '#e2cab7'}}
                            _active={{ background: '#e2cab7'}}
                        >
                            Filtro
                        </MenuButton>
                        <MenuList>
                            <MenuItem _hover={{ background: '#e2cab7'}}>Tipo crescente</MenuItem>
                            <MenuItem _hover={{ background: '#e2cab7'}}>Tipo decrescente</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
                <Flex justifyContent="flex-end" pr="2">
                    <Stack spacing={5} direction='row'>
                        <Checkbox colorScheme='orange'>
                            Venda
                        </Checkbox>
                        <Checkbox colorScheme='orange'>
                            Aluguel
                        </Checkbox>
                    </Stack>
                </Flex>
            </Flex>
            <Flex pt="10" gap="4" flexWrap="wrap" justifyContent="center">
                {produto.map((data: any) => 
                    <CardProduto id={data.id} nome={data.nome} descricao={data.descricao} quantidade={data.quantidade} tipo={data.tipo} foto={data.foto} preco={data.preco} />
                )}
            </Flex>
        </SidebarWithHeader>
    )
}
