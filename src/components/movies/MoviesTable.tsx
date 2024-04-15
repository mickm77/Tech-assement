import useMovies from "./useMovies";
import movieColumnDef from "./movieColumnDef";
import Table from "../table";
import { useState } from "react";
import { Movie } from "../../api/movies";
import ErrorBox from "../errorBox/ErrorBox";

type MoviesTableProps = {
	selectedMovie: Movie | null;
	setSelectedMovie: (movie: Movie) => void;
};

const MoviesTable = ({ selectedMovie, setSelectedMovie }: MoviesTableProps) => {
	const { movies, filter, loading: movieLoading, filtering, sort, sortField } = useMovies();
	if (movieLoading.isError) {
		return <ErrorBox error='Error Loading Data' />;
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
			highlightRow={selectedMovie?.id}
		/>
	);
};

export default MoviesTable;
