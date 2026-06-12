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
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [40, 'Name cannot exceed 40 characters'],
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email",],
    },
    type: {
        type: String,
        enum: ["password", "pin", "security-code", "security-question", "recovery-code", "otp", "session-token", "api-key", "others"],
        required: true
    },
    value: {
        type: {
            iv: String,
            data: String,
            tag: String,
        },
        required: true,
    }

}, {
    timestamps: true
})

credentialSchema.index(
    { userId: 1, name: 1, email: 1, type: 1 },
    { unique: true }
);

export const Credential = mongoose.models.Credential || mongoose.model<ICredential>("Credential", credentialSchema)