"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AvatarDropdown from './AvatarDropdown'
import { useUserStore } from '@/stores/user.store'

const Navbar = () => {
    const authUser = useUserStore((state) => state.user)

    return (
        <nav className="w-[95%] max-w-5xl h-18 md:h-22 lg:h-25 z-50 mt-2 mx-auto fixed left-1/2 transform -translate-x-1/2 flex items-center justify-between gap-20 bg-green-800 rounded-lg px-6 py-2 shadow-lg">
            <Link href="/" onClick={() => scrollTo(0, 0)} className='flex items-center'>
                <Image src='/logo.png' width={80} height={80} alt='MediOrqen' className='w-13 h-13 md:w-16 md:h-16 hover:cursor-pointer' />
                <h1 className='text-white text-3xl font-bold'>CredCrypt</h1>
            </Link>
            <div className='text-white font-bold text-xl hidden md:flex items-center justify-between gap-3'>
                <Link href="/services">Services</Link>
                <Link href="/about">About</Link>
                {
                    !authUser ? (<Link href="/login">Login</Link>) :
                        (<AvatarDropdown user={authUser} />)
                }
            </div>
        </nav>
    )
}

export default Navbar