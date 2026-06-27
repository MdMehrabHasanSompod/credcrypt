import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Credential } from "@/models/credential.model";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {

        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, message: "Attempted to unauthorized access" },
                { status: 401 }
            );
        }

        const sessionUserId = session.user.id

        await connectDB()

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