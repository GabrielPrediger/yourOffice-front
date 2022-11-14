import {
    Flex, 
    Image,
    Text,
} from "@chakra-ui/react";

import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import SidebarWithHeader from "../../Sidebar";
import { usePicasso } from "../../../hooks/usePicasso";
import CardProduto from "../CardProduto";

export default function ListProduto() {

    const theme = usePicasso();

    return (
        <SidebarWithHeader>
            <Link to="/produtos" style={{ width: "max-content" }}>
                <Flex align="center" gap="2" my="1rem">
                    <Image as={FiArrowLeft} size={24} />
                    <Text w="max-content">Voltar</Text>
                </Flex>
            </Link>
            <CardProduto />
        </SidebarWithHeader>
    )
}
