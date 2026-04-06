import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useRoleStore = create()(persist((set) => ({
    role: "viewer",
    setRole: (role) => set({ role }),
}), { name: "nexa_role" }));
