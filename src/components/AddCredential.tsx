"use client"
import React, { useState } from 'react'
import { MenuSquare, PlusCircle, Lock, AlertCircle, Sparkles } from 'lucide-react'
import { useSession } from 'next-auth/react';
import OpenVerifySaveModal from './OpenVerifySaveModal';
import { ICredType } from '@/types/credential.type';


type propType = {
    setOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

export type CredentialType = "" | ICredType;


const AddCredential = ({ setOpenMobileSidebar }: propType) => {
    const session = useSession()
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [type, setType] = useState<CredentialType>("")
    const [value, setValue] = useState<string>("")
    const [openVerifySaveModal, setOpenVerifySaveModal] = useState<boolean>(false);

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!type) {
            alert("Please select a credential type!")
            return;
        }
        if (!session?.data?.user.id) {
            alert("Identified Suspicious Attempt")
            return;
        }
        setOpenVerifySaveModal(true)
    }

    return (
        <div className='w-full mx-auto overflow-x-hidden'>
            <div className='bg-linear-to-r from-green-800 to-green-600 w-full py-4 px-6 md:px-8 shadow-lg rounded-xl my-2 flex items-center justify-between gap-4'>
                <h1 className='text-xl md:text-2xl lg:text-3xl text-white font-bold flex items-center gap-3'>
                    <PlusCircle className='w-6 h-6 md:w-7 md:h-7' />
                    Add Credential
                </h1>
                <button
                    onClick={() => setOpenMobileSidebar(prev => !prev)}
                    className='lg:hidden text-white hover:bg-green-700 p-2 rounded-lg transition-all duration-200'
                >
                    <MenuSquare size={28} />
                </button>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8 px-4'>
                <div className='lg:col-span-3'>
                    <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
                        <div className='bg-linear-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-100'>
                            <h2 className='flex items-center gap-2 text-xl font-bold text-green-900'>
                                <PlusCircle className='w-5 h-5' />
                                Add New Credential
                            </h2>
                            <p className='text-sm text-gray-600 mt-1'>Store your sensitive information securely</p>
                        </div>

                        <form onSubmit={handleSubmit} className='p-6 space-y-5'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Credential Name <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Gmail Account, GitHub Token"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-gray-700'
                                    required
                                    minLength={2}
                                    maxLength={100}
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Connected Email <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter associated email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-gray-700'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Credential Type <span className='text-red-500'>*</span>
                                </label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value as CredentialType)}
                                    className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-gray-700 bg-white appearance-none cursor-pointer'
                                    required
                                >
                                    <option className='select-option' value="">Select Credential Type</option>
                                    <option className='select-option' value="password">🔑 Password</option>
                                    <option className='select-option' value="pin">🔢 PIN</option>
                                    <option className='select-option' value="security-code">🛡️ Security Code</option>
                                    <option className='select-option' value="security-question">❓ Security Question</option>
                                    <option className='select-option' value="recovery-code">🔄 Recovery Code</option>
                                    <option className='select-option' value="otp">📱 OTP</option>
                                    <option className='select-option' value="session-token">🍪 Session Token</option>
                                    <option className='select-option' value="api-key">🔌 API Key</option>
                                    <option className='select-option' value="others">📦 Others</option>
                                </select>
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Credential Value <span className='text-red-500'>*</span>
                                </label>
                                <textarea
                                    placeholder="Enter the credential value"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-gray-700 min-h-30 resize-y'
                                    required
                                />
                                <p className='text-xs text-gray-500 mt-2 flex items-center gap-1'>
                                    <Lock className='w-3 h-3' />
                                    This value will be encrypted before saving
                                </p>
                            </div>

                            <button
                                type='submit'
                                className='w-full cursor-pointer bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg'
                            >
                                Save Credential
                            </button>
                        </form>
                    </div>
                </div>

                <div className='lg:col-span-2'>
                    <div className='bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 shadow-lg p-6 sticky top-6'>
                        <div className='flex items-center gap-2 mb-4'>
                            <Sparkles className='w-5 h-5 text-green-600' />
                            <h2 className="text-xl font-semibold text-green-900">
                                Secure Vault Tips
                            </h2>
                        </div>

                        <p className="text-sm text-gray-600 mb-6">
                            Everything stored here is encrypted before being saved.
                        </p>

                        <div className="space-y-3.5">
                            <div className="flex gap-3 items-start group hover:bg-white/50 p-2 rounded-lg transition-all duration-200">
                                <div className="mt-1 h-2 w-2 rounded-full bg-green-500 group-hover:bg-green-600 transition-colors duration-200 shrink-0" />
                                <p className="text-sm text-gray-700">
                                    Use unique name for every credential.
                                </p>
                            </div>

                            <div className="flex gap-3 items-start group hover:bg-white/50 p-2 rounded-lg transition-all duration-200">
                                <div className="mt-1 h-2 w-2 rounded-full bg-green-500 group-hover:bg-green-600 transition-colors duration-200 shrink-0" />
                                <p className="text-sm text-gray-700">
                                    Never share your master key & password with others.
                                </p>
                            </div>

                            <div className="flex gap-3 items-start group hover:bg-white/50 p-2 rounded-lg transition-all duration-200">
                                <div className="mt-1 h-2 w-2 rounded-full bg-green-500 group-hover:bg-green-600 transition-colors duration-200 shrink-0" />
                                <p className="text-sm text-gray-700">
                                    Verify before saving sensitive credentials.
                                </p>
                            </div>

                            <div className="flex gap-3 items-start group hover:bg-white/50 p-2 rounded-lg transition-all duration-200">
                                <div className="mt-1 h-2 w-2 rounded-full bg-green-500 group-hover:bg-green-600 transition-colors duration-200 shrink-0" />
                                <p className="text-sm text-gray-700">
                                    Store sensitive data without hesitation.
                                </p>
                            </div>

                            <div className="flex gap-3 items-start group hover:bg-white/50 p-2 rounded-lg transition-all duration-200">
                                <div className="mt-1 h-2 w-2 rounded-full bg-green-500 group-hover:bg-green-600 transition-colors duration-200 shrink-0" />
                                <p className="text-sm text-gray-700">
                                    Always select the right credential type.
                                </p>
                            </div>

                            <div className="flex gap-3 items-start group hover:bg-white/50 p-2 rounded-lg transition-all duration-200">
                                <div className="mt-1 h-2 w-2 rounded-full bg-green-500 group-hover:bg-green-600 transition-colors duration-200 shrink-0" />
                                <p className="text-sm text-gray-700">
                                    Values will be completely encrypted before saving into database.
                                </p>
                            </div>

                            <div className="flex gap-3 items-start group hover:bg-white/50 p-2 rounded-lg transition-all duration-200">
                                <div className="mt-1 h-2 w-2 rounded-full bg-green-500 group-hover:bg-green-600 transition-colors duration-200 shrink-0" />
                                <p className="text-sm text-gray-700">
                                    CredCrypt never shares or reveals your data.
                                </p>
                            </div>

                            <div className="flex gap-3 items-start group hover:bg-white/50 p-2 rounded-lg transition-all duration-200">
                                <div className="mt-1 h-2 w-2 rounded-full bg-green-500 group-hover:bg-green-600 transition-colors duration-200 shrink-0" />
                                <p className="text-sm text-gray-700">
                                    Your data is not used to train LLMs.
                                </p>
                            </div>

                            <div className="flex gap-3 items-start group hover:bg-white/50 p-2 rounded-lg transition-all duration-200">
                                <div className="mt-1 h-2 w-2 rounded-full bg-green-500 group-hover:bg-green-600 transition-colors duration-200 shrink-0" />
                                <p className="text-sm text-gray-700">
                                    CredCrypt is 100% safe and easy to manage.
                                </p>
                            </div>

                            <div className="flex gap-3 items-start group hover:bg-white/50 p-2 rounded-lg transition-all duration-200">
                                <div className="mt-1 h-2 w-2 rounded-full bg-green-500 group-hover:bg-green-600 transition-colors duration-200 shrink-0" />
                                <p className="text-sm text-gray-700">
                                    Need help? Contact our support team—we're here to help.
                                </p>
                            </div>
                        </div>

                        <div className='mt-6 p-4 bg-green-100/50 rounded-xl border border-green-200'>
                            <div className='flex items-start gap-3'>
                                <AlertCircle className='w-5 h-5 text-green-600 shrink-0 mt-0.5' />
                                <div>
                                    <p className='text-sm font-medium text-green-800'>Pro Tip</p>
                                    <p className='text-xs text-green-700'>Use a strong, unique value for each credential to maximize security.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {openVerifySaveModal && (
                <OpenVerifySaveModal
                    setOpenVerifySaveModal={setOpenVerifySaveModal}
                    name={name}
                    email={email}
                    type={type as ICredType}
                    value={value}
                    setName={setName}
                    setEmail={setEmail}
                    setType={setType}
                    setValue={setValue}
                />
            )}
        </div>
    )
}

export default AddCredential