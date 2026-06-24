import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.redirect(
                new URL("/login", process.env.NEXT_PUBLIC_BASE_URL!)
            );
        }

        await connectDB();

        const user = await User.findById(session.user.id);

        if (!user) {
            return NextResponse.redirect(
                new URL("/login", process.env.NEXT_PUBLIC_BASE_URL!)
            );
        }

        if (!user.hasSetUpPassword) {
            return NextResponse.redirect(
                new URL("/user/setup-password", process.env.NEXT_PUBLIC_BASE_URL!)
            );
        }

        if (!user.hasSetUpMasterKey) {
            return NextResponse.redirect(
                new URL("/user/setup-master-key", process.env.NEXT_PUBLIC_BASE_URL!)
            );
        }

        return NextResponse.redirect(
            new URL("/user/dashboard", process.env.NEXT_PUBLIC_BASE_URL!)
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: `Internal server error` },
            { status: 500 }
        )
    }
}