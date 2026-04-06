import { create } from "zustand";
import { persist } from "zustand/middleware";
const MOCK_GOALS = [
    { id: "goal_1", name: "12-Month Safety Buffer", targetAmount: 300000, savedAmount: 145000, deadline: "2026-12-31", category: "other", color: "#6366f1", createdAt: new Date().toISOString() },
    { id: "goal_2", name: "Japan Photo Expedition", targetAmount: 180000, savedAmount: 52000, deadline: "2027-03-15", category: "entertainment", color: "#f59e0b", createdAt: new Date().toISOString() },
    { id: "goal_3", name: "Creator Workstation Upgrade", targetAmount: 160000, savedAmount: 78000, deadline: "2026-10-30", category: "shopping", color: "#10b981", createdAt: new Date().toISOString() },
    { id: "goal_4", name: "Home Studio Down Payment", targetAmount: 900000, savedAmount: 210000, deadline: "2028-01-15", category: "housing", color: "#ef4444", createdAt: new Date().toISOString() },
];
let idCounter = 1;
function generateId() { return `goal_${Date.now()}_${idCounter++}`; }
export const useGoalStore = create()(persist((set) => ({
    goals: MOCK_GOALS,
    addGoal: (g) => set((s) => ({ goals: [{ ...g, id: generateId(), createdAt: new Date().toISOString() }, ...s.goals] })),
    updateGoal: (id, patch) => set((s) => ({ goals: s.goals.map((g) => g.id === id ? { ...g, ...patch } : g) })),
    deleteGoal: (id) => set((s) => ({ goals: s.goals.filter((g) => g.id !== id) })),
    addSavings: (id, amount) => set((s) => ({
        goals: s.goals.map((g) => g.id === id ? { ...g, savedAmount: Math.min(g.savedAmount + amount, g.targetAmount) } : g)
    })),
}), {
    name: "nexa_goals",
    onRehydrateStorage: () => (state) => {
        if (state && state.goals.length === 0)
            state.goals = MOCK_GOALS;
    },
}));
