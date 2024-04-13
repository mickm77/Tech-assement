
export type Sort = "asc" | "desc";

/**
 * Generic sort function
 * @param data An array of objects to sort
 * @param sort asc or desc
 * @param field The field to sort by
 * @returns 
 */
const useSort = <T>(data: T[], sort: Sort, field: string | undefined) => {
    const sorted = data.sort((a: T, b: T) => {
        if (field && a[field as keyof T] && b[field as keyof T]) {
            if (sort === "asc") {
                return a[field as keyof T] > b[field as keyof T] ? 1 : -1;
            }
            return a[field as keyof T] < b[field  as keyof T] ? 1 : -1;
        }
        return 0;
    });
    return sorted;
};

export default useSort;