import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Credential } from "@/models/credential.model";
import { encrypt } from "@/lib/crypto";
import { auth } from "@/lib/auth";

export const POST = async (request: NextRequest) => {
    try {
        const { name, email, type, value } = await request.json()


        if (!name || !type || !value) {
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

        const encryptedValue = encrypt(value);
        if (!encryptedValue?.iv || !encryptedValue?.data || !encryptedValue?.tag) {
            throw new Error("Encryption failed");
        }
        await connectDB();

        const newCredential = await Credential.create({
            userId: sessionUserId,
            name,
            email,
            type,
            value: encryptedValue
        })

        const safeCredential = {
            _id: newCredential._id,
            userId: newCredential.userId,
            name: newCredential.name,
            email: newCredential.email,
            type: newCredential.type,
            createdAt: newCredential.createdAt,
            updatedAt: newCredential.updatedAt,
        };
        return NextResponse.json({
            success: true, message: "Credential saved successfully", data: safeCredential
        }, { status: 201 })

    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Credential already exists",
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