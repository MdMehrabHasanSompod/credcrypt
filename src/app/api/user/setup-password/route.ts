import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import { User } from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import * as bcrypt from "bcrypt";

export const PATCH = async (request: NextRequest) => {
    try {
        const { password } = await request.json()

        if (!password) {
            return NextResponse.json(
                { success: false, message: "Invalid request" },
                { status: 400 }
            )
        }

        if (password.length < 8) {
            return NextResponse.json(
                { success: false, message: "Password must be 8 characters" },
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

        const sessionUserId = session.user.id

        await connectDB()

        const sessionUser = await User.findById(sessionUserId);

        if (!sessionUser) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            )
        }

        if (sessionUser.hasSetUpPassword) {
            return NextResponse.json(
                { success: false, message: "Password already exists" },
                { status: 409 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const updatedUser = await User.findByIdAndUpdate(sessionUserId, {
            $set: {
                password: hashedPassword,
                hasSetUpPassword: true,
            }
        }, { returnDocument: "after", runValidators: true })



        return NextResponse.json(
            { success: true, message: "Password added successfully", updatedUser },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        )
    }
}