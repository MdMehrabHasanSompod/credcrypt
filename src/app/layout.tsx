import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import AuthLoader from "@/components/AuthLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CredCrypt — Secure Credential Vault",
  description: "Store passwords and sensitive credentials with end-to-end encryption. Private, secure, and fully under your control.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="">
        <SessionWrapper>
          <AuthLoader />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
