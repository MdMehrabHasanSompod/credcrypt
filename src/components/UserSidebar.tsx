"use client"
import { DashboardMenu, useDashboardStore, useToggleSidebarStore } from '@/stores/dashboardMenu.store'
import { useUserStore } from '@/stores/user.store'
import { LayoutDashboard, LogOut, PanelLeft, PlusCircle, Settings, Shield, User, LucideIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const UserSidebar = () => {
    const user = useUserStore((state) => state.user)
    const { setCurrentMenu } = useDashboardStore()
    const { toggleSidebar, setToggleSidebar } = useToggleSidebarStore()
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
        <aside className={`h-screen sticky top-0 overflow-y-auto bg-linear-to-b from-green-800 to-green-900 border-r-2 border-green-700/50 py-3 hidden lg:flex flex-col transition-all duration-300 ease-in-out shadow-2xl ${toggleSidebar ? "w-20" : "w-64"}`}>
            <div className={`flex ${toggleSidebar ? 'flex-col gap-3' : 'items-center justify-between'} px-4 py-2 text-white font-semibold border-b border-green-700/50 pb-4`}>
                <div className={`flex items-center gap-2 cursor-pointer transition-all duration-300 group ${toggleSidebar ? 'justify-center' : ''}`} onClick={() => router.push("/")}>
                    <div className="bg-white/10 p-2 relative w-10 h-10 rounded-xl group-hover:bg-white/20 transition-all duration-300">

                        <Image
                            src="/logo.png"
                            alt='CredCrypt'
                            fill
                            className='object-cover' />

                    </div>
                    <p className={`text-lg font-bold bg-linear-to-r from-green-200 to-white bg-clip-text text-transparent transition-all duration-300 overflow-hidden whitespace-nowrap ${toggleSidebar ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>
                        CredCrypt
                    </p>
                </div>
                <button
                    onClick={setToggleSidebar}
                    className={`p-2 rounded-xl hover:bg-white/10 transition-all duration-300 ${toggleSidebar ? 'mx-auto' : ''}`}
                >
                    <PanelLeft className={`w-5 h-5 text-white/70 hover:text-white transition-transform duration-300 ${toggleSidebar ? 'rotate-180' : ''}`} />
                </button>
            </div>

            <div className={`my-4 flex-1 ${toggleSidebar ? "px-2" : "px-3"} space-y-1.5 overflow-y-auto`}>
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className={`flex items-center gap-3 rounded-xl cursor-pointer transition-all duration-200 group ${toggleSidebar ? 'justify-center p-3' : 'px-4 py-3'} 
                            hover:bg-white/10 hover:text-white text-white/70`}
                        onClick={() => setCurrentMenu(item.id)}
                    >
                        <item.icon className={`w-5 h-5 ${item.color} transition-transform duration-200 group-hover:scale-110 shrink-0`} />
                        <p className={`text-sm font-medium transition-all duration-300 overflow-hidden whitespace-nowrap ${toggleSidebar ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>

            <div className={`mt-auto ${toggleSidebar ? "px-2" : "px-4"} py-3 border-t border-green-700/50`}>
                <div onClick={() => setCurrentMenu("settings")} className={`flex cursor-pointer items-center gap-3 rounded-xl p-3 bg-green-800/30 mb-3 transition-all duration-300 ${toggleSidebar ? 'justify-center' : ''}`}>
                    <div className="w-8 h-8 relative rounded-full bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center shrink-0">
                        {user?.avatar ? (
                            <Image
                                src={user.avatar}
                                alt="User avatar"
                                fill
                                className="rounded-full object-cover"
                            />
                        ) : (
                            <User className="w-4 h-4 text-white" />
                        )}
                    </div>
                    <div className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${toggleSidebar ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>
                        <p className="text-xs font-medium text-white/80 truncate">{user?.name}</p>
                        <p className="text-[10px] text-white/50">Secure Vault</p>
                    </div>
                </div>
                <button
                    onClick={() => signOut()}
                    className={`w-full cursor-pointer flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 font-medium rounded-xl transition-all duration-200 ${toggleSidebar ? "justify-center p-3" : "px-4 py-2.5"}`}
                >
                    <LogOut className='w-5 h-5 shrink-0' />
                    <p className={`text-sm transition-all duration-300 overflow-hidden whitespace-nowrap ${toggleSidebar ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>
                        Logout
                    </p>
                </button>
            </div>
        </aside>
    )
}

export default UserSidebar