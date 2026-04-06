import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useUserStore = create()(persist((set) => ({
    name: "there",
    setName: (name) => set({ name: name.trim() || "there" }),
}), { name: "zorvyn_user" }));
