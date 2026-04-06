import { create } from "zustand";
import { persist } from "zustand/middleware";
const MOCK_RECURRING = [
    { id: "rec_1", description: "Primary Payroll", amount: 104000, type: "income", category: "salary", frequency: "monthly", startDate: "2024-01-01", nextDueDate: "2026-04-30", isActive: true, createdAt: new Date().toISOString() },
    { id: "rec_2", description: "Studio Lease Auto-Debit", amount: 30500, type: "expense", category: "housing", frequency: "monthly", startDate: "2024-01-01", nextDueDate: "2026-04-03", isActive: true, createdAt: new Date().toISOString() },
    { id: "rec_3", description: "Cloud Apps Suite", amount: 1299, type: "expense", category: "utilities", frequency: "monthly", startDate: "2024-03-01", nextDueDate: "2026-04-19", isActive: true, createdAt: new Date().toISOString() },
    { id: "rec_4", description: "Strength Lab Membership", amount: 1800, type: "expense", category: "health", frequency: "monthly", startDate: "2024-01-01", nextDueDate: "2026-04-24", isActive: true, createdAt: new Date().toISOString() },
    { id: "rec_5", description: "Mobile Data Plan", amount: 899, type: "expense", category: "utilities", frequency: "monthly", startDate: "2024-01-01", nextDueDate: "2026-04-15", isActive: false, createdAt: new Date().toISOString() },
];
let idCounter = 1;
function generateId() { return `rec_${Date.now()}_${idCounter++}`; }
export const useRecurringStore = create()(persist((set) => ({
    items: MOCK_RECURRING,
    addItem: (item) => set((s) => ({ items: [{ ...item, id: generateId(), createdAt: new Date().toISOString() }, ...s.items] })),
    updateItem: (id, patch) => set((s) => ({ items: s.items.map((r) => r.id === id ? { ...r, ...patch } : r) })),
    deleteItem: (id) => set((s) => ({ items: s.items.filter((r) => r.id !== id) })),
    toggleActive: (id) => set((s) => ({ items: s.items.map((r) => r.id === id ? { ...r, isActive: !r.isActive } : r) })),
    updateNextDueDate: (id, nextDueDate) => set((s) => ({ items: s.items.map((r) => r.id === id ? { ...r, nextDueDate } : r) })),
}), {
    name: "nexa_recurring",
    onRehydrateStorage: () => (state) => {
        if (state && state.items.length === 0)
            state.items = MOCK_RECURRING;
    },
}));
