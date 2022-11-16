import { Flex, Image, Text} from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import SidebarWithHeader from "../../Sidebar";
import { CardCliente } from "../CardCliente";

export default function ListCliente() {


    return (
        <SidebarWithHeader>
            <Link to="/clientes" style={{ width: "max-content" }}>
                <Flex align="center" gap="2" my="1rem">
                    <Image as={FiArrowLeft} size={24} />
                    <Text w="max-content">Voltar</Text>
                </Flex>
            </Link>
                <Flex pt="10" gap="4" flexWrap="wrap" justifyContent="center">
                    <CardCliente />
                </Flex>

        </SidebarWithHeader>
    )
}
