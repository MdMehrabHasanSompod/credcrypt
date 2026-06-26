import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Delete Account - CredCrypt",
};

export default function DeleteAccountLayout({
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

