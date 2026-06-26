import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Support - CredCrypt",
};

export default function ContactSupportLayout({
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

