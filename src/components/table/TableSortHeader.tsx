import { ColumnDef } from "./columnDef";
import css from "./table.module.css";

type TableSortHeadCellProps = {
	column: ColumnDef;
	sortField: string | undefined;
	sortDirection: string;
	handleSort?: (field: string) => void;
};

const TableSortHeadCell = ({
	column,
	sortField,
	sortDirection,
	handleSort,
}: TableSortHeadCellProps) => (
	<button className={css.title} type='button' onClick={() => handleSort?.(column.field)}>
		{column.label}
		<span>{sortField === column.field ? (sortDirection === "asc" ? "▲" : "▼") : ""}</span>
	</button>
);

export default TableSortHeadCell;
