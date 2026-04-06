import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_TRANSACTIONS } from "@/lib/mockData";
let idCounter = 1;
function generateId() {
    return `tx_${Date.now()}_${idCounter++}`;
}
export const useTransactionStore = create()(persist((set) => ({
    transactions: MOCK_TRANSACTIONS,
    addTransaction: (t) => set((state) => ({
        transactions: [
            {
                ...t,
                id: generateId(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            ...state.transactions,
        ],
    })),
    updateTransaction: (id, patch) => set((state) => ({
        transactions: state.transactions.map((t) => t.id === id ? { ...t, ...patch, updatedAt: new Date().toISOString() } : t),
    })),
    deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
    })),
    resetToMockData: () => set({ transactions: MOCK_TRANSACTIONS }),
}), {
    name: "zorvyn_transactions",
    onRehydrateStorage: () => (state) => {
        // Seed with mock data if storage is empty
        if (state && state.transactions.length === 0) {
            state.transactions = MOCK_TRANSACTIONS;
        }
    },
}));
