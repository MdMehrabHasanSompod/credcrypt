"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useUserStore } from '@/stores/user.store'
import { MenuSquare, X, LogOut, LayoutDashboard, Phone, ClipboardPen } from 'lucide-react'
import { signOut } from 'next-auth/react'
import AvatarDropdown from './AvatarDropdown'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const user = useUserStore((state) => state.user)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [mobileMenuOpen])

    return (
        <>
            <nav className="w-[95%] max-w-5xl h-18 md:h-22 lg:h-25 z-50 mt-2 mx-auto fixed left-1/2 transform -translate-x-1/2 flex items-center justify-between gap-4 bg-linear-to-r from-green-800 to-green-900 rounded-2xl px-4 md:px-6 py-2 shadow-2xl border border-green-700/50">
                <Link href="/" onClick={() => scrollTo(0, 0)} className='flex items-center gap-2 shrink-0'>
                    <Image src='/logo.png' width={80} height={80} alt='CredCrypt' className='w-10 h-10 md:w-14 md:h-14 hover:cursor-pointer' />
                    <h1 className='text-xl md:text-2xl lg:text-3xl font-bold bg-linear-to-r from-green-200 to-white bg-clip-text text-transparent'>CredCrypt</h1>
                </Link>

                <div className='text-white font-semibold text-base md:text-lg hidden md:flex items-center justify-between gap-6'>
                    <Link href="/privacy-policy" className="hover:text-green-300 transition-colors duration-200">Privacy</Link>
                    <Link href="/contact-support" className="hover:text-green-300 transition-colors duration-200">Helpline</Link>
                    {
                        !user ? (
                            <Link href="/login" className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
                                Login
                            </Link>
                        ) : (
                            <AvatarDropdown user={user} />
                        )
                    }
                </div>

                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-white hover:bg-white/10 p-2 rounded-xl transition-all duration-200"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuSquare className="w-6 h-6" />}
                </button>
            </nav>

            {mobileMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <div className="fixed top-0 right-0 z-50 h-screen w-[75%] sm:w-[60%] bg-linear-to-b from-green-800 to-green-900 shadow-2xl flex flex-col md:hidden animate-in slide-in-from-right duration-300">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-green-700/50">
                            <div className="flex items-center gap-2">
                                <Image src='/logo.png' width={40} height={40} alt='CredCrypt' className='w-10 h-10' />
                                <span className="text-lg font-bold bg-linear-to-r from-green-200 to-white bg-clip-text text-transparent">CredCrypt</span>
                            </div>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 rounded-xl hover:bg-white/10 transition-all duration-200"
                            >
                                <X className="w-5 h-5 text-white/70 hover:text-white" />
                            </button>
                        </div>

                        <div className="flex-1 px-5 py-6 space-y-3 overflow-y-auto">
                            {!user ? (
                                <>
                                    <Link
                                        href="/privacy-policy"
                                        className="block text-white/70 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-200 text-base font-medium"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Privacy
                                    </Link>
                                    <Link
                                        href="/contact-support"
                                        className="block text-white/70 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-200 text-base font-medium"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Helpline
                                    </Link>
                                    <div className="pt-4 border-t border-green-700/50">
                                        <Link
                                            href="/login"
                                            className="block bg-green-600 hover:bg-green-700 text-center text-white font-semibold px-5 py-3 rounded-xl transition-all duration-200"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Login
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div onClick={() => {
                                        router.push("/user/dashboard")
                                        setMobileMenuOpen(false)
                                    }} className="flex cursor-pointer items-center gap-3 bg-green-800/30 rounded-xl p-3 mb-2 hover:bg-green-800/50 transition-all duration-200">
                                        <AvatarDropdown user={user} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-base font-medium text-white/90 truncate">{user.name}</p>
                                            <p className="text-xs text-white/50 truncate">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <Link
                                            href="/privacy-policy"
                                            className="flex items-center gap-3 text-white/70 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-200 text-base font-medium"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <ClipboardPen className='w-5 h-5 text-blue-400' />
                                            Privacy-Policy
                                        </Link>
                                        <Link
                                            href="/user/dashboard"
                                            className="flex items-center gap-3 text-white/70 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-200 text-base font-medium"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <LayoutDashboard className="w-5 h-5 text-green-400" />
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/contact-support"
                                            className="flex items-center gap-3 text-white/70 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-200 text-base font-medium"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <Phone className="w-5 h-5 text-blue-400" />
                                            Helpline
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>

                        {user && (
                            <div className="px-5 py-4 border-t border-green-700/50">
                                <button
                                    onClick={() => {
                                        signOut()
                                        setMobileMenuOpen(false)
                                    }}
                                    className="w-full flex items-center justify-center gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 px-4 py-3 rounded-xl transition-all duration-200 text-base font-medium"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default Navbar