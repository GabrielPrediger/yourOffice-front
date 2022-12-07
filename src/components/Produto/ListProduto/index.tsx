import {
    Button,
    Checkbox,
    Collapse,
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
import { handlePaginate } from "../../../utils/handlePaginate";
import { usePaginator } from "chakra-paginator";
import { useMemo } from 'react'
import { Pagination } from "../../Pagination";
interface ICreateProduct {
    id?: number;
    nome: string;
    descricao: string;
    quantidade: number;
    tipo: string; //alugar ou vender
    foto: string;
    preco: number;
}

export default function ListProduto() {

    const [filtro, setFiltro] = useState<string>('Nome crescente');
    const [produto, setProduto] = useState<ICreateProduct[]>([]);
    const [produtoSliced, setProdutoSliced] = useState<ICreateProduct[]>([]);
    const theme = usePicasso();
    const { token } = useAuth()
	const [filters, setFilters] = useState<string[]>([]);

	const quantityPerPage = 8;

    const { currentPage, setCurrentPage } = usePaginator({
		initialState: { currentPage: 1 },
	});

    const quantityOfPages = Math.ceil(
		produto.length / quantityPerPage
	);


    useMemo(() => {
		handlePaginate(produto, quantityPerPage, currentPage, setProdutoSliced);
	}, [produto, currentPage]);

    useEffect(() => {
        if(filtro === 'Nome crescente'){
            api
            .get("/produtos-name-asc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setProduto(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        } else if(filtro === 'Nome decrescente' ) {
            api
            .get("/produtos-name-desc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setProduto(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        } else if(filtro === 'Tipo crescente' ) {
            api
            .get("/produtos-type-asc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setProduto(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        } else if(filtro === 'Tipo decrescente' ) {
            api
            .get("/produtos-type-desc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setProduto(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        } else if(filtro === 'Valor crescente' ) {
            api
            .get("/produtos-value-asc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setProduto(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        } else if(filtro === 'Valor decrescente' ) {
            api
            .get("/produtos-value-desc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setProduto(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        } else if(filtro === 'Quantidade crescente' ) {
            api
            .get("/produtos-quantidade-asc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setProduto(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        } else if(filtro === 'Quantidade decrescente' ) {
            api
            .get("/produtos-quantidade-desc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setProduto(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        }
        // eslint-disable-next-line
    }, [filtro]);

    const handleCheckbox = (value: string) => {
            const isFiltering = filters.includes(value);
            if (isFiltering) {
                setFilters([...filters.filter((item) => item !== value)]);
            } else {
                setFilters([...filters, value]);
            }
    };
    
    const filteredArr = useMemo(
        () =>
            produtoSliced?.filter((item) => filters.includes(item.tipo)),
        [filters, produtoSliced]
    );    

    return (
        <SidebarWithHeader>
            <Link to="/produtos" style={{ width: "max-content" }}>
                <Flex align="center" gap="2" my="1rem" transition="0.5s" _hover={{ opacity: 0.4 }}>
                    <Image as={FiArrowLeft} size={24} />
                    <Text w="max-content">Voltar</Text>
                </Flex>
            </Link>
            <Flex justifyContent="space-between" px="6rem" pt="10">
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
                        <MenuList transition={"0.2s"}>
                            <MenuItem transition={"0.2s"} bgColor={filtro === 'Nome crescente' ?  theme.background.filtroHoverSelected : 'none'} onClick={() => setFiltro('Nome crescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Nome crescente</MenuItem>
                            <MenuItem transition={"0.2s"} bgColor={filtro === 'Nome decrescente' ?  theme.background.filtroHoverSelected : 'none'} onClick={() => setFiltro('Nome decrescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Nome decrescente</MenuItem>
                            <MenuItem transition={"0.2s"} bgColor={filtro === 'Tipo crescente' ?  theme.background.filtroHoverSelected : 'none'} onClick={() => setFiltro('Tipo crescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Tipo crescente</MenuItem>
                            <MenuItem transition={"0.2s"} bgColor={filtro === 'Tipo decrescente' ?  theme.background.filtroHoverSelected : 'none'} onClick={() => setFiltro('Tipo decrescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Tipo decrescente</MenuItem>
                            <MenuItem transition={"0.2s"} bgColor={filtro === 'Valor crescente' ?  theme.background.filtroHoverSelected : 'none'} onClick={() => setFiltro('Valor crescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Valor crescente</MenuItem>
                            <MenuItem transition={"0.2s"} bgColor={filtro === 'Valor decrescente' ?  theme.background.filtroHoverSelected : 'none'} onClick={() => setFiltro('Valor decrescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Valor decrescente</MenuItem>
                            <MenuItem transition={"0.2s"} bgColor={filtro === 'Quantidade crescente' ?  theme.background.filtroHoverSelected : 'none'} onClick={() => setFiltro('Quantidade crescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Quantidade crescente</MenuItem>
                            <MenuItem transition={"0.2s"} bgColor={filtro === 'Quantidade decrescente' ?  theme.background.filtroHoverSelected : 'none'} onClick={() => setFiltro('Quantidade decrescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Quantidade decrescente</MenuItem>
                        </MenuList>

                    </Menu>
                </Flex>
                <Flex justifyContent="flex-end" pr="210">
                    <Stack spacing={5} direction='row'>
                        <Checkbox colorScheme='orange' value="Venda" onChange={() => handleCheckbox('Venda')}>
                            Venda
                        </Checkbox>
                        <Checkbox colorScheme='orange' value="Aluguel" onChange={() => handleCheckbox('Aluguel')}>
                            Aluguel
                        </Checkbox>
                    </Stack>
                </Flex>
            </Flex>
            <Collapse in={!!produto.length}>
                <Flex pt="10" gap="4" flexWrap="wrap" justifyContent="start" pl="4.5rem">
                    {((filters.length ? filteredArr : produtoSliced) || []).map((data: any) => 
                        <CardProduto id={data.id} nome={data.nome} descricao={data.descricao} quantidade={data.quantidade} tipo={data.tipo} foto={data.foto} preco={data.preco} />
                    )}
                    <Pagination quantityOfPages={quantityOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

                </Flex>
            </Collapse>
        </SidebarWithHeader>
    )
}
