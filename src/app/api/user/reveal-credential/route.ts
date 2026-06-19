import { auth } from "@/lib/auth";
import { decrypt, hashMasterKey } from "@/lib/crypto";
import connectDB from "@/lib/db";
import { Credential } from "@/models/credential.model";
import { User } from "@/models/user.model";
import { IDecryptedCredential } from "@/types/credential.type";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const session = await auth();
        const { masterKey, selectedCredId } = await request.json()

        if (!selectedCredId) {
            return NextResponse.json(
                { success: false, message: "Invalid request" },
                { status: 400 }
            );
        }

        if (!session?.user?.id || !masterKey) {
            return NextResponse.json(
                { success: false, message: "Unauthorized attempt" },
                { status: 401 }
            );
        }

        const sessionUserId = session.user.id

        await connectDB()

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

        const credential = await Credential.findOne({ _id: selectedCredId, userId: sessionUserId });

        if (!credential) {
            return NextResponse.json(
                { success: false, message: "Credential not found" },
                { status: 404 }
            )
        }

        const payLoadValue: any = {
            iv: credential.value.iv,
            data: credential.value.data,
            tag: credential.value.tag
        }

        const decryptedValue = decrypt(payLoadValue)

        const decryptedCredential: IDecryptedCredential = {
            _id: credential._id,
            name: credential.name,
            userId: credential.userId,
            email: credential.email,
            type: credential.type,
            value: decryptedValue,
            createdAt: credential.createdAt,
            updatedAt: credential.updatedAt

        }


        return NextResponse.json(
            { success: true, message: "Credentials Revealed Successfully", data: decryptedCredential },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        )
    }
}