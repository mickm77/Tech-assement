import { useCallback, useState } from "react";
import useSort, { Sort } from "../../helpers/useSort";
import useFilter from "../../helpers/useFilter";
import { useQuery } from "react-query";
import { FetchMovieCompanies, MovieCompany } from "../../api/companies";
import useFilteringSorting from "../table/useFilteringSorting";


const useMovieCompanies = () => {
    const { filter, handleAddFilter, handleRemoveFilter, handleSort, sort, sortField } = useFilteringSorting();
	const {
		data: companies,
		isError,
		error,
		isLoading,
		isFetching,
		refetch
	} = useQuery(["companies"], FetchMovieCompanies, {
		select: useCallback(
			(data: MovieCompany[]) => {
				return useSort(
					useFilter(data, filter || []),
					sort,
					sortField
				) as MovieCompany[];
			},
			[sort, sortField, filter]
		),
	});

    return {
        companies,
        loading: {
            isLoading,
            isFetching,
            isError,
            error,
            refetch
        },
        filtering: {
            handleAddFilter,
            handleRemoveFilter,
            handleSort
        },
        filter,
        sort,
        sortField
    };
    
}

export default useMovieCompanies;