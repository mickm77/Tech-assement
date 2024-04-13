

export type Filtering = {
    handleAddFilter: (field: string, value: string) => void;
    handleRemoveFilter: (field: string) => void;
    handleSort: (field: string) => void;
};

/**
 * Filter an array of objects by a field and value
 * @param data An array of objects to filter
 * @param filters An array field and value pairs to filter by
 * @returns filtered data
 */
const useFilter = (data: any[], filters: Record<string, string>[]) => {
	if (filters.length === 0) {
		return data;
	}
	return data.filter((item) => {
		return filters.every((filter) => {
			return item[filter.field]
                ?.toString()
				?.toLowerCase()
				.includes(filter.value.toLowerCase());
		});
	});
};

export default useFilter;
