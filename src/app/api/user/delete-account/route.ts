import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Credential } from "@/models/credential.model";
import { auth } from "@/lib/auth";
import { User } from "@/models/user.model";
import { hashMasterKey } from "@/lib/crypto";
import bcrypt from "bcrypt"
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary"

export const DELETE = async (request: NextRequest) => {
    try {
        const { masterKey, password } = await request.json()

        const session = await auth();

        if (!session?.user?.id || !masterKey || !password) {
            return NextResponse.json(
                { success: false, message: "Unauthorized attempt" },
                { status: 401 }
            );
        }


        const sessionUserId = session.user.id;


        await connectDB();
        const sessionUser = await User.findById(sessionUserId).select("+masterKeySalt +masterKeyHash +password");

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

        const isPasswordMatched = await bcrypt.compare(password, sessionUser.password)

        if (!isPasswordMatched) {
            return NextResponse.json(
                { success: false, message: "Attempted to unauthorized access" },
                { status: 401 }
            );
        }

        const mongodbSession = await mongoose.startSession()

        try {
            mongodbSession.startTransaction();

            await Credential.deleteMany({ userId: sessionUserId }, { session: mongodbSession })

            const publicId = sessionUser.avatar.match(/\/upload\/(?:[^/]+\/)*v\d+\/(.+)\.[^.]+$/)?.[1];
            await cloudinary.uploader.destroy(publicId)

            const deletedUser = await User.findOneAndDelete({ _id: sessionUserId }, { session: mongodbSession })

            if (!deletedUser) {
                throw new Error("USER_NOT_FOUND")
            }

            await mongodbSession.commitTransaction();

            return NextResponse.json({
                success: true, message: "User deleted successfully"
            }, { status: 200 })

        } catch (error: any) {
            await mongodbSession.abortTransaction();

            if (error.message === "USER_NOT_FOUND") {
                return NextResponse.json(
                    { success: false, message: "User not found" },
                    { status: 404 }
                )
            }
            throw error;
        } finally {
            await mongodbSession.endSession();
        }

    } catch (error: any) {
        console.log(error)
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        )
    }
} 