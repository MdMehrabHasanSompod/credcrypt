import mongoose from "mongoose";


export interface IEncryptedValue {
    iv: string;
    data: string;
    tag: string;
}

export type ICredType = "password" | "pin" | "security-code" | "security-question" | "recovery-code" | "otp" | "session-token" | "api-key" | "others"

export interface ICredential {
    _id: string;
    userId: mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    type: ICredType;
    value: IEncryptedValue;
    createdAt: Date;
    updatedAt: Date;
};

export interface IDecryptedCredential {
    _id: string;
    userId: mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    type: ICredType;
    value: string;
    createdAt: Date;
    updatedAt: Date;
}

