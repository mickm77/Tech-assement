import { useCallback, useState } from "react";
import useSort, { Sort } from "../../helpers/useSort";
import { useQuery } from "react-query";
import { FetchMovies, Movie } from "../../api/movies";
import useFilter, { Filtering } from "../../helpers/useFilter";

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
	const [sort, setSort] = useState<Sort>("asc");
	const [sortField, setSortField] = useState<string | undefined>(undefined);
	const [filter, setFilter] = useState<Record<string, string>[] | null>(null);
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

    const handleAddFilter = (field: string, value: string) => {
		if (filter) {
			const existingFilter = filter.find((item) => item.field === field);
			if (existingFilter) {
				const updatedFilter = filter.map((item) => {
					if (item.field === field) {
						return { ...item, value };
					}
					return item;
				});
				setFilter(updatedFilter);
			} else {
				setFilter([...filter, { field, value }]);
			}
		} else {
			setFilter([{ field, value }]);
		}
	};

	const handleRemoveFilter = (field: string) => {
		if (filter) {
			setFilter(filter.filter((item) => item.field !== field));
		}
	};

	const handleSort = (field: string) => {
        setSort((current) =>
            // if it's a new field sort ascending, otherwise toggle
			sortField === field ? (current === "asc" ? "desc" : "asc") : "asc"
		);
		setSortField(field);
	};

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