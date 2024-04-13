import useMovies from "./useMovies";
import movieColumnDef from "./movieColumnDef";
import Table from "../table";
import { useState } from "react";
import { Movie } from "../../api/movies";
import css from "./movies.module.css";

const MoviesTable = () => {
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
	const { movies, filter, loading: movieLoading, filtering, sort, sortField } = useMovies();
	if (movieLoading.isError) {
		return <div className={css.dataError}>Error Loading data</div>;
	}

	const columns = movieColumnDef(filtering);

	return (
		<Table
			data={movies || []}
			columns={columns}
			sort={sort}
			sortField={sortField}
			filter={filter || []}
			isLoading={movieLoading.isLoading}
			rowSelected={setSelectedMovie}
		/>
	);
};

export default MoviesTable;
