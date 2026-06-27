import { auth } from "@/lib/auth"
import uploadOnCloudinary from "@/lib/cloudinary"
import connectDB from "@/lib/db"
import { User } from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

export const PATCH = async (request: NextRequest) => {
    try {
        const formData = await request.formData()
        const updatedName = formData.get("updatedName") as string
        const updatedPhone = formData.get("updatedPhone") as string
        const updatedAvatar = formData.get("updatedAvatar") as Blob
        const removeAvatar = formData.get("removeAvatar") === "true";

        if (!updatedName && !updatedPhone && !updatedAvatar && !removeAvatar) {
            return NextResponse.json(
                { success: false, message: "Invalid Update Request" },
                { status: 400 }
            )
        }

        if (updatedName.trim() && updatedName.length < 2) {
            return NextResponse.json(
                { success: false, message: "Name must contain 2 characters" },
                { status: 400 }
            )
        }

        if (updatedName.trim() && updatedName.length > 40) {
            return NextResponse.json(
                { success: false, message: "Name cannot exceed 40 characters" },
                { status: 400 }
            )
        }

        interface IUpdateUserData {
            name?: string;
            phone?: string;
            avatar?: string | null;
        }

        const updateData: IUpdateUserData = {};

        if (updatedName) updateData.name = updatedName;
        if (updatedPhone) updateData.phone = updatedPhone;
        if (removeAvatar && !updatedAvatar) {
            updateData.avatar = null;
        }

        const session = await auth()

        if (!session?.user.id) {
            return NextResponse.json(
                { success: false, message: "Attempted unauthorize access" },
                { status: 401 }
            )
        }

        const sessionUserId = session.user.id;

        await connectDB()

        const sessionUser = await User.findById(sessionUserId);

        if (!sessionUser) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        if (removeAvatar && sessionUser.avatar && sessionUser.avatar.includes("res.cloudinary.com")) {
            const publicId = sessionUser.avatar.match(/\/upload\/(?:[^/]+\/)*v\d+\/(.+)\.[^.]+$/)?.[1];
            await cloudinary.uploader.destroy(publicId)
        }

        if (updatedAvatar) {
            const updatedAvatarUrl = await uploadOnCloudinary(updatedAvatar);
            if (sessionUser.avatar && sessionUser.avatar.includes("res.cloudinary.com")) {
                const oldPublicId = sessionUser.avatar.match(/\/upload\/(?:[^/]+\/)*v\d+\/(.+)\.[^.]+$/)?.[1];
                await cloudinary.uploader.destroy(oldPublicId)
            }
            updateData.avatar = updatedAvatarUrl;
        }

        const updatedUser = await User.findByIdAndUpdate(sessionUserId, updateData, {
            returnDocument: "after",
            runValidators: true,
        })

        if (!updatedUser) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { success: true, message: "User Updated Successfully", updatedUser },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        )
    }
}
