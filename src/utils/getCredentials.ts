import { ICredential } from "@/types/credential.type";

export async function getCredentials(): Promise<ICredential[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/get-credentials`, {
        cache: "no-store"
    });

    if (!res.ok) {
        throw new Error("Failed to fetch credentials");
    }

    const json = await res.json();
    return json.data;
}