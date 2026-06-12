import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Credential } from "@/models/credential.model";
import { auth } from "@/lib/auth";
import mongoose from "mongoose";

export const DELETE = async (request: NextRequest, { params }: { params: { credentialId: string } }) => {
    try {
        const credentialId = params.credentialId

        if (!credentialId?.trim()) {
            return NextResponse.json(
                { success: false, message: "Invalid request" },
                { status: 400 }
            )
        }

        if (!mongoose.Types.ObjectId.isValid(credentialId)) {
            return NextResponse.json(
                { success: false, message: "Invalid credential id" },
                { status: 400 }
            );
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

        const deletedCredential = await Credential.findOneAndDelete({ _id: credentialId, userId: sessionUserId })

        if (!deletedCredential) {
            return NextResponse.json(
                { success: false, message: "Credential not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true, message: "Credential deleted successfully"
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        )
    }
}