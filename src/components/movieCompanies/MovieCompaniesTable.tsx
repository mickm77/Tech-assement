import { useMovieCompanies } from ".";
import ErrorBox from "../errorBox/ErrorBox";
import Table from "../table";
import companyColumnDef from "./companyColumnDef";

const MovieCompaniesTable = () => {
	const { companies, filter, filtering, loading, sort, sortField } = useMovieCompanies();

	if (loading.isError) {
		return <ErrorBox error='Error Loading Data' />;
	}

	const columns = companyColumnDef(filtering);

	return (
		<Table
			columns={columns}
			data={companies || []}
			isLoading={loading.isLoading}
			filter={filter || []}
			sort={sort}
			sortField={sortField}
		/>
	);
};

export default MovieCompaniesTable;
