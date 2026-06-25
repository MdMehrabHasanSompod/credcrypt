import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import { User } from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import * as bcrypt from "bcrypt";

export const PATCH = async (request: NextRequest) => {
    try {
        const { password, newPassword } = await request.json()

        if (!password || !newPassword) {
            return NextResponse.json(
                { success: false, message: "Invalid request" },
                { status: 400 }
            )
        }

        if (newPassword.length < 8) {
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

        const sessionUser = await User.findById(sessionUserId).select("+password");

        if (!sessionUser) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            )
        }


        if (!sessionUser.hasSetUpPassword || !sessionUser.password) {
            return NextResponse.json(
                { success: false, message: "Password doesn't exist" },
                { status: 409 }
            )
        }

        const isPasswordMatched = await bcrypt.compare(password, sessionUser.password)

        if (!isPasswordMatched) {
            return NextResponse.json(
                { success: false, message: "Unauthorized attempt" },
                { status: 401 }
            );
        }

        const isSamePassword = await bcrypt.compare(newPassword, sessionUser.password);

        if (isSamePassword) {
            return NextResponse.json(
                {
                    success: false,
                    message: "New password must be different from the current password",
                },
                { status: 400 }
            );
        }


        const hashedNewPassword = await bcrypt.hash(newPassword, 10)

        const updatedUser = await User.findByIdAndUpdate(sessionUserId, {
            $set: {
                password: hashedNewPassword,
                hasSetUpPassword: true,
            }
        }, { returnDocument: "after", runValidators: true })



        return NextResponse.json(
            { success: true, message: "Password updated successfully" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        )
    }
}