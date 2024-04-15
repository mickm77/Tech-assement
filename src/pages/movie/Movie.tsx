import { useParams } from "react-router-dom";
import { FetchMovie, MovieWithReviews } from "../../api/movie";
import { useQuery } from "react-query";
import css from "./movie.module.css";
import Review from "../../components/review";

const Movie = () => {
	const { id } = useParams();
	const movieId = parseInt(id || "-1");
	const { data, isError, isLoading, refetch } = useQuery<MovieWithReviews>(
		["movie", id],
		() => FetchMovie(movieId),
		{
			enabled: !!movieId && movieId > 0,
		}
	);
	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error fetching movie</div>;
	if (!data) return <div>Movie not found</div>;

	return (
		<div>
			<h1 className={css.title}>
				{data.title} ({data.releaseYear})
			</h1>
			<p className={css.info}>
				<span>Cost to make: </span>${new Intl.NumberFormat().format(data.cost * 1000)}
			</p>
			<p className={css.info}>
				<span>Average Review: </span>
				{data.averageReview?.toFixed(1)}
			</p>
			<h2>Reviews</h2>

			{data.reviews.map((review) => (
				<div key={review.id} className={css.review}>
					<div className={css.comment}>{review.review}</div>
					<div className={css.score}>
						<span>{review.score}</span>/10
					</div>
				</div>
			))}
			<h2>Add a review</h2>
			<div className='framed'>
				<Review movieId={movieId} refetch={refetch} />
			</div>
		</div>
	);
};

export default Movie;
