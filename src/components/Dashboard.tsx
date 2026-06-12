"use client"
import React, { useState } from 'react'
import { Heart, Loader2, MenuSquare, PlusCircle, } from 'lucide-react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type propType = {
    setOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

type CredentialType = "" | "password" | "pin" | "security-code" | "security-question" | "recovery-code" | "otp" | "session-token" | "api-key" | "others";


const Dashboard = ({ setOpenMobileSidebar }: propType) => {
    const session = useSession()
    const router = useRouter()

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [type, setType] = useState<CredentialType>("")
    const [value, setValue] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        if (!type) {
            alert("Please select a credential type!")
            return;
        }
        if (!session?.data?.user.id) {
            alert("Identified Suspicious Attempt")
            return;
        }
        setLoading(true)
        try {
            const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/add-credential`, {
                name,
                email,
                type,
                value
            })

            console.log(result)

            setName("")
            setEmail("")
            setType("")
            setValue("")
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full mx-auto overflow-x-hidden'>
            <h1 className='text-xl md:text-2xl lg:text-3xl text-white font-semibold bg-green-900 w-full py-4 px-8 shadow-md rounded-md my-2 flex items-center justify-between gap-4'>
                Dashboard
                <MenuSquare
                    size={30}
                    className='block lg:hidden cursor-pointer'
                    onClick={() => setOpenMobileSidebar(prev => !prev)}
                />
            </h1>
            <div className='flex flex-col items-center justify-center gap-4 mt-10'>
                <p className='text-3xl font-semibold text-green-800 flex items-center justify-center gap-1'>
                    Welcome Back <Heart size={40} fill='red' strokeWidth={0} />
                </p>
                <p className='text-4xl font-bold text-green-900'>
                    {session.data?.user.name}
                </p>
            </div>

            <div className='flex flex-col md:flex-row justify-center gap-8 mt-20 px-4'>

                <div className='flex-1 bg-white shadow-lg border border-gray-100 p-6 rounded-xl'>
                    <h2 className='flex items-center justify-center gap-2 text-xl font-bold text-green-900 mb-4'>
                        <PlusCircle /> Add New Credential
                    </h2>

                    <form onSubmit={handleSubmit} className='space-y-4'>

                        <input
                            type="text"
                            placeholder="Credential Name / Title"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='form-input'
                            required
                        />

                        <input
                            type="email"
                            placeholder="Connected Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='form-input'
                        />

                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value as CredentialType)}
                            className='form-select'
                            required
                        >
                            <option className='select-option' value="">Select Credential Type</option>
                            <option className='select-option' value="password">Password</option>
                            <option className='select-option' value="pin">PIN</option>
                            <option className='select-option' value="security-code">Security Code</option>
                            <option className='select-option' value="security-question">Security Question</option>
                            <option className='select-option' value="recovery-code">Recovery Code</option>
                            <option className='select-option' value="otp">OTP</option>
                            <option className='select-option' value="session-token">Session Token</option>
                            <option className='select-option' value="api-key">API Key</option>
                            <option className='select-option' value="others">Others</option>
                        </select>

                        <textarea
                            placeholder="Enter credential value"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className='form-input min-h-30'
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className='w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-green-900 text-white py-3 rounded-lg font-semibold transition cursor-pointer'
                        >
                            {loading && <Loader2 size={20} className="animate-spin" />}
                            {loading ? "Saving" : "Save Credential"}
                        </button>
                    </form>
                </div>

                <div className='flex-1 bg-green-50 shadow-lg p-6 rounded-xl border border-green-100'>
                    <h2 className='text-xl font-semibold text-gray-800'>
                        Secure Vault Tips
                    </h2>
                    <p className='text-gray-600 mt-2'>
                        Store sensitive credentials securely. Values will be encrypted before saving to database.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Dashboard