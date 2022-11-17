import { Flex, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {  AiOutlineCloseSquare } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import SidebarWithHeader from "../../Sidebar";
import { CardSaida } from "../CardSaida";
import { DeleteSaidaModalComponent } from "../DeleteSaidaModal";

export default function ListSaida() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [saida, setSaida] = useState([]);

    useEffect(() => {
        api
            .get("/get-user-by-data")
            .then((response: any) => setSaida(response.data))
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, [saida]);

    return (
        <SidebarWithHeader>
            <Link to="/saidas" style={{ width: "max-content" }}>
                <Flex align="center" gap="2" my="1rem">
                    <Image as={FiArrowLeft} size={24} />
                    <Text w="max-content">Voltar</Text>
                </Flex>
            </Link>
            <Flex pt="10" gap="4" flexWrap="wrap" justifyContent="center">
                {saida.map((data: any) =>
                    <CardSaida id={data.id} valor={data.valor} data={data.data} descricao={data.descricao} />
                )}
                
            </Flex>
        </SidebarWithHeader>
    )
}
