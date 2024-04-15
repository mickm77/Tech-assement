import { useState } from "react";
import { Sort } from "../../helpers/useSort";


const useFilteringSorting = () => {
    const [sort, setSort] = useState<Sort>("asc");
    const [sortField, setSortField] = useState<string | undefined>(undefined);
    const [filter, setFilter] = useState<Record<string, string>[] | null>(null);

    const handleAddFilter = (field: string, value: string) => {
        if (filter) {
            const existingFilter = filter.find((item) => item.field === field);
            if (existingFilter) {
                const updatedFilter = filter.map((item) => {
                    if (item.field === field) {
                        return { ...item, value };
                    }
                    return item;
                });
                setFilter(updatedFilter);
            } else {
                setFilter([...filter, { field, value }]);
            }
        } else {
            setFilter([{ field, value }]);
        }
    };

    const handleRemoveFilter = (field: string) => {
        if (filter) {
            setFilter(filter.filter((item) => item.field !== field));
        }
    };

    const handleSort = (field: string) => {
        setSort((current) =>
            // if it's a new field sort ascending, otherwise toggle
            sortField === field ? (current === "asc" ? "desc" : "asc") : "asc"
        );
        setSortField(field);
    };

    return {
        filter,
        sort,
        sortField,
        handleAddFilter,
        handleRemoveFilter,
        handleSort,
    };
}

export default useFilteringSorting;