import { IUser } from "@/types/user.type";

export async function getUser(): Promise<IUser> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/get-user`, {
        cache: "no-store"
    });

    if (!res.ok) {
        throw new Error("Failed to fetch User");
    }

    const json = await res.json();
    return json.existedUser;
}