import { IDecryptedCredential } from '@/types/credential.type'
import React from 'react'

type propsTypes = {
    selectedCredential: IDecryptedCredential;
    copyToClipboard: (text: string) => Promise<void>;
}

const UnlockedCredential = ({ selectedCredential, copyToClipboard }: propsTypes) => {
    return (
        <div className="mt-6 bg-white border p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2">
                Credential Details
            </h2>

            <pre className="text-sm bg-gray-50 p-3 rounded-lg overflow-x-auto">
                {JSON.stringify(selectedCredential, null, 2)}
            </pre>

            <div className="mt-3 flex gap-2">
                <button
                    onClick={() =>
                        copyToClipboard(selectedCredential.value)
                    }
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Copy Value
                </button>
            </div>
        </div>
    )
}

export default UnlockedCredential