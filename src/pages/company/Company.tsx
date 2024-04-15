import { Link, useParams } from "react-router-dom";
import css from "./company.module.css";
import { useQuery } from "react-query";
import { FetchMovieCompany, MovieCompanyWithMovies } from "../../api/company";

const Company = () => {
	const { id } = useParams();
	const companyId = parseInt(id || "-1");
	console.log(companyId, "sfsd");
	const { data, isError, isLoading } = useQuery<MovieCompanyWithMovies>(
		["company", id],
		() => FetchMovieCompany(companyId),
		{
			enabled: !!companyId && companyId > 0,
		}
	);

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error fetching company info</div>;
	if (!data) return <div>Company not found</div>;

	return (
		<div>
			<h1 className={css.title}>{data.name}</h1>
			<p className={css.info}>
				<span>Number of movies: </span>
				{new Intl.NumberFormat().format(data.movies.length)}
			</p>

			<h2>Movies</h2>
			{data.movies.map((movie) => (
				<div key={movie.id} className={css.movie}>
					<Link to={`/movies/${movie.id}`}>{movie.title}</Link>
					<div className={css.year}>{movie.releaseYear}</div>
				</div>
			))}
		</div>
	);
};

export default Company;
