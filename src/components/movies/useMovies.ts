import { useCallback, useState } from "react";
import useSort, { Sort } from "../../helpers/useSort";
import { useQuery } from "react-query";
import { FetchMovies, Movie } from "../../api/movies";
import useFilter, { Filtering } from "../../helpers/useFilter";
import useFilteringSorting from "../table/useFilteringSorting";

type UseMovies = {
    movies: Movie[] | undefined;
    loading: {
        isLoading: boolean;
        isFetching: boolean;
        isError: boolean;
        error: any;
		refetch: () => void;
    };
    filtering: Filtering;
    filter: Record<string, string>[] | null;
    sort: Sort;
    sortField: string | undefined;
};


const useMovies = ():UseMovies => {
	const { filter, handleAddFilter, handleRemoveFilter, handleSort, sort, sortField } = useFilteringSorting();
	const {
		data: movies,
		isError,
		error,
		isLoading,
		isFetching,
		refetch
	} = useQuery(["movies"], FetchMovies, {
		select: useCallback(
			(data: Movie[]) => {
				return useSort(
					useFilter(data, filter || []),
					sort,
					sortField
				) as Movie[];
			},
			[sort, sortField, filter]
		),
	});

   

    return {
        movies,
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
        sortField,
    };

}

export default useMovies;