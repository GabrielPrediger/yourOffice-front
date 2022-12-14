import { Button, Checkbox, Collapse, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import moment from 'moment';
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import api from "../../../services/api";
import SidebarWithHeader from "../../Sidebar";
import { CardSaida } from "../CardSaida";
import { ICreateSaidas, ISaidas } from "../../../Types/CrudTypes";
import { formatDate } from "../../../utils/formatDate";
import { IoIosArrowDown } from "react-icons/io";
import { usePicasso } from "../../../hooks/usePicasso";
import { handlePaginate } from "../../../utils/handlePaginate";
import { usePaginator } from "chakra-paginator";
import { Pagination } from "../../Pagination";

export default function ListSaida() {
    const { token } = useAuth()
    const theme = usePicasso();

    const [saida, setSaida] = useState<ISaidas[]>([]);
    const [saidaSliced, setSaidaSliced] = useState<ICreateSaidas[]>([]);
    const [filtro, setFiltro] = useState<string>('Data decrescente');

    const quantityPerPage = 8;

    const { currentPage, setCurrentPage } = usePaginator({
		initialState: { currentPage: 1 },
	});

    const quantityOfPages = Math.ceil(
		saida.length / quantityPerPage
	);


    useMemo(() => {
		handlePaginate(saida, quantityPerPage, currentPage, setSaidaSliced);
	}, [saida, currentPage]);

    useEffect(() => {
        if(filtro === 'Data crescente'){
        api
            .get("/get-saida-by-dataAsc", {headers: {
                Authorization: `Bearer ${token}`
             }})
            .then((response: any) => {setSaida(response.data)})
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
        } else if(filtro === 'Data decrescente') {
            api
            .get("/get-saida-by-dataDesc", {headers: {
                Authorization: `Bearer ${token}`
             }})
            .then((response: any) => {setSaida(response.data); console.log(response);})
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
        }  else if(filtro === 'Valor crescente') {
            api
            .get("/get-saida-by-valueAsc", {headers: {
                Authorization: `Bearer ${token}`
             }})
            .then((response: any) => {setSaida(response.data); console.log(response);})
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
        }  else if(filtro === 'Valor decrescente') {
            api
            .get("/get-saida-by-valueDesc", {headers: {
                Authorization: `Bearer ${token}`
             }})
            .then((response: any) => {setSaida(response.data); console.log(response);})
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
        }

    }, [filtro, token, saidaSliced]);

    return (
        <SidebarWithHeader>
            <Link to="/saidas" style={{ width: "max-content" }}>
                <Flex align="center" gap="2" my="1rem" transition="0.5s" _hover={{ opacity: 0.4 }}>
                    <Image as={FiArrowLeft} size={24} />
                    <Text w="max-content">Voltar</Text>
                </Flex>
            </Link>
            <Flex justifyContent={["center","center","space-between","space-between"]} px="7rem" pt="10">
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
                            <MenuItem transition={"0.2s"} bgColor={filtro === 'Data crescente' ?  theme.background.filtroHoverSelected : 'none'} onClick={() => setFiltro('Data crescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Data crescente</MenuItem>
                            <MenuItem transition={"0.2s"} bgColor={filtro === 'Data decrescente' ?  theme.background.filtroHoverSelected : 'none'} onClick={() => setFiltro('Data decrescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Data decrescente</MenuItem>
                            <MenuItem transition={"0.2s"} bgColor={filtro === 'Valor crescente' ?  theme.background.filtroHoverSelected : 'none'} onClick={() => setFiltro('Valor crescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Valor crescente</MenuItem>
                            <MenuItem transition={"0.2s"} bgColor={filtro === 'Valor decrescente' ?  theme.background.filtroHoverSelected : 'none'} onClick={() => setFiltro('Valor decrescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Valor decrescente</MenuItem>       
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
            <Collapse in={!!saida.length}>     
                <Flex pt="10" gap="4" flexWrap="wrap" justifyContent="center">
                    {saidaSliced.map((data) =>
                        <CardSaida id={data.id} valor={data.valor} data={formatDate(data.data)} descricao={data.descricao} />
                    )}
                    <Pagination quantityOfPages={quantityOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </Flex>
            </Collapse>
        </SidebarWithHeader>
    )
}
