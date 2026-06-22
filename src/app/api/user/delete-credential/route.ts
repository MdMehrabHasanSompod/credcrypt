import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Credential } from "@/models/credential.model";
import { auth } from "@/lib/auth";
import mongoose from "mongoose";
import { User } from "@/models/user.model";
import { hashMasterKey } from "@/lib/crypto";

export const DELETE = async (request: NextRequest) => {
    try {
        const { masterKey, credId } = await request.json()

        if (!credId?.trim()) {
            return NextResponse.json(
                { success: false, message: "Invalid request" },
                { status: 400 }
            )
        }

        if (!mongoose.Types.ObjectId.isValid(credId)) {
            return NextResponse.json(
                { success: false, message: "Invalid credential id" },
                { status: 400 }
            );
        }

        const session = await auth();

        if (!session?.user?.id || !masterKey) {
            return NextResponse.json(
                { success: false, message: "Unauthorized attempt" },
                { status: 401 }
            );
        }


        const sessionUserId = session.user.id;


        await connectDB();
        const sessionUser = await User.findById(sessionUserId).select("+masterKeySalt +masterKeyHash");

        if (!sessionUser) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            )
        }

        const masterKeyHash = hashMasterKey(masterKey, sessionUser.masterKeySalt)

        if (sessionUser.masterKeyHash !== masterKeyHash) {
            return NextResponse.json(
                { success: false, message: "Attempted to unauthorized access" },
                { status: 401 }
            );
        }


        const deletedCredential = await Credential.findOneAndDelete({ _id: credId, userId: sessionUserId, })

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