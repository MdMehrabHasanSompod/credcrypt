import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Credential } from "@/models/credential.model";
import { auth } from "@/lib/auth";

export const POST = async (request: NextRequest) => {
    try {
        const { name, email, type } = await request.json()

        if (!name || !type) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            )
        }


        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, message: "Unauthorized attempt" },
                { status: 401 }
            );
        }

        const sessionUserId = session.user.id;

        await connectDB();

        await Credential.deleteOne({
            userId: sessionUserId,
            name,
            email,
            type

        })

        return NextResponse.json({
            success: true, message: "Credential removed successfully"
        }, { status: 201 })

    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Credential doesn't exists",
                },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        )
    }
}