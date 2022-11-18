import { Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import SidebarWithHeader from "../../Sidebar";
import { CardVenda } from "../CardVenda";

export default function ListEntrada() {

    const [entrada, setEntrada] = useState([]);

    useEffect(() => {
        api
            .get("/entradas")
            .then((response: any) => setEntrada(response.data))
            .catch((err: any) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, [entrada]);

    return (
        <SidebarWithHeader>
            <Link to="/entradas" style={{ width: "max-content" }}>
                <Flex align="center" gap="2" my="1rem">
                    <Image as={FiArrowLeft} size={24} />
                    <Text w="max-content">Voltar</Text>
                </Flex>
            </Link>
            <Flex pt="10" gap="4" flexWrap="wrap" justifyContent="center">
                {entrada.map((data: any) => 
                    <CardVenda id={data.id} tipoVenda={data.tipoVenda} data={data.data} valor={data.valor} clienteId={data.clienteId} produtoId={data.produtoId} />
                )}     
            </Flex>

        </SidebarWithHeader>
    )
}
