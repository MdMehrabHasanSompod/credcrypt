import React from 'react'

type propsTypes = {
    masterKey: string;
    setMasterKey: React.Dispatch<React.SetStateAction<string>>;
    setOpenDeleteMasterModal: React.Dispatch<React.SetStateAction<boolean>>;
    verifyDeleteRequest: () => void;
    verifying: boolean;
}

const OpenDeleteMasterModal = ({
    masterKey,
    setMasterKey,
    setOpenDeleteMasterModal,
    verifyDeleteRequest,
    verifying
}: propsTypes) => {
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
                        onClick={() => setOpenDeleteMasterModal(false)}
                        className="w-full cursor-pointer sm:w-auto px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm sm:text-base"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={verifyDeleteRequest}
                        disabled={verifying}
                        className="w-full sm:w-auto cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                        {verifying ? "Verifying..." : "Verify"}
                    </button>

                </div>

            </div>
        </div>
    )
}

export default OpenDeleteMasterModal