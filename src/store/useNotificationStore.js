import { create } from "zustand";
import { persist } from "zustand/middleware";
let idCounter = 1;
function generateId() { return `notif_${Date.now()}_${idCounter++}`; }
export const useNotificationStore = create()(persist((set, get) => ({
    notifications: [],
    addNotification: (n) => set((s) => ({
        notifications: [
            { ...n, id: generateId(), timestamp: new Date().toISOString(), isRead: false },
            ...s.notifications,
        ],
    })),
    markRead: (id) => set((s) => ({ notifications: s.notifications.map((n) => n.id === id ? { ...n, isRead: true } : n) })),
    markAllRead: () => set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, isRead: true })) })),
    dismiss: (id) => set((s) => ({ notifications: s.notifications.filter((n) => n.id !== id) })),
    clearAll: () => set({ notifications: [] }),
    unreadCount: () => get().notifications.filter((n) => !n.isRead).length,
}), { name: "zorvyn_notifications" }));
