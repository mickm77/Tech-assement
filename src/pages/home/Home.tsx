import { useState } from "react";
import MoviesTable from "../../components/movies/MoviesTable";
import useMovies from "../../components/movies/useMovies";
import css from "./home.module.css";
import { Movie } from "../../api/movies";

const Home = () => {
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

	const {
		movies,
		loading: { isLoading, refetch },
	} = useMovies();
	const handleRetry = () => refetch();

	return (
		<div className={css.homePage}>
			<div className={css.infoRow}>
				<p>A list of all our favourite movies</p>
				{!isLoading && (
					<button type='button' className='accentButton' onClick={handleRetry}>
						{movies ? "Refresh" : "Retry"}
					</button>
				)}
			</div>
			<MoviesTable setSelectedMovie={setSelectedMovie} selectedMovie={selectedMovie} />
		</div>
	);
};

export default Home;
