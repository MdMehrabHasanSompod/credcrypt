import connectDB from "@/lib/db";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";



export const GET = async (request: NextRequest) => {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json(
                { success: false, message: "Attempted to Unauthorized Access" },
                { status: 401 }
            )
        }
        await connectDB()
        const existedUser = await User.findOne({ _id: id }).select("name email phone avatar createdAt").lean();
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