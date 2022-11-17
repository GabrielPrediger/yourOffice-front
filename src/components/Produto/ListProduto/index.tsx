import {
    Flex, 
    Image,
    Text,
} from "@chakra-ui/react";

import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import SidebarWithHeader from "../../Sidebar";
import { usePicasso } from "../../../hooks/usePicasso";
import { CardProduto } from "../CardProduto";
import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function ListProduto() {

    const [produto, setProduto] = useState([]);
    const theme = usePicasso();

    useEffect(() => {
        api
            .get("/produtos")
            .then((response: any) => setProduto(response.data))
            .catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
            });
        }, []);

    return (
        <SidebarWithHeader>
            <Link to="/produtos" style={{ width: "max-content" }}>
                <Flex align="center" gap="2" my="1rem">
                    <Image as={FiArrowLeft} size={24} />
                    <Text w="max-content">Voltar</Text>
                </Flex>
            </Link>
            <Flex pt="10" gap="4" flexWrap="wrap" justifyContent="center">
                {produto.map((data: any) => 
                    <CardProduto id={data.id} nome={data.nome} descricao={data.descricao} quantidade={data.quantidade} tipo={data.tipo} foto={data.foto} preco={data.preco} />
                )}
            </Flex>
        </SidebarWithHeader>
    )
}
