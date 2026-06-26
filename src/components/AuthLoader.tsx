"use client";
import { useUserStore } from "@/stores/user.store";
import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import { getUser } from "../utils/getUser";


export default function AuthLoader() {
    const session = useSession();
    const setUser = useUserStore((state) => state.setUser);
    const clearUser = useUserStore((state) => state.clearUser);

    const clearRole = useCallback(() => {
        clearUser();
    }, [clearUser]);

    useEffect(() => {
        if (session.status === "authenticated" && session.data.user) {
            const loadUser = async () => {
                try {
                    const fetchedUser = await getUser();
                    clearRole();
                    setUser(fetchedUser);

                } catch (error) {
                    console.error("Failed to load session user:", error);
                }
            };

            loadUser();
        }

        if (session.status === "unauthenticated") {
            clearRole();
        }
    }, [session.status, session.data, setUser, clearRole]);

    return null;
}