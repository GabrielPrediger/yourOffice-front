import { useColorModeValue } from "@chakra-ui/react";


const usePicasso = () => {
	const theme = {
		text: {
			whiteGrayHover: useColorModeValue("black", "black"),
			deleteButton: useColorModeValue("#dfbda1", "white"),
		},
		background: {
			login: useColorModeValue("linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)", "gray.900"),
			siderBar: useColorModeValue("linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)", "gray.900"),
			navItem: useColorModeValue("#e2d1c3", "#4A5568"),
			priceCardButton: useColorModeValue("linear-gradient(135deg, #d4b89c 0%, #e2d1c3 100%)", "gray.900"),
			loginButton: useColorModeValue("linear-gradient(135deg, #d4b89c 0%, #e2d1c3 100%)", "gray.900"),
			crudsButton: useColorModeValue("linear-gradient(135deg, #d4b89c 0%, #e2d1c3 100%)", "#4A5568"),
			criarButton: useColorModeValue("#dfbda1", "#4A5568"),
			editButton: useColorModeValue("#dfbda1", "#4A5568"),
			deleteButton: useColorModeValue("transparent", "transparent"),
			entradaCard: useColorModeValue("white", "gray.900"),
			saidaCard: useColorModeValue("white", "gray.900"),
			produtoCard: useColorModeValue("white", "gray.900"),
			quantityCard: useColorModeValue("white", "gray.900"),
			clienteCard: useColorModeValue("white", "gray.900"),
			userCard: useColorModeValue("white", "gray.900"),
			typeCard: useColorModeValue("white", "gray.900"),
			filtroHover: useColorModeValue('#e2cab7', "gray.900"),
			filtroHoverSelected: useColorModeValue('#e2cab7', "#4A5568"),
			menuStatistc: useColorModeValue('#F7FAFC', '#2D3748')
		},
		border: {
			inputLogin: useColorModeValue("#F7FAFC", "#F7FAFC"),
			priceCardButton: useColorModeValue("#dfbda1", "gray.900"),
			entradaCard: useColorModeValue("#dfbda1", "#4A5568"),
			saidaCard: useColorModeValue("#dfbda1", "#4A5568"),
			produtoCard: useColorModeValue("#dfbda1", "#4A5568"),
			deleteButton: useColorModeValue("#dfbda1", "#EDF2F7"),
			editButton: useColorModeValue("#dfbda1", "#4A5568"),
			quantityCard: useColorModeValue("#dfbda1", "#4A5568"),
			clienteCard: useColorModeValue("#dfbda1", "#4A5568"),
			userCard: useColorModeValue("#dfbda1", "#4A5568"),
			typeCard: useColorModeValue("#dfbda1", "#4A5568"),
		},
		colors: {
			black: useColorModeValue("black", "black"),
			white: useColorModeValue("#FFFFFF", "#FFFFFF"),
			blackWhite: useColorModeValue("black", "#FFFFFF"),
			whiteBlack: useColorModeValue("#FFFFFF", "black"),
			brown: useColorModeValue("#dfbda1", "#dfbda1"),
			brownWhite: useColorModeValue("#dfbda1", "#FFFFFF"),

		},
		boxShadow: {
			header: useColorModeValue("0px -9px 37px 15px rgba(0,0,0,0.37)", "0px -9px 37px 15px rgb(94 94 94 / 18%)")
		}

	}
	return theme;
};

export { usePicasso };
