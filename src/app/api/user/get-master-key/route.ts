import { auth } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, message: "Unauthorized attempt" },
                { status: 401 }
            );
        }

        const key = `credcrypt-masterKey-${session.user.id}`;

        const masterKey = await redis.get<string>(key);

        if (!masterKey) {
            return NextResponse.json(
                { success: false, message: "Master Key not found" },
                { status: 404 }
            );
        }

        await redis.del(key);

        return NextResponse.json({ success: true, message: "Master Key fetched successfully", masterKey },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        )
    }
}