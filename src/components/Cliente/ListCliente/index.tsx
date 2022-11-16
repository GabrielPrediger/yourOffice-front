import { useEffect, useState } from "react";
import { Flex, Image, Text} from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import SidebarWithHeader from "../../Sidebar";
import { CardCliente } from "../CardCliente";
import api from "../../../services/api";

export default function ListCliente() {

    const [cliente, setCliente] = useState([]);

    useEffect(() => {
    api
        .get("/clientes")
        .then((response: any) => setCliente(response.data))
        .catch((err: any) => {
        console.error("ops! ocorreu um erro" + err);
        });
    }, [cliente]);

    return (
        <SidebarWithHeader>
            <Link to="/clientes" style={{ width: "max-content" }}>
                <Flex align="center" gap="2" my="1rem">
                    <Image as={FiArrowLeft} size={24} />
                    <Text w="max-content">Voltar</Text>
                </Flex>
            </Link>
                <Flex pt="10" gap="4" flexWrap="wrap" justifyContent="center">
                    {cliente.map((data: any) => 
                        <CardCliente id={data.id} nome={data.nome} data={data.data_nascimento} cpf_cnpj={data.cpf_cnpj} rg={data.rg} endereco={data.endereco} />
                    )}
                </Flex>
        </SidebarWithHeader>
    )
}
