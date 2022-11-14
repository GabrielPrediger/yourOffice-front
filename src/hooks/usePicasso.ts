import { useColorModeValue } from "@chakra-ui/react";


const usePicasso = () => {
	const theme = {
		text: {
			whiteGrayHover: useColorModeValue("black", "black"),
		},
		background: {
			login: useColorModeValue("#38B2AC", "#38B2AC"),
		},
		border: {
			inputLogin: useColorModeValue("#F7FAFC", "#F7FAFC"),
		},
		colors: {
			brown: useColorModeValue("#dfbda1", "#dfbda1")
		}

	}
	return theme;
};

export { usePicasso };
