import { useEffect, useState, useMemo} from "react";
import { Button, Checkbox, Collapse, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Stack, Text, theme} from "@chakra-ui/react";
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
import { handlePaginate } from "../../../utils/handlePaginate";
import { usePaginator } from "chakra-paginator";
import { ColorRing } from "react-loader-spinner";

interface ICreateCliente {
    id?: number;
    nome?: string;
    data_nascimento: string;
    cpf_cnpj?: string;
    rg?: string;
    endereco?: string;
}

export default function ListCliente() {
    
    const [filtro, setFiltro] = useState<string>('Nome crescente');
    const [cliente, setCliente] = useState([]);
    const [clientsSliced, setClientsSliced] = useState<ICreateCliente[]>([]);
    const { token } = useAuth()
    const theme = usePicasso();

	const quantityPerPage = 10;

    const { currentPage, setCurrentPage } = usePaginator({
		initialState: { currentPage: 1 },
	});

    const quantityOfPages = Math.ceil(
		cliente.length / quantityPerPage
	);


    useMemo(() => {
		handlePaginate(cliente, quantityPerPage, currentPage, setClientsSliced);
	}, [cliente, currentPage]);

    useEffect(() => {
        if(filtro === 'Nome crescente'){
            api
            .get("/clientes-nome-asc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setCliente(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        } else if(filtro === 'Nome decrescente' ) {
            api
            .get("/clientes-nome-desc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setCliente(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        } else if(filtro === 'Data crescente' ) {
            api
            .get("/clientes-data-asc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setCliente(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        } else if(filtro === 'Data decrescente' ) {
            api
            .get("/clientes-data-desc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setCliente(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        }
        // eslint-disable-next-line
    }, [filtro, cliente]);

    return (
        <SidebarWithHeader>
            <Link to="/clientes" style={{ width: "max-content" }}>
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
                            <MenuItem bgColor={filtro === 'Nome crescente' ?  theme.background.filtroHoverSelected : 'none'}  transition={"0.2s"} onClick={() => setFiltro('Nome crescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Nome Crescente</MenuItem>
                            <MenuItem bgColor={filtro === 'Nome decrescente' ?  theme.background.filtroHoverSelected : 'none'}  transition={"0.2s"} onClick={() => setFiltro('Nome decrescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Nome Decrescente</MenuItem>
                            <MenuItem bgColor={filtro === 'Data crescente' ?  theme.background.filtroHoverSelected : 'none'}  transition={"0.2s"} onClick={() => setFiltro('Data crescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Data Crescente</MenuItem>
                            <MenuItem bgColor={filtro === 'Data decrescente' ?  theme.background.filtroHoverSelected : 'none'}  transition={"0.2s"} onClick={() => setFiltro('Data decrescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Data Decrescente</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
            <Flex justifyContent="center" pt={!filtro.length && !clientsSliced.length ? "15rem" : "unset"}>
                    <ColorRing
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#f3c48e', '#f1b877', '#f0a653', '#f1dac0', '#a1773f']}
                        visible={!filtro.length && !clientsSliced.length ? true : false}
                    />
                </Flex>
            <Collapse in={!!cliente.length}>
                <Flex pt="10" gap="4" flexWrap="wrap" justifyContent="center">
                    {clientsSliced.map((data: any) => 
                        <CardCliente key={data.id} id={data.id} nome={data.nome} data={formatDate(data.data_nascimento)} cpf_cnpj={data.cpf_cnpj} rg={data.rg} endereco={data.endereco} />
                    )}
                    <Pagination quantityOfPages={quantityOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </Flex>
            </Collapse>
        </SidebarWithHeader>
    )
}
