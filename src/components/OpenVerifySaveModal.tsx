import { ICredential, ICredType } from '@/types/credential.type';
import React, { useState } from 'react'
import { CredentialType } from './AddCredential';
import axios from 'axios';
import { useCredentialStore } from '@/stores/credentials.store';
import { X, Shield, Key, Lock, Loader2, ArrowLeft, Eye, EyeOff, Save, CheckCircle } from 'lucide-react';

type propsTypes = {
    setOpenVerifySaveModal: React.Dispatch<React.SetStateAction<boolean>>;
    name: string;
    email: string;
    type: ICredType;
    value: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setType: React.Dispatch<React.SetStateAction<CredentialType>>;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const OpenVerifySaveModal = ({ setOpenVerifySaveModal, name, email, type, value, setName, setEmail, setType, setValue }: propsTypes) => {
    const credentials = useCredentialStore((state) => state.credentials)
    const setCredentials = useCredentialStore((state) => state.setCredentials)
    const [masterKey, setMasterKey] = useState<string>("")
    const [verifying, setVerifying] = useState<boolean>(false);
    const [showKey, setShowKey] = useState<boolean>(false);

    const saveCredential = async () => {
        setVerifying(true)
        try {
            const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/add-credential`, {
                masterKey,
                name,
                email,
                type,
                value
            })

            if (result.status === 201) {

                console.log(result)
                setCredentials([...credentials, result.data.data])
                setMasterKey("")
                setName("")
                setEmail("")
                setType("")
                setValue("")
                setOpenVerifySaveModal(false)
            }

        } catch (error) {
            console.error(error)
        } finally {
            setVerifying(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-in fade-in zoom-in duration-200">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

                <div className="bg-linear-to-r from-green-700 to-green-600 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">
                                Verify Master Key
                            </h2>
                            <p className="text-xs text-green-100">
                                Enter your master key to save
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setOpenVerifySaveModal(false)}
                        className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200 mb-6">
                        <Lock className="w-5 h-5 text-blue-600 shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-blue-800">
                                Secure Credential
                            </p>
                            <p className="text-xs text-blue-600">
                                Enter your master key to encrypt and save this credential
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-4">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Name</p>
                                <p className="font-semibold text-gray-800 truncate">{name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Type</p>
                                <p className="font-semibold text-gray-800 capitalize">{type}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-xs text-gray-500 font-medium">Email</p>
                                <p className="font-semibold text-gray-800 truncate">{email || "Not provided"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type={showKey ? "text" : "password"}
                            value={masterKey}
                            onChange={(e) => setMasterKey(e.target.value)}
                            placeholder="Enter your master key"
                            className="w-full pl-11 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-gray-700"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !verifying) {
                                    saveCredential();
                                }
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowKey(!showKey)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                            {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">
                        <button
                            onClick={() => setOpenVerifySaveModal(false)}
                            className="w-full cursor-pointer sm:w-auto px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Cancel
                        </button>

                        <button
                            onClick={saveCredential}
                            disabled={verifying || !masterKey.trim()}
                            className="w-full cursor-pointer sm:w-auto px-6 py-2.5 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {verifying ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save Credential
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OpenVerifySaveModal