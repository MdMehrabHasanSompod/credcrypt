import { IUser } from "@/types/user.type";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [40, 'Name cannot exceed 40 characters'],
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email",]
    },
    phone: {
        type: String,
        match: [/^\+?01[3-9]\d{8}$/, "Please enter a valid phone number"],
    },
    password: {
        type: String,
        minlength: [8, "Password must be at least 8 characters"],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?=\S+$).{8,200}$/, "Password validation failed"],
        select: false,
    },
    avatar: {
        type: String
    },

}, {
    timestamps: true
})

export const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema)