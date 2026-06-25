"use client"
import React, { useState } from 'react'
import Dashboard from '@/components/Dashboard'
import UserSidebar from '@/components/UserSidebar'
import UserMobileSidebar from '@/components/UserMobileSidebar'
import UserSettings from '@/components/UserSettings'
import AllCredentials from '@/components/AllCredentials'
import AddCredential from '@/components/AddCredential'

const UserDashboard = () => {
    const [currentMenu, setCurrentMenu] = useState("dashboard")
    const [openMobileSidebar, setOpenMobileSidebar] = useState(false)

    return (
        <div className='min-h-screen flex flex-col md:flex-row w-full bg-green-200'>
            <UserSidebar setCurrentMenu={setCurrentMenu} />
            {
                openMobileSidebar && <UserMobileSidebar setCurrentMenu={setCurrentMenu} setOpenMobileSidebar={setOpenMobileSidebar} />
            }
            <main className='flex-1 w-full  p-5'>
                {
                    currentMenu === "dashboard" ? <Dashboard setOpenMobileSidebar={setOpenMobileSidebar} setCurrentMenu={setCurrentMenu} /> :
                        currentMenu === "add-credential" ? <AddCredential setOpenMobileSidebar={setOpenMobileSidebar} />
                            : currentMenu === "all-credentials" ? <AllCredentials setOpenMobileSidebar={setOpenMobileSidebar} />
                                : currentMenu === "settings" ? <UserSettings setOpenMobileSidebar={setOpenMobileSidebar} /> : "Invalid Request"
                }
            </main>
        </div>
    )
}

export default UserDashboard