import { Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
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

export default function ListSaida() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { token } = useAuth()

    const [saida, setSaida] = useState<ISaidas[]>([]);

    useEffect(() => {
        api
            .get("/get-user-by-data", {headers: {
                Authorization: `Bearer ${token}`
             }})
            .then((response: any) => {setSaida(response.data)})
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, [token]);

    console.log(saida, 'saida')   //retorna o array certinho

    return (
        <SidebarWithHeader>
            <Link to="/saidas" style={{ width: "max-content" }}>
                <Flex align="center" gap="2" my="1rem">
                    <Image as={FiArrowLeft} size={24} />
                    <Text w="max-content">Voltar</Text>
                </Flex>
            </Link>
            <Flex pt="10" gap="4" flexWrap="wrap" justifyContent="center">
                {saida.map((data) =>
                    <CardSaida id={data.id} valor={data.valor} data={formatDate(data.data)} descricao={data.descricao} />
                )}
                
            </Flex>
        </SidebarWithHeader>
    )
}
