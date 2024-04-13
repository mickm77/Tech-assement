import { ColumnDef } from "./columnDef";
import css from "./table.module.css";

const TableFilter = ({
	column,
	filters,
}: {
	column: ColumnDef;
	filters: Record<string, string>[];
}) => {
	const filterValue = filters?.find((item) => item.field === column.field)?.value;
	const imFiltered = !!filterValue;
	return (
		<span className={css.filterIcon}>
			<svg
				enable-background='new 0 0 32 32'
				id='Editable-line'
				version='1.1'
				viewBox='0 0 32 32'
				width='12px'
				height='12px'
				style={imFiltered ? { stroke: "black" } : { stroke: "silver" }}
			>
				<path
					d='  M3.241,7.646L13,19v9l6-4v-5l9.759-11.354C29.315,6.996,28.848,6,27.986,6H4.014C3.152,6,2.685,6.996,3.241,7.646z'
					fill='none'
					id='XMLID_6_'
					stroke-linecap='round'
					stroke-linejoin='round'
					stroke-miterlimit='10'
					stroke-width='2'
				/>
			</svg>
			<div className={css.filter}>
				<input
					type='text'
					placeholder='Filter'
					onChange={(e) => column?.addFilter?.(column.field, e.target.value)}
					value={filterValue || ""}
				/>
				{imFiltered && (
					<button onClick={() => column?.removeFilter?.(column.field)}>X</button>
				)}
			</div>
		</span>
	);
};

export default TableFilter;
