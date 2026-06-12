import mongoose from "mongoose";


export interface IEncryptedValue {
    iv: string;
    data: string;
    tag: string;
}

export interface ICredential {
    _id: string;
    userId: mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    type: "password" | "pin" | "security-code" | "security-question" | "recovery-code" | "otp" | "session-token" | "api-key" | "others";
    value: IEncryptedValue;
    createdAt: Date;
    updatedAt: Date;
};