"use client"
import React, { useState } from 'react'
import { Heart, MenuSquare } from 'lucide-react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


type propType = {
    setOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const AllCredentials = ({ setOpenMobileSidebar }: propType) => {
    const session = useSession()
    const router = useRouter()


    return (
        <div className='w-full mx-auto overflow-x-hidden'>
            <h1 className='text-xl md:text-2xl lg:text-3xl text-white font-semibold  bg-green-900 w-full py-4 px-8 shadow-md rounded-md my-2 flex items-center justify-between gap-4'>All Credentials<MenuSquare size={30} className='block lg:hidden cursor-pointer' onClick={() => setOpenMobileSidebar(prev => !prev)} /></h1>

        </div>
    )
}

export default AllCredentials