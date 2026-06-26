import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - CredCrypt",
};

export default function PrivacyPolicyLayout({
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

