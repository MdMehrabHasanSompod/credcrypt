import React from 'react'

type propsTypes = {
    masterKey: string;
    setMasterKey: React.Dispatch<React.SetStateAction<string>>;
    setOpenMasterModal: React.Dispatch<React.SetStateAction<boolean>>;
    revealCredential: () => void;
    verifying: boolean;
}

const OpenMasterModal = ({ masterKey, setMasterKey, setOpenMasterModal, revealCredential, verifying }: propsTypes) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">

                <h2 className="text-lg font-semibold mb-4">
                    Enter Master Key
                </h2>

                <input
                    type="password"
                    value={masterKey}
                    onChange={(e) => setMasterKey(e.target.value)}
                    className="w-full border p-2 rounded-lg"
                    placeholder="Master Key"
                />

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={() => setOpenMasterModal(false)}
                        className="px-4 py-2 bg-gray-200 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={revealCredential}
                        disabled={verifying}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                        {verifying ? "Verifying..." : "Unlock"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OpenMasterModal