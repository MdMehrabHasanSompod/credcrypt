import { IDecryptedCredential } from '@/types/credential.type'
import React from 'react'

type propsTypes = {
    selectedCredential: IDecryptedCredential;
    copyToClipboard: (text: string) => Promise<void>;
    setOpenUnlockedCredModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UnlockedCredential = ({
    selectedCredential,
    copyToClipboard,
    setOpenUnlockedCredModal
}: propsTypes) => {
    const data = selectedCredential;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">

            <div className="w-full max-w-xl bg-white rounded-xl shadow-xl p-6 sm:p-8 relative">
                <button
                    onClick={() => setOpenUnlockedCredModal(false)}
                    className="absolute top-3 right-3 text-gray-500 cursor-pointer hover:text-green-900 text-3xl"
                >
                    ✕
                </button>

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
                    Credential <span className="text-green-600">Unlocked</span>
                </h1>

                <p className="text-center text-sm text-gray-500 mt-2">
                    Decrypted secure credential preview
                </p>
                <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">

                    <div className="grid grid-cols-2 gap-4 text-sm">

                        <div>
                            <p className="text-gray-500">Name</p>
                            <p className="font-semibold text-gray-900">{data.name}</p>
                        </div>

                        <div>
                            <p className="text-gray-500">Email</p>
                            <p className="font-semibold text-gray-900 break-all">{data.email}</p>
                        </div>

                        <div>
                            <p className="text-gray-500">Type</p>
                            <p className="font-semibold text-gray-900">{data.type}</p>
                        </div>

                        <div>
                            <p className="text-gray-500">Value</p>
                            <p className="font-mono font-semibold text-gray-900 break-all">
                                {data.value}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">Created</p>
                            <p className="text-gray-800">
                                {new Date(data.createdAt).toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">Updated</p>
                            <p className="text-gray-800">
                                {new Date(data.updatedAt).toLocaleString()}
                            </p>
                        </div>

                    </div>
                </div>

                <button
                    onClick={() => copyToClipboard(data.value)}
                    className="w-full mt-5 bg-green-800 text-white py-3 rounded-lg hover:bg-green-900 cursor-copy transition flex items-center justify-center gap-2"
                >
                    Copy Value
                </button>

                <p className="text-center text-xs text-red-600 mt-4">
                    ⚠️ Keep this credential private and secure
                </p>

            </div>
        </div>
    )
}

export default UnlockedCredential