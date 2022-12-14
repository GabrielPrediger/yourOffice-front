import React from 'react';

export const handlePaginate = (
	arrayValue: any[],
	pageSize: number,
	currentPage: number,
	setCardsSliced: React.Dispatch<React.SetStateAction<any[]>>
) => {
	const sliced = arrayValue?.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	);

	setCardsSliced(sliced);

	return sliced;
};
