import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Credential } from "@/models/credential.model";
import { auth } from "@/lib/auth";
import { encrypt } from "@/lib/crypto";
import { ICredential } from "@/types/credential.type";

export const PATCH = async (request: NextRequest) => {
    try {
        const { credentialId, updatedName, updatedEmail, updatedType, updatedValue } = await request.json()

        if (!updatedName?.trim() && !updatedType?.trim() && !updatedValue?.trim() && !updatedEmail?.trim()) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
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

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, message: "Unauthorized attempt" },
                { status: 401 }
            );
        }

        const sessionUserId = session.user.id;

        const valuesToUpdate: Partial<ICredential> = {}

        if (updatedName?.trim()) valuesToUpdate.name = updatedName
        if (updatedEmail?.trim()) valuesToUpdate.email = updatedEmail
        if (updatedType?.trim()) valuesToUpdate.type = updatedType
        if (updatedValue?.trim()) {
            valuesToUpdate.value = encrypt(updatedValue)
        }

        await connectDB();

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

    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        )
    }
}