import { create } from "zustand";
const DEFAULT_FILTERS = {
    search: "",
    type: "all",
    category: "all",
    dateFrom: null,
    dateTo: null,
    sortField: "date",
    sortDirection: "desc",
};
export const useFilterStore = create()((set, get) => ({
    ...DEFAULT_FILTERS,
    setSearch: (search) => set({ search }),
    setType: (type) => set({ type }),
    setCategory: (category) => set({ category }),
    setDateRange: (dateFrom, dateTo) => set({ dateFrom, dateTo }),
    setSortField: (sortField) => set({ sortField }),
    setSortDirection: (sortDirection) => set({ sortDirection }),
    toggleSort: (field) => {
        const { sortField, sortDirection } = get();
        if (sortField === field) {
            set({ sortDirection: sortDirection === "asc" ? "desc" : "asc" });
        }
        else {
            set({ sortField: field, sortDirection: "desc" });
        }
    },
    resetFilters: () => set(DEFAULT_FILTERS),
}));
