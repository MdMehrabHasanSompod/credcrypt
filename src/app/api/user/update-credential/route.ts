import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Credential } from "@/models/credential.model";
import { auth } from "@/lib/auth";
import { encrypt, hashMasterKey } from "@/lib/crypto";
import { ICredential } from "@/types/credential.type";
import { User } from "@/models/user.model";

export const PATCH = async (request: NextRequest) => {
    try {
        const { masterKey, credentialId, updatedName, updatedEmail, updatedType, updatedValue } = await request.json()

        if (!updatedName?.trim() && !updatedType?.trim() && !updatedValue?.trim() && !updatedEmail?.trim()) {
            return NextResponse.json(
                { success: false, message: "No update fields provided" },
                { status: 400 }
            )
        }

        if (!credentialId?.trim()) {
            return NextResponse.json(
                { success: false, message: "Invalid request" },
                { status: 400 }
            )
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

        const valuesToUpdate: Partial<ICredential> = {}

        if (updatedName?.trim()) valuesToUpdate.name = updatedName
        if (updatedEmail?.trim()) valuesToUpdate.email = updatedEmail
        if (updatedType?.trim()) valuesToUpdate.type = updatedType
        if (updatedValue?.trim()) {
            valuesToUpdate.value = encrypt(updatedValue)
        }

        const updatedCredential = await Credential.findOneAndUpdate({ _id: credentialId, userId: sessionUserId },
            {
                $set: valuesToUpdate
            }, { new: true, runValidators: true })

        if (!updatedCredential) {
            return NextResponse.json(
                { success: false, message: "Credential not found" },
                { status: 404 }
            );
        }

        const safeUpdatedCredential = {
            _id: updatedCredential._id,
            userId: updatedCredential.userId,
            name: updatedCredential.name,
            email: updatedCredential.email,
            type: updatedCredential.type,
            createdAt: updatedCredential.createdAt,
            updatedAt: updatedCredential.updatedAt,
        };

        return NextResponse.json({
            success: true, message: "Credential updated successfully", data: safeUpdatedCredential
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        )
    }
}