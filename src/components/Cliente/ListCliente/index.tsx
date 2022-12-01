import { useEffect, useState, useMemo} from "react";
import { Flex, Image, Text} from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import SidebarWithHeader from "../../Sidebar";
import { CardCliente } from "../CardCliente";
import api from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";
import { formatDate } from "../../../utils/formatDate";
import { Pagination } from "../../Pagination";
// import { usePaginator } from 'chakra-paginator';
// import { handlePaginate } from "../../../utils/handlePaginate";

export default function ListCliente() {

    const [cliente, setCliente] = useState([]);
    const { token } = useAuth()

	// const quantityPerPage = 10;

    // const { currentPage, setCurrentPage } = usePaginator({
	// 	initialState: { currentPage: 1 },
	// });

    // const quantityOfPages = Math.ceil(
	// 	2
	// );

    // useMemo(() => {
	// 	handlePaginate(cliente, quantityPerPage, currentPage, setCliente);
	// }, [cliente, currentPage]);

    useEffect(() => {
    api
        .get("/clientes", {headers: {
            Authorization: `Bearer ${token}`
         }})
        .then((response: any) => setCliente(response.data))
        .catch((err: any) => {
        console.error("ops! ocorreu um erro" + err);
        });
    }, [cliente, token]);

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
                        <CardCliente id={data.id} nome={data.nome} data={formatDate(data.data_nascimento)} cpf_cnpj={data.cpf_cnpj} rg={data.rg} endereco={data.endereco} />
                    )}
                </Flex>
        </SidebarWithHeader>
    )
}
