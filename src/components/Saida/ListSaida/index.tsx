import { Button, Checkbox, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import moment from 'moment';
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import api from "../../../services/api";
import SidebarWithHeader from "../../Sidebar";
import { CardSaida } from "../CardSaida";
import { ISaidas } from "../../../Types/CrudTypes";
import { formatDate } from "../../../utils/formatDate";
import { IoIosArrowDown } from "react-icons/io";
import { usePicasso } from "../../../hooks/usePicasso";

export default function ListSaida() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { token } = useAuth()
    const theme = usePicasso();

    const [saida, setSaida] = useState<ISaidas[]>([]);
    const [filtro, setFiltro] = useState<string>('');

    useEffect(() => {
        if(filtro === 'Data crescente' || filtro === undefined){
        api
            .get("/get-saida-by-data", {headers: {
                Authorization: `Bearer ${token}`
             }})
            .then((response: any) => {setSaida(response.data)})
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
        } else {
            api
            .get("/get-saida-by-value", {headers: {
                Authorization: `Bearer ${token}`
             }})
            .then((response: any) => {setSaida(response.data); console.log(response);})
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
        }

    }, [filtro, token]);

    return (
        <SidebarWithHeader>
            <Link to="/saidas" style={{ width: "max-content" }}>
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
                            <MenuItem onClick={() => setFiltro('Data crescente')}_hover={{ background: theme.background.filtroHoverSelected}}>Data crescente</MenuItem>
                            <MenuItem onClick={() => setFiltro('Valor crescente')} _hover={{ background: theme.background.filtroHoverSelected}}>Valor crescente</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
            <Flex pt="10" gap="4" flexWrap="wrap" justifyContent="center">
                {saida.map((data) =>
                    <CardSaida id={data.id} valor={data.valor} data={formatDate(data.data)} descricao={data.descricao} />
                )}
                
            </Flex>
        </SidebarWithHeader>
    )
}
