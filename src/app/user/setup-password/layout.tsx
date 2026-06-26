import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Set Password - CredCrypt",
};

export default function SetPasswordLayout({
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

