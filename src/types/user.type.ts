export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    masterKeyHash: string;
    masterKeySalt: string;
    hasSetUpMasterKey: boolean;
    phone: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
};