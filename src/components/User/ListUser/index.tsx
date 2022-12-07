import { Button, Checkbox, Collapse, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Slide, SlideFade, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import SidebarWithHeader from "../../Sidebar";
import { useEffect, useMemo, useState } from "react";
import api from "../../../services/api";
import { CardUser } from "../CardUser";
import { useAuth } from "../../../hooks/useAuth";
import { IoIosArrowDown } from 'react-icons/io'
import { usePicasso } from "../../../hooks/usePicasso";
import { handlePaginate } from "../../../utils/handlePaginate";
import { usePaginator } from "chakra-paginator";
import { Pagination } from "../../Pagination";
import { ICreateUser } from "../../../Types/CrudTypes";

export default function ListUser() {

    const [filtro, setFiltro] = useState<string>('Nome crescente');
    const [ user, setUser] = useState<ICreateUser[]>([]);
    const { token } = useAuth()
    const theme = usePicasso();
    const [userSliced, setUserSliced] = useState<ICreateUser[]>([]);
	const [filters, setFilters] = useState<string[]>([]);

    const quantityPerPage = 8;

    const { currentPage, setCurrentPage } = usePaginator({
		initialState: { currentPage: 1 },
	});

    const quantityOfPages = Math.ceil(
		user.length / quantityPerPage
	);


    useMemo(() => {
		handlePaginate(user, quantityPerPage, currentPage, setUserSliced);
	}, [user, currentPage]);

    useEffect(() => {
        if(filtro === 'Nome crescente'){
            api
            .get("/get-user-asc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setUser(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        } else if(filtro === 'Nome decrescente' ) {
            api
            .get("/get-user-desc", {headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response: any) => setUser(response.data))
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
            user?.filter((item) => filters.includes(item.permissao)),
		[filters, user]
	);

    
    return (
        <SidebarWithHeader>
            <Link to="/usuarios" style={{ width: "max-content" }}>
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
                        <MenuList transition={"0.2s"}>
                            <MenuItem bgColor={filtro === 'Nome crescente' ?  theme.background.filtroHoverSelected : 'none'}  transition={"0.2s"} onClick={() => setFiltro('Nome crescente')}  _hover={{ background: theme.background.filtroHoverSelected}}>Nome Crescente</MenuItem>
                            <MenuItem bgColor={filtro === 'Nome decrescente' ?  theme.background.filtroHoverSelected : 'none'}  transition={"0.2s"} onClick={() => setFiltro('Nome decrescente')}  _hover={{ background: theme.background.filtroHoverSelected}}>Nome Decrescente</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
                <Flex justifyContent="flex-end" pr="10rem">
                    <Stack spacing={5} direction='row'>
                        <Checkbox colorScheme='orange' value="admin" onChange={() => handleCheckbox('admin')}>
                            Admin
                        </Checkbox>
                        <Checkbox colorScheme='orange' value="gerente" onChange={() => handleCheckbox('gerente')}>
                            Gerente
                        </Checkbox>
                        <Checkbox colorScheme='orange' value="usuario" onChange={() => handleCheckbox('usuario')}>
                            Usuario
                        </Checkbox>
                    </Stack>
                </Flex>
            </Flex>
            <Collapse in={!!user.length}>
                <Flex w="90%" pt="10" gap="4" flexWrap="wrap" justifyContent="center">
                    {((filters.length ? filteredArr : userSliced) || []).map((data: any) => 
                        <CardUser id={data.id} usuario={data.usuario} senha={data.senha} email={data.email} permissao={data.permissao} />
                    )}
                    <Pagination quantityOfPages={quantityOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </Flex>
            </Collapse>
        </SidebarWithHeader>
    )
}
