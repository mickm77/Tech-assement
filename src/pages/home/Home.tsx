import { useState } from "react";
import MoviesTable from "../../components/movies/MoviesTable";
import useMovies from "../../components/movies/useMovies";
import css from "./home.module.css";
import { Movie } from "../../api/movies";
import Review from "../../components/review";
import StopPropagation from "../../components/stopPropagation/StopPropagation";

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
			<div className={css.mobileConstrain}>
				<MoviesTable setSelectedMovie={setSelectedMovie} selectedMovie={selectedMovie} />
			</div>
			{selectedMovie && (
				<div className={css.selectedMovie} onClick={() => setSelectedMovie(null)}>
					<StopPropagation>
						<div className={css.reviewBackground}>
							<h2>
								Add review for <em>{selectedMovie?.title}</em>
							</h2>
							<div className='framed'>
								<Review
									movieId={selectedMovie?.id || -1}
									afterSave={() => setSelectedMovie(null)}
									onCancel={() => setSelectedMovie(null)}
								/>
							</div>
						</div>
					</StopPropagation>
				</div>
			)}
		</div>
	);
};

export default Home;
