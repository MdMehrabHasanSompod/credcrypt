import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Confirm Master Key - CredCrypt",
};

export default function SetUpMasterKeyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}

