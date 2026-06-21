import { auth } from "@/lib/auth";
import { hashMasterKey } from "@/lib/crypto";
import connectDB from "@/lib/db";
import { User } from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const session = await auth();
        const { masterKey } = await request.json()


        if (!session?.user?.id || !masterKey) {
            return NextResponse.json(
                { success: false, message: "Unauthorized attempt" },
                { status: 401 }
            );
        }

        const sessionUserId = session.user.id

        await connectDB()

        const sessionUser = await User.findById(sessionUserId).select("+masterKeySalt +masterKeyHash");

        if (!sessionUser) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            )
        }

        const masterKeyHash = hashMasterKey(masterKey, sessionUser.masterKeySalt)

        if (sessionUser.masterKeyHash !== masterKeyHash) {
            return NextResponse.json(
                { success: false, message: "Attempted to unauthorized access" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Master Key Verified Successfully" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        )
    }
}