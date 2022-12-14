import { Button, Checkbox, Collapse, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import SidebarWithHeader from "../../Sidebar";
import {CardVenda} from "../CardVenda";
import { useEffect, useState, useMemo } from 'react'
import api from "../../../services/api";
import { usePicasso } from "../../../hooks/usePicasso";
import { useAuth } from "../../../hooks/useAuth";
import { formatDate, formatStringDate } from "../../../utils/formatDate";
import { ICreateEntrada } from "../../../Types/CrudTypes";
import { Pagination } from "../../Pagination";
import { handlePaginate } from "../../../utils/handlePaginate";
import { usePaginator } from "chakra-paginator";
import { IoIosArrowDown } from "react-icons/io";
import { TailSpin, ColorRing } from "react-loader-spinner";
import { IEntradaProducts } from "../../../Types";

export default function ListEntrada() {

    const [filtro, setFiltro] = useState<string>('Data crescente');
    const { token } = useAuth()
    const theme = usePicasso();
    const [ entradas, setEntradas] = useState<IEntradaProducts[]>([]);
    const [entradasSliced, setEntradasSliced] = useState<IEntradaProducts[]>([]);
	const [filters, setFilters] = useState<string[]>([]);
    const [qTipo, setQTipo] = useState<string>();
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isAtrasadoArray, setIsAtrasadoArray] = useState<boolean>();
    const quantityPerPage = 8;

    const { currentPage, setCurrentPage } = usePaginator({
		initialState: { currentPage: 1 },
	});

    const quantityOfPages = Math.ceil(
		entradas.length / quantityPerPage
	);


    useMemo(() => {
		handlePaginate(entradas, quantityPerPage, currentPage, setEntradasSliced);
	}, [entradas, currentPage]);

    useMemo(() => {
        if(filtro === 'Data crescente'){
            api
            .get("/entradas-by-dateAsc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setEntradas(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        } else if(filtro === 'Data decrescente' ) {
            api
            .get("/entradas-by-dateDesc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setEntradas(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        } else if(filtro === 'Valor crescente' ) {
            api
            .get("/entradas-by-valorAsc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setEntradas(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        } else if(filtro === 'Valor decrescente' ) {
            api
            .get("/entradas-by-valorDesc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setEntradas(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        } else if(filtro === 'Tipo crescente' ) {
            api
            .get("/entradas-by-tipoAsc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setEntradas(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        } else if(filtro === 'Tipo decrescente' ) {
            api
            .get("/entradas-by-tipoDesc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setEntradas(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        } else if(filtro === 'Data inicio crescente' ) {
            api
            .get("/entradas-by-date-aluguelAsc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setEntradas(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        } else if(filtro === 'Data inicio decrescente' ) {
            api
            .get("/entradas-by-date-aluguelDesc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setEntradas(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        }
        // eslint-disable-next-line
    }, [filtro, isDeleting]);

    const handleCheckbox = (value: string) => {
        setQTipo(value)
        const isFiltering = filters.includes(value);
        if (isFiltering) {
            setFilters([...filters.filter((item) => item !== value)]);
        } else {
            setFilters([...filters, value]);
        }
    };

    const filteredArr = useMemo(
        () =>
            entradasSliced?.filter((item) => filters.includes(item.tipoVenda)),
        [filters, entradasSliced]
    ); 

    const filteredIsAluguel = entradas?.filter((item) => item.isAtrasado === true)
   
    const returnArrays = useMemo(() => {
        if(isAtrasadoArray){
            return filteredIsAluguel
        }
        if(filters.length){
            return filteredArr
        } else{
            return entradasSliced
        }
    }, [entradasSliced, filteredArr, filteredIsAluguel, filters.length, isAtrasadoArray])
    
    return (
        <SidebarWithHeader>
            <Link to="/entradas" style={{ width: "max-content" }}>
                <Flex align="center" gap="2" my="1rem" transition="0.5s" _hover={{ opacity: 0.4 }}>
                    <Image as={FiArrowLeft} size={24} />
                    <Text w="max-content">Voltar</Text>
                </Flex>
            </Link>
            <Flex w="100%" justifyContent={["center","center","center","space-between"]} px={["0rem","6rem","6rem","6rem"]} gap="5" pt="10" flexWrap={"wrap"}>
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
                        {qTipo === "venda" || qTipo === undefined ? (
                            <>
                            <MenuItem transition={"0.2s"} bgColor={filtro === 'Data crescente' ?  theme.background.filtroHoverSelected : 'none'} onClick={() => setFiltro('Data crescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Data crescente</MenuItem>
                            <MenuItem transition={"0.2s"} bgColor={filtro === 'Data decrescente' ?  theme.background.filtroHoverSelected : 'none'} onClick={() => setFiltro('Data decrescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Data decrescente</MenuItem>
                            </>
                        ) : (
                            <>
                            <MenuItem transition={"0.2s"} bgColor={filtro === 'Data inicio crescente' ?  theme.background.filtroHoverSelected : 'none'} onClick={() => setFiltro('Data inicio crescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Data inicio crescente</MenuItem>
                            <MenuItem transition={"0.2s"} bgColor={filtro === 'Data inicio decrescente' ?  theme.background.filtroHoverSelected : 'none'} onClick={() => setFiltro('Data inicio decrescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Data inicio decrescente</MenuItem>
                            </>
                        )}
                        <MenuItem transition={"0.2s"} bgColor={filtro === 'Tipo crescente' ?  theme.background.filtroHoverSelected : 'none'} onClick={() => setFiltro('Tipo crescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Tipo crescente</MenuItem>
                        <MenuItem transition={"0.2s"} bgColor={filtro === 'Tipo decrescente' ?  theme.background.filtroHoverSelected : 'none'} onClick={() => setFiltro('Tipo decrescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Tipo decrescente</MenuItem>
                        <MenuItem transition={"0.2s"} bgColor={filtro === 'Valor crescente' ?  theme.background.filtroHoverSelected : 'none'} onClick={() => setFiltro('Valor crescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Valor crescente</MenuItem>
                        <MenuItem transition={"0.2s"} bgColor={filtro === 'Valor decrescente' ?  theme.background.filtroHoverSelected : 'none'} onClick={() => setFiltro('Valor decrescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Valor decrescente</MenuItem>
                    </MenuList>
                </Menu>
                <Flex justifyContent="flex-end">
                    <Stack spacing={5} direction='row'>
                        <Checkbox colorScheme='orange' value="venda" onChange={() => handleCheckbox('venda')}>
                            Venda
                        </Checkbox>
                        <Checkbox colorScheme='orange' value="aluguel" onChange={() => handleCheckbox('aluguel')}>
                            Aluguel
                        </Checkbox>
                        <Checkbox colorScheme='orange' value="atrasado" onChange={() => {handleCheckbox('atrasado'); setIsAtrasadoArray(isAtrasadoArray ? false : true)}}>
                            Atrasado
                        </Checkbox>
                    </Stack>
                </Flex>
            </Flex>
                <Flex justifyContent="center" pt={!entradas.length && !entradasSliced.length && !filteredArr.length ? "15rem" : "unset"}>
                    <ColorRing
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#f3c48e', '#f1b877', '#f0a653', '#f1dac0', '#a1773f']}
                        visible={!entradas.length && !entradasSliced.length && !filteredArr.length ? true : false}
                    />
                </Flex>
                <Collapse in={!!entradas.length || !!entradasSliced.length || !!filteredArr.length}>
                    <Flex pt="10" gap="4" flexWrap="wrap" justifyContent="center">
                        {(returnArrays || []).map((data: IEntradaProducts) =>
                            <CardVenda 
                                id={data.id} 
                                tipoVenda={data.tipoVenda} 
                                data={data.data} 
                                descricao={data?.descricao} 
                                valor={data.valor} 
                                clienteId={data.clienteId}
                                produtos={data.produtos} 
                                quantidade={data.quantidade}
                                data_inicio_aluguel={data.data_inicio_aluguel} 
                                data_fim_aluguel={data.data_fim_aluguel} 
                                isAtrasado={data.isAtrasado}
                                setIsDeleting={setIsDeleting}
                            /> 
                        )}
                        <Pagination quantityOfPages={quantityOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </Flex>
                </Collapse>
        </SidebarWithHeader>
    )
}