import { Filtering } from "../../helpers/useFilter";
import { ColumnDef } from "../table/columnDef";
import { Link } from "react-router-dom";

const companyColumnDef = ({ handleSort, handleAddFilter, handleRemoveFilter }: Filtering) => {
	const columns: ColumnDef[] = [
		{ field: "id", label: "ID", sortable: false, filterable: false, hidden: true },
		{ field: "name", label: "Name", sortable: true, filterable: true },
		{
			field: "movies",
			label: "Movies",
			sortable: false,
			filterable: true,
			cellRenderer: (row) =>
				row?.movies?.map((movie: any) => (
					<div>
						<Link to={`/movies/${movie.id}`}>{movie.title}</Link>
					</div>
				)),
		},
	];

	columns.forEach((column) => {
		if (column.sortable) {
			column.sort = handleSort;
		}
		if (column.filterable) {
			column.addFilter = handleAddFilter;
			column.removeFilter = handleRemoveFilter;
		}
	});

	return columns;
};

export default companyColumnDef;
