import { ICredential } from "@/types/credential.type";
import mongoose from "mongoose";

const credentialSchema = new mongoose.Schema<ICredential>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
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
    type: {
        type: String,
        enum: ["password", "pin", "secuirty-code", "recovery-code", "otp", "session-token", "api-key", "others"],
        required: true
    },
    value: {
        type: String,
        required: true,
    }

}, {
    timestamps: true
})

export const Credential = mongoose.models.Credential || mongoose.model<ICredential>("Credential", credentialSchema)