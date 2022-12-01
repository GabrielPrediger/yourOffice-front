import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import React, { FC } from 'react';
import { ChakraProvider, Text } from '@chakra-ui/react';
import {
	Pagination as ChakraPagination,
	PaginationNext,
	PaginationPage,
	PaginationPrevious,
	PaginationContainer,
	PaginationPageGroup,
} from '@ajna/pagination';

export const Pagination: FC<{
	quantityOfPages: number;
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}> = ({ quantityOfPages, currentPage, setCurrentPage }) => {
	const pages = Array.from(
		{ length: quantityOfPages },
		(_, counter: number) => counter + 1
	);
	return (
		<ChakraProvider>
			<ChakraPagination
				pagesCount={quantityOfPages}
				currentPage={currentPage}
				onPageChange={setCurrentPage}
			>
				<PaginationContainer
					display="flex"
					alignItems="center"
					justifyContent="center"
					w="100%"
					gap="6"
					fontSize="sm"
					mt="2"
				>
					<PaginationPrevious
						borderRadius={['9999rem', '9999rem', '3rem', '3rem']}
						bgColor={'red'}
						py="1.5"
						px={['1.5', '1.5', '4', '4']}
						h="max-content"
						w="max-content"
						minW="max-content"
						color="white"
						gap="2"
						_hover={
							currentPage === quantityOfPages
								? { opacity: '0.2' }
								: { bgColor: 'red' }
						}
					>
						<MdArrowBack color="white" size={15} />
						<Text display={['none', 'none', 'unset', 'unset']}>Previous</Text>
					</PaginationPrevious>

					<PaginationPageGroup
						display="flex"
						alignItems="center"
						justifyContent="center"
						w="max"
						gap={['2', '2', '0', '0']}
					>
						{pages.map((page: number) => (
							<PaginationPage
								borderRadius="2rem"
								p="2"
								opacity="0.7"
								bgColor="transparent"
								_hover={{ bgColor: 'transparent' }}
								key={`pagination_page_${page}`}
								page={page}
								color={
									page === currentPage
										? 'cyan'
										: 'white'
								}
							/>
						))}
					</PaginationPageGroup>

					<PaginationNext
						borderRadius={['9999rem', '9999rem', '3rem', '3rem']}
						bgColor='red'
						py="1.5"
						px={['1.5', '1.5', '4', '4']}
						h="max-content"
						w="max-content"
						minW="max-content"
						color="white"
						gap="2"
						_hover={
							currentPage === quantityOfPages
								? { opacity: '0.2' }
								: { bgColor: 'white' }
						}
					>
						<Text display={['none', 'none', 'unset', 'unset']}>Next</Text>

						<MdArrowForward color="white" size={15} />
					</PaginationNext>
				</PaginationContainer>
			</ChakraPagination>
		</ChakraProvider>
	);
};
