import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Credential } from "@/models/credential.model";
import { encrypt, hashMasterKey } from "@/lib/crypto";
import { auth } from "@/lib/auth";
import { User } from "@/models/user.model";

export const POST = async (request: NextRequest) => {
    try {
        const { masterKey, name, email, type, value } = await request.json()


        if (!name || !type || !value) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            )
        }

        const session = await auth();

        if (!session?.user?.id || !masterKey) {
            return NextResponse.json(
                { success: false, message: "Attempted to unauthorized access" },
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


        const encryptedValue = encrypt(value);
        if (!encryptedValue?.iv || !encryptedValue?.data || !encryptedValue?.tag) {
            throw new Error("Encryption failed");
        }

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
        console.log(error)
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