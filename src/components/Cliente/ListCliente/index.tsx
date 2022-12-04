import { useEffect, useState, useMemo} from "react";
import { Button, Checkbox, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Stack, Text, theme} from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import SidebarWithHeader from "../../Sidebar";
import { CardCliente } from "../CardCliente";
import api from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";
import { formatDate } from "../../../utils/formatDate";
import { Pagination } from "../../Pagination";
import { IoIosArrowDown } from "react-icons/io";
import { usePicasso } from "../../../hooks/usePicasso";
// import { usePaginator } from 'chakra-paginator';
// import { handlePaginate } from "../../../utils/handlePaginate";

export default function ListCliente() {

    const [cliente, setCliente] = useState([]);
    const { token } = useAuth()
    const theme = usePicasso();

	// const quantityPerPage = 10;

    // const { currentPage, setCurrentPage } = usePaginator({
	// 	initialState: { currentPage: 1 },
	// });

    // const quantityOfPages = Math.ceil(
	// 	2
	// );

    // useMemo(() => {
	// 	handlePaginate(cliente, quantityPerPage, currentPage, setCliente);
	// }, [cliente, currentPage]);

    useEffect(() => {
    api
        .get("/clientes", {headers: {
            authorization: `Bearer ${token}`
         }})
        .then((response: any) => setCliente(response.data))
        .catch((err: any) => {
        console.error("ops! ocorreu um erro" + err);
        });
    }, [cliente, token]);

    return (
        <SidebarWithHeader>
            <Link to="/clientes" style={{ width: "max-content" }}>
                <Flex align="center" gap="2" my="1rem" transition="0.5s" _hover={{ opacity: 0.4 }}>
                    <Image as={FiArrowLeft} size={24} />
                    <Text w="max-content">Voltar</Text>
                </Flex>
            </Link>
            <Flex justifyContent="space-between" px="7rem" pt="10">
                <Flex>
                    <Menu>
                        <MenuButton 
                            as={Button} 
                            rightIcon={<IoIosArrowDown />}
                            _hover={{ background: theme.background.filtroHover}}
                            _active={{ background: theme.background.filtroHover}}
                        >
                            Filtro
                        </MenuButton>
                        <MenuList>
                            <MenuItem _hover={{ background: theme.background.filtroHoverSelected}}>Nome Crescente</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
                <Flex pt="10" gap="4" flexWrap="wrap" justifyContent="center">
                    {cliente.map((data: any) => 
                        <CardCliente key={data.id} id={data.id} nome={data.nome} data={formatDate(data.data_nascimento)} cpf_cnpj={data.cpf_cnpj} rg={data.rg} endereco={data.endereco} />
                    )}
                </Flex>
        </SidebarWithHeader>
    )
}
