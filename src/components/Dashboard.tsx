"use client"
import React, { useState } from 'react'
import { Heart, MenuSquare } from 'lucide-react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


type propType = {
    setOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const Dashboard = ({ setOpenMobileSidebar }: propType) => {
    const session = useSession()
    const router = useRouter()


    return (
        <div className='w-full mx-auto overflow-x-hidden'>
            <h1 className='text-xl md:text-2xl lg:text-3xl text-white font-semibold  bg-green-900 w-full py-4 px-8 shadow-md rounded-md my-2 flex items-center justify-between gap-4'>Dashboard<MenuSquare size={30} className='block lg:hidden cursor-pointer' onClick={() => setOpenMobileSidebar(prev => !prev)} /></h1>
            <div className='flex flex-col items-center justify-center gap-4 mt-10'>
                <p className='text-3xl font-semibold text-green-800 flex items-center justify-center gap-1'>Welcome Back <Heart size={40} fill='red' strokeWidth={0} /></p>
                <p className='text-4xl font-bold text-green-900'>{session.data?.user.name}</p>
            </div>
            <div className='flex flex-col md:flex-row justify-center gap-8 md:gap-2 mt-20 '>
                <div className='flex-1 flex-col gap-2 mx-auto bg-blue-50 shadow-lg p-5 rounded-lg'>
                    <h3 className='text-xl text-center text-green-900 mt-5 font-semibold'>Quick Actions</h3>


                </div>
            </div>
        </div>
    )
}

export default Dashboard