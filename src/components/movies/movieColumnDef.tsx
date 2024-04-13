import { Filtering } from "../../helpers/useFilter";
import { ColumnDef } from "../table/columnDef";
import { Link } from "react-router-dom";

const movieColumnDef = ({ handleSort, handleAddFilter, handleRemoveFilter }: Filtering) => {
	const columns: ColumnDef[] = [
		{ field: "id", label: "ID", sortable: false, filterable: false, hidden: true },
		{ field: "title", label: "Title", sortable: true, filterable: true },
		{
			field: "releaseYear",
			label: "Release Year",
			sortable: true,
			filterable: true,
			align: "center",
		},
		{ field: "cost", label: "Cost", sortable: true, filterable: false, align: "right" },
		{
			field: "averageReview",
			label: "Average Review",
			sortable: true,
			filterable: false,
			cellRenderer: (row) => row.averageReview.toFixed(1),
			align: "right",
		},
		{
			field: "company",
			label: "Company",
			sortable: true,
			filterable: true,
			cellRenderer: (row) => (
				<Link to={`/company/${row?.company?.id}`}>{row?.company?.name}</Link>
			),
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

export default movieColumnDef;
