

export type ColumnDef = {
    field: string;
    label: string;
    sortable: boolean;
    filterable: boolean;
    sort?: (field: string) => void;
    addFilter?: (field: string, value: string) => void;
    removeFilter?: (field: string) => void;
    cellRenderer?: (row: any) => string | JSX.Element;
    hidden?: boolean;
    align?: "left" | "center" | "right";
};


