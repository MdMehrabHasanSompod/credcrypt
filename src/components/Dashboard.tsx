"use client";

import React from "react";
import {
    Heart,
    MenuSquare,
    FolderLock,
    KeyRound,
    ShieldCheck,
    Hash,
    Eye,
    PlusCircle,
    Settings,
    LifeBuoy,
    Key,
    HelpCircle,
    BadgeCheck,
    Fingerprint,
    LayoutDashboard,
} from "lucide-react";
import { useUserStore } from "@/stores/user.store";
import { useCredentialStore } from "@/stores/credentials.store";
import StatsCard from "./StatsCard";
import ActionCard from "./ActionCards";
import { useRouter } from "next/navigation";


type propType = {
    setOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentMenu: React.Dispatch<React.SetStateAction<string>>;
};

const Dashboard = ({ setOpenMobileSidebar, setCurrentMenu }: propType) => {
    const user = useUserStore((state) => state.user)
    const credentials = useCredentialStore((state) => state.credentials)
    const router = useRouter();

    const credCounts = credentials.reduce((prev, curr) => {
        prev[curr.type] = (prev[curr.type] || 0) + 1;
        return prev;
    }, {} as Record<string, number>)



    return (
        <div className="w-full overflow-x-hidden">
            <div className='bg-linear-to-r from-green-800 to-green-600 w-full py-4 px-6 md:px-8 shadow-lg rounded-xl my-2 flex items-center justify-between gap-4'>
                <h1 className='text-xl md:text-2xl lg:text-3xl text-white font-bold flex items-center gap-3'>
                    <LayoutDashboard className='w-6 h-6 md:w-7 md:h-7' />
                    Dashboard
                </h1>
                <button
                    onClick={() => setOpenMobileSidebar(prev => !prev)}
                    className='lg:hidden text-white hover:bg-green-700 p-2 rounded-lg transition-all duration-200'
                >
                    <MenuSquare size={28} />
                </button>
            </div>

            <div className="flex flex-col items-center justify-center mt-12">

                <p className="flex items-center gap-2 text-2xl md:text-3xl font-semibold text-green-800">
                    Welcome Back
                    <Heart fill="red" strokeWidth={0} size={34} />
                </p>

                <h2 className="mt-3 text-4xl md:text-5xl text-center font-bold text-green-900">
                    {user?.name}
                </h2>

            </div>

            <div className="relative mt-12 overflow-hidden rounded-3xl bg-linear-to-r from-green-900 via-green-800 to-green-700 p-8 text-white shadow-xl">

                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
                <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-white/5" />

                <div className="relative flex flex-col lg:flex-row justify-between items-center gap-8">

                    <div>

                        <p className="uppercase tracking-[4px] text-green-200 text-sm">
                            Secure Vault
                        </p>

                        <h2 className="text-4xl font-bold mt-3">
                            Everything Protected.
                        </h2>

                        <p className="mt-4 text-green-100 max-w-xl leading-7">
                            Store passwords, API keys, recovery codes, security
                            questions and every important credential securely in
                            one place.
                        </p>

                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8">

                        <FolderLock
                            size={90}
                            className="text-white"
                        />

                    </div>

                </div>

            </div>

            <h2 className="text-2xl font-bold text-green-900 mb-6 mt-10">
                Statistics
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 my-6">

                <StatsCard
                    title="Total"
                    value={credentials.length}
                    icon={<FolderLock size={28} />}
                />

                <StatsCard
                    title="Passwords"
                    value={credCounts["password"] ?? 0}
                    icon={<KeyRound size={28} />}
                />

                <StatsCard
                    title="API Keys"
                    value={credCounts["api-key"] ?? 0}
                    icon={<ShieldCheck size={28} />}
                />

                <StatsCard
                    title="PINs"
                    value={credCounts["pin"] ?? 0}
                    icon={<Hash size={28} />}
                />

                <StatsCard
                    title="Recovery Codes"
                    value={credCounts["recovery-code"] ?? 0}
                    icon={<Key size={28} />}
                />

                <StatsCard
                    title="Security Questions"
                    value={credCounts["security-question"] ?? 0}
                    icon={<HelpCircle size={28} />}
                />

                <StatsCard
                    title="Security Codes"
                    value={credCounts["security-code"] ?? 0}
                    icon={<BadgeCheck size={28} />}
                />

                <StatsCard
                    title="Session Tokens"
                    value={credCounts["session-token"] ?? 0}
                    icon={<Fingerprint size={28} />}
                />

                <StatsCard
                    title="OTPs"
                    value={credCounts["otp"] ?? 0}
                    icon={<ShieldCheck size={28} />}
                />

                <StatsCard
                    title="Others"
                    value={credCounts["others"] ?? 0}
                    icon={<FolderLock size={28} />}
                />

            </div>


            <div className="mt-14">

                <h2 className="text-2xl font-bold text-green-900 mb-6">
                    Quick Actions
                </h2>

                <div className="grid md:grid-cols-2 gap-6">

                    <ActionCard
                        onClick={() => { setCurrentMenu("all-credentials"); scrollTo(0, 0) }}
                        title="View Credentials"
                        subtitle="Browse every saved credential."
                        icon={<Eye size={30} />}
                    />

                    <ActionCard
                        onClick={() => { setCurrentMenu("add-credential"); scrollTo(0, 0) }}
                        title="Add Credential"
                        subtitle="Save a new credential."
                        icon={<PlusCircle size={30} />}
                    />

                    <ActionCard
                        onClick={() => { setCurrentMenu("settings"); scrollTo(0, 0) }}
                        title="Manage Settings"
                        subtitle="Security & User settings."
                        icon={<Settings size={30} />}
                    />

                    <ActionCard
                        onClick={() => router.push("/contact-support")}
                        title="Contact Support"
                        subtitle="Having issue? Contact support."
                        icon={<LifeBuoy size={30} />}
                    />

                </div>

            </div>

        </div>
    );
};

export default Dashboard;


