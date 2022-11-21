import {
	useToast,
	UseToastOptions,
	Flex,
	Text,
	AlertStatus,
  ToastPosition,
} from "@chakra-ui/react";
import { useState, useEffect, useMemo } from "react";
import { IoMdClose, IoIosInformationCircle } from "react-icons/io";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { AiFillExclamationCircle } from "react-icons/ai";

const useToasty = () => {
	const [state, setState] = useState({} as UseToastOptions);
	const toast = useToast();

	const toastStatus = useMemo(() => {
		switch (state.status) {
			case "success":
				return "#38A169";

			case "error":
				return "#E53E3E";

			case "warning":
				return "yellow";

			case "info":
				return "#2B6CB0";

			default:
				return "white";
		}
	}, [state.status]);

	const toastIcon = useMemo(() => {
		switch (state.status) {
			case "success":
				return (
					<Flex pt="0.12rem">
						<RiCheckboxCircleFill color={toastStatus} size={19} />
					</Flex>
				);

			case "error":
				return (
					<Flex pt="0.12">
						<AiFillExclamationCircle color={toastStatus} size={18} />
					</Flex>
				);

			case "warning":
				return (
					<Flex pt="0.12">
						<AiFillExclamationCircle color={toastStatus} size={18} />
					</Flex>
				);

			case "info":
				return (
					<Flex pt="0.12">
						<IoIosInformationCircle color={toastStatus} size={20} />
					</Flex>
				);

			default:
				return <Flex />;
		}
	}, [state.status, toastStatus]);

	useEffect(() => {
		if (!state || !(Object.keys(state).length !== 0)) return;
		toast({
			...state,
			id: `${state?.id}`,
			duration: 3000,
			position: `${
				(state?.position as ToastPosition | undefined) || "top-right"
			}`,
			isClosable: true,
			status: `${state?.status as AlertStatus}`,
			title: `${state?.title as React.ReactNode}`,
			description: `${state?.description as React.ReactNode}`,

			render: ({ onClose }) => (
				<Flex
					h="fit-content"
					w="356px"
					mt="50px"
					mr="40px"
					p={3}
					bg={'#fff3dd'}
					borderRadius="0.2rem"
					borderLeftWidth="0.25rem"
					borderLeftColor={toastStatus}
					justifyContent="space-between"
				>
					<Flex
						color={'black'}
						flexDirection="row"
						zIndex="docked"
						px="0.3rem"
						py="0.15rem"
					>
						{toastIcon}
						<Flex flexDirection="column" ml="0.8rem">
							<Text fontWeight={"semibold"}>{`${state?.title}`}</Text>
							<Text fontSize="sm" font-weight="normal">
								{state.description}
							</Text>
						</Flex>
					</Flex>
					<Flex _hover={{ cursor: "pointer" }} onClick={onClose}>
						<IoMdClose size={16} color={'white'} />
					</Flex>
				</Flex>
			),
		});
	}, [state, toast, toastIcon, toastStatus]);

	return { toastState: state, toast: setState };
};

export { useToasty };
