import TableFilter from "./TableFilter";
import TableSortHeadCell from "./TableSortHeader";
import { ColumnDef } from "./columnDef";
import css from "./table.module.css";

type TableHeadProps = {
	columns: ColumnDef[];
	sortDirection: string;
	sortField: string | undefined;
	filters?: Record<string, string>[] | null;
};

const TableHead = ({ columns, sortDirection, sortField, filters }: TableHeadProps) => {
	return (
		<thead className={css.tableHead}>
			<tr>
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
							<th className={`${css.tableCell} ${alignClass}`} key={column.field}>
								<div className={css.headRow}>
									{!column.sortable && column.label}
									{column.sortable && (
										<TableSortHeadCell
											column={column}
											sortField={sortField}
											sortDirection={sortDirection}
											handleSort={column.sort}
										/>
									)}
									{column.filterable && (
										<TableFilter column={column} filters={filters || []} />
									)}
								</div>
							</th>
						);
					})}
			</tr>
		</thead>
	);
};

export default TableHead;
