import { Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import SidebarWithHeader from "../../Sidebar";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { CardUser } from "../CardUser";

export default function ListUser() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [user, setUser] = useState([]);

    useEffect(() => {
    api
        .get("/get-user")
        .then((response: any) => setUser(response.data))
        .catch((err: any) => {
        console.error("ops! ocorreu um erro" + err);
        });
    }, [user]);

    console.log(user);
    return (
        <SidebarWithHeader>
            <Link to="/usuario" style={{ width: "max-content" }}>
                <Flex align="center" gap="2" my="1rem">
                    <Image as={FiArrowLeft} size={24} />
                    <Text w="max-content">Voltar</Text>
                </Flex>
            </Link>
            <Flex pt="10" gap="4" flexWrap="wrap" justifyContent="center">
                {user.map((data: any) => 
                    <CardUser usuario={data.usuario} senha={data.enha} email={data.email} permissao={data.permissao} />
                )}
            </Flex>
        </SidebarWithHeader>
    )
}
