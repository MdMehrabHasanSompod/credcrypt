import { ICredential } from "@/types/credential.type";
import { create } from "zustand";


interface credentialStore {
    credentials: ICredential[];
    setCredentials: (credentials: ICredential[]) => void;
    clearCredentials: () => void;
}

export const useCredentialStore = create<credentialStore>((set) => ({
    credentials: [],
    setCredentials: (credentials) => set({ credentials }),
    clearCredentials: () => set({ credentials: [] }),
}));