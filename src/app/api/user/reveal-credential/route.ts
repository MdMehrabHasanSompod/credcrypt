import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Credential } from "@/models/credential.model";
import { User } from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const session = await auth();
        const { masterKey, selectedCredId } = await request.json()

        if (!selectedCredId) {
            return NextResponse.json(
                { success: false, message: "Invalid request" },
                { status: 400 }
            );
        }

        if (!session?.user?.id || !masterKey) {
            return NextResponse.json(
                { success: false, message: "Unauthorized attempt" },
                { status: 401 }
            );
        }

        const sessionUserId = session.user.id

        await connectDB()

        const sessionUser = await User.findById(sessionUserId);

        if (sessionUser.masterKey !== masterKey) {
            return NextResponse.json(
                { success: false, message: "Attempted to unauthorized access" },
                { status: 401 }
            );
        }

        const credentials = await Credential.find({ userId: sessionUserId }).select("-value -userId -__v").sort({ name: 1 }).lean();
        
        return NextResponse.json(
            { success: true, message: "Credentials Fetched Successfully", data: credentials },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        )
    }
}