import { useState } from "react";
import { ColumnDef } from "./columnDef";
import css from "./table.module.css";
import TableHead from "./TableHead";

type TableProps<T> = {
	data: T[];
	columns: ColumnDef[];
	sort: string;
	sortField?: string;
	filter?: Record<string, string>[];
	isLoading: boolean;
	rowSelected?: (row: T) => void;
	highlightRow?: number | null;
};

const Table = <T extends any>({
	data,
	columns,
	sort,
	sortField,
	filter,
	isLoading,
	rowSelected,
	highlightRow,
}: TableProps<T>) => {
	// const [selectedRow, setSelectedRow] = useState<T | null>(null);

	const handleRowClick = (row: T) => {
		rowSelected?.(row);
	};

	return (
		<table className={css.table}>
			<TableHead
				columns={columns}
				sortDirection={sort}
				sortField={sortField}
				filters={filter}
			/>

			<tbody>
				{isLoading && (
					<tr>
						<td colSpan={columns.length} className={css.tableCell}>
							Loading...
						</td>
					</tr>
				)}
				{!isLoading && data.length === 0 && (
					<tr>
						<td colSpan={columns.length} className={css.tableCell}>
							No data
						</td>
					</tr>
				)}
				{!isLoading &&
					data?.map((row) => (
						<tr
							key={(row as { id: string }).id}
							onClick={() => handleRowClick(row)}
							className={
								highlightRow === (row as { id: Number })?.id ? css.selected : ""
							}
						>
							{columns
								.filter((x) => !x.hidden)
								.map((column) => {
									const alignClass =
										column.align === "right"
											? css.overrideRight
											: column.align === "center"
											? css.overrideCenter
											: css.overrideLeft;
									return (
										<td
											key={column.field}
											className={`${css.tableCell} ${alignClass}`}
										>
											{column.cellRenderer
												? column.cellRenderer(row)
												: (row as Record<string, any>)[column.field]}
										</td>
									);
								})}
						</tr>
					))}
			</tbody>
		</table>
	);
};

export default Table;
