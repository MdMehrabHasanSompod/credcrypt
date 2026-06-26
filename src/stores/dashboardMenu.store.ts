import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DashboardMenu =
    | "dashboard"
    | "add-credential"
    | "all-credentials"
    | "settings";

interface DashboardStore {
    currentMenu: DashboardMenu;
    setCurrentMenu: (menu: DashboardMenu) => void;
}

interface ToggleSidebarStore {
    toggleSidebar: boolean;
    setToggleSidebar: () => void;
}

export const useDashboardStore = create<DashboardStore>()(
    persist(
        (set) => ({
            currentMenu: "dashboard",
            setCurrentMenu: (menu) => set({ currentMenu: menu }),
        }),
        {
            name: "dashboard-menu",
        }
    )
);

export const useToggleSidebarStore = create<ToggleSidebarStore>()(
    persist(
        (set) => ({
            toggleSidebar: false,
            setToggleSidebar: () => set((state) => ({ toggleSidebar: !state.toggleSidebar })),
        }),
        {
            name: "toggle-state",
        }
    )
);