import { ICredential, ICredType } from '@/types/credential.type';
import React, { useState } from 'react'
import { CredentialType } from './AddCredential';
import axios from 'axios';
import { useCredentialStore } from '@/stores/credentials.store';

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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">

            <div className="w-full max-w-sm sm:max-w-md bg-white rounded-xl p-5 sm:p-6 shadow-xl relative">

                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">
                    Verify Master Key
                </h2>

                <input
                    type="password"
                    value={masterKey}
                    onChange={(e) => setMasterKey(e.target.value)}
                    placeholder="Master Key"
                    className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm sm:text-base"
                />

                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-5">

                    <button
                        onClick={() => setOpenVerifySaveModal(false)}
                        className="w-full cursor-pointer sm:w-auto px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm sm:text-base"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={saveCredential}
                        disabled={verifying}
                        className="w-full sm:w-auto cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                        {verifying ? "Verifying..." : "Save"}
                    </button>

                </div>

            </div>
        </div>
    )
}

export default OpenVerifySaveModal