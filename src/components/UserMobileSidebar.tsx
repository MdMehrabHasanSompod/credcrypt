"use client"
import { LayoutDashboard, LogOut, PlusCircle, Settings, Shield, X, User, LucideIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useUserStore } from '@/stores/user.store'
import Image from 'next/image'
import { DashboardMenu, useDashboardStore } from '@/stores/dashboardMenu.store'

type propType = {
    setOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const UserMobileSidebar = ({ setOpenMobileSidebar }: propType) => {
    const { setCurrentMenu } = useDashboardStore()
    const user = useUserStore((state) => state.user)
    const router = useRouter()

    interface IMenuItem {
        id: DashboardMenu;
        label: string;
        icon: LucideIcon;
        color: string;
    }


    const menuItems: IMenuItem[] = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, color: "text-blue-400" },
        { id: "add-credential", label: "Add Credential", icon: PlusCircle, color: "text-green-400" },
        { id: "all-credentials", label: "All Credentials", icon: Shield, color: "text-purple-400" },
        { id: "settings", label: "Settings", icon: Settings, color: "text-orange-400" },
    ];

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
                onClick={() => setOpenMobileSidebar(false)}
            />
            <aside className="fixed top-0 left-0 z-50 h-screen w-[75%] sm:w-[60%] md:w-[40%] bg-linear-to-b from-green-800 to-green-900 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden animate-in slide-in-from-left">
                <div className="flex items-center justify-between px-5 py-4 border-b border-green-700/50 shrink-0">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
                        <div className="bg-white/10 p-2 relative w-10 h-10 rounded-xl">
                            <Image
                                src="/logo.png"
                                alt='CredCrypt'
                                fill
                                className='object-cover' />
                        </div>
                        <p className="text-lg font-bold bg-linear-to-r from-green-200 to-white bg-clip-text text-transparent">
                            CredCrypt
                        </p>
                    </div>
                    <button
                        onClick={() => setOpenMobileSidebar(false)}
                        className="p-2 rounded-xl hover:bg-white/10 transition-all duration-200"
                    >
                        <X className='w-5 h-5 text-white/70 hover:text-white' />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-3 py-4">
                    <div className="space-y-1.5">
                        {menuItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/10 text-white/70 hover:text-white"
                                onClick={() => {
                                    setCurrentMenu(item.id)
                                    setOpenMobileSidebar(false)
                                }}
                            >
                                <item.icon className={`w-5 h-5 ${item.color} shrink-0`} />
                                <p className="text-sm font-medium">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-4 py-4 border-t border-green-700/50 shrink-0">
                    <div onClick={() => {
                        setCurrentMenu("settings")
                        setOpenMobileSidebar(false)
                    }} className="flex cursor-pointer items-center gap-3 rounded-xl p-3 bg-green-800/30 mb-3">
                        <div className="w-10 h-10 relative rounded-full bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center shrink-0">
                            {user?.avatar ? (
                                <Image
                                    src={user.avatar}
                                    alt="User avatar"
                                    fill
                                    className="rounded-full object-cover"
                                />
                            ) : (
                                <User className="w-5 h-5 text-white" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white/80 truncate">{user?.name || "User"}</p>
                            <p className="text-xs text-white/50">Secure Vault</p>
                        </div>
                    </div>
                    <button
                        onClick={() => signOut()}
                        className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 font-medium rounded-xl transition-all duration-200 px-4 py-3"
                    >
                        <LogOut className='w-5 h-5' />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    )
}

export default UserMobileSidebar