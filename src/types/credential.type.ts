import mongoose from "mongoose";

export interface ICredential {
    _id: string;
    userId: mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    type: "password" | "pin" | "secuirty-code" | "recovery-code" | "otp" | "session-token" | "api-key" | "others";
    value: string;
    createdAt: Date;
    updatedAt: Date;
};