import { create } from "zustand";
import { persist } from "zustand/middleware";
const MOCK_BILLS = [
    { id: "bill_1", name: "Studio Lease", amount: 30500, dueDate: "2026-04-03", category: "housing", isPaid: false, isRecurring: true, frequency: "monthly", createdAt: new Date().toISOString() },
    { id: "bill_2", name: "Co-working Seat", amount: 4200, dueDate: "2026-04-07", category: "utilities", isPaid: false, isRecurring: true, frequency: "monthly", createdAt: new Date().toISOString() },
    { id: "bill_3", name: "Fiber Internet Pro", amount: 1599, dueDate: "2026-04-11", category: "utilities", isPaid: false, isRecurring: true, frequency: "monthly", createdAt: new Date().toISOString() },
    { id: "bill_4", name: "Family Health Cover", amount: 6200, dueDate: "2026-04-15", category: "health", isPaid: false, isRecurring: true, frequency: "monthly", createdAt: new Date().toISOString() },
    { id: "bill_5", name: "Cloud Apps Suite", amount: 1299, dueDate: "2026-04-19", category: "education", isPaid: false, isRecurring: true, frequency: "monthly", createdAt: new Date().toISOString() },
    { id: "bill_6", name: "Strength Lab Membership", amount: 1800, dueDate: "2026-04-24", category: "health", isPaid: false, isRecurring: true, frequency: "monthly", createdAt: new Date().toISOString() },
    { id: "bill_7", name: "Bike Insurance", amount: 6900, dueDate: "2026-05-28", category: "transport", isPaid: false, isRecurring: true, frequency: "yearly", createdAt: new Date().toISOString() },
    { id: "bill_8", name: "Water + Maintenance", amount: 1250, dueDate: "2026-03-29", category: "utilities", isPaid: false, isRecurring: true, frequency: "monthly", createdAt: new Date().toISOString() },
];
let idCounter = 1;
function generateId() { return `bill_${Date.now()}_${idCounter++}`; }
export const useBillStore = create()(persist((set) => ({
    bills: MOCK_BILLS,
    addBill: (b) => set((s) => ({ bills: [{ ...b, id: generateId(), createdAt: new Date().toISOString() }, ...s.bills] })),
    updateBill: (id, patch) => set((s) => ({ bills: s.bills.map((b) => b.id === id ? { ...b, ...patch } : b) })),
    deleteBill: (id) => set((s) => ({ bills: s.bills.filter((b) => b.id !== id) })),
    markPaid: (id) => set((s) => ({ bills: s.bills.map((b) => b.id === id ? { ...b, isPaid: true } : b) })),
}), {
    name: "nexa_bills",
    onRehydrateStorage: () => (state) => {
        if (state && state.bills.length === 0)
            state.bills = MOCK_BILLS;
    },
}));
