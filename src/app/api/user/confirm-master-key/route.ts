import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export const PATCH = async () => {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, message: "Attempted unauthorized access" },
                { status: 401 }
            );
        }

        await connectDB();

        const result = await User.findByIdAndUpdate(session.user.id, { $set: { hasSetUpMasterKey: true } });

        return NextResponse.json({
            success: true,
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: `Internal server error` },
            { status: 500 }
        )
    }
}