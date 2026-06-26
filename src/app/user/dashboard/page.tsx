"use client"
import React, { useState } from 'react'
import Dashboard from '@/components/Dashboard'
import UserSidebar from '@/components/UserSidebar'
import UserMobileSidebar from '@/components/UserMobileSidebar'
import UserSettings from '@/components/UserSettings'
import AllCredentials from '@/components/AllCredentials'
import AddCredential from '@/components/AddCredential'
import { useDashboardStore } from '@/stores/dashboardMenu.store'

const UserDashboard = () => {
    const { currentMenu } = useDashboardStore()
    const [openMobileSidebar, setOpenMobileSidebar] = useState(false)

    return (
        <div className='min-h-screen flex flex-col md:flex-row w-full bg-green-200'>
            <UserSidebar />
            {
                openMobileSidebar && <UserMobileSidebar setOpenMobileSidebar={setOpenMobileSidebar} />
            }
            <main className='flex-1 w-full  p-5'>
                {
                    currentMenu === "dashboard" ? <Dashboard setOpenMobileSidebar={setOpenMobileSidebar} /> :
                        currentMenu === "add-credential" ? <AddCredential setOpenMobileSidebar={setOpenMobileSidebar} />
                            : currentMenu === "all-credentials" ? <AllCredentials setOpenMobileSidebar={setOpenMobileSidebar} />
                                : currentMenu === "settings" ? <UserSettings setOpenMobileSidebar={setOpenMobileSidebar} /> : "Invalid Request"
                }
            </main>
        </div>
    )
}

export default UserDashboard