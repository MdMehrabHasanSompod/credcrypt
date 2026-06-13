"use client";
import { useCredentialStore } from "@/stores/credentials.store";
import { getCredentials } from "@/utils/getCredentials";
import { useSession } from "next-auth/react";
import { useEffect } from "react";


export default function CredentialsLoader() {
    const session = useSession();
    const setCredentials = useCredentialStore((state) => state.setCredentials)
    const clearCredentials = useCredentialStore((state) => state.clearCredentials)


    useEffect(() => {
        if (session.status === "authenticated" && session.data.user.id) {
            const loadCredentials = async () => {
                try {
                    const fetchedCredentials = await getCredentials()
                    setCredentials(fetchedCredentials)
                } catch (error) {
                    console.error("Failed to load credentials");
                }
            };

            loadCredentials();
        }
    }, [session.status, session.data?.user?.id, setCredentials]);


    useEffect(() => {
        if (session.status === "unauthenticated") {
            clearCredentials()
        }
    }, [session.status, clearCredentials]);

    return null;
}