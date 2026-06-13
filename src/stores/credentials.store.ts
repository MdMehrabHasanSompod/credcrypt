import { ICredential } from "@/types/credential.type";
import { create } from "zustand";


interface credentialStore {
    credentials: ICredential[] | null;
    setCredentials: (credentials: ICredential[]) => void;
    clearCredentials: () => void;
}

export const useCredentialStore = create<credentialStore>((set) => ({
    credentials: null,
    setCredentials: (credentials) => set({ credentials }),
    clearCredentials: () => set({ credentials: null }),
}));