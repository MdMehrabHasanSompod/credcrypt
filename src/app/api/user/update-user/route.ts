import { auth } from "@/lib/auth"
import uploadOnCloudinary from "@/lib/cloudinary"
import connectDB from "@/lib/db"
import { User } from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"

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

        if (updatedAvatar) {
            const updatedAvatarUrl = await uploadOnCloudinary(updatedAvatar);
            updateData.avatar = updatedAvatarUrl;
        }

        const updatedUser = await User.findByIdAndUpdate(sessionUserId, updateData, {
            new: true,
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
