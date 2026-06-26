import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";



export const GET = async () => {
    try {
        const session = await auth()

        if (session?.user) {
            console.log("User:", session.user);
            console.log("User ID:", session.user.id);
        }

        if (!session?.user.id) {
            return NextResponse.json(
                { success: false, message: "Problem to Unauthorized Access" },
                { status: 404 }
            )
        }
        await connectDB()
        const existedUser = await User.findOne({ _id: session.user.id }).select("name email phone avatar createdAt").lean();
        return NextResponse.json(
            { success: true, message: "User Fetched Successfully", existedUser },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        )
    }
}