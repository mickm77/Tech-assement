import MovieCompaniesTable, { useMovieCompanies } from "../../components/movieCompanies";
import css from "./companies.module.css";

const Companies = () => {
	const {
		companies,
		loading: { isLoading, refetch },
	} = useMovieCompanies();
	const handleRetry = () => refetch();

	return (
		<div className={css.page}>
			<div className={css.infoRow}>
				<p>A list of the movie companies</p>
				{!isLoading && (
					<button type='button' className='accentButton' onClick={handleRetry}>
						{companies ? "Refresh" : "Retry"}
					</button>
				)}
			</div>
			<MovieCompaniesTable />
		</div>
	);

	return <MovieCompaniesTable />;
};

export default Companies;
