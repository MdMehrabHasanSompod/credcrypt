import React, { useState } from 'react'
import { X, Shield, Key, Lock, Loader2, ArrowLeft, Eye, EyeOff, Edit } from 'lucide-react'

type propsTypes = {
    masterKey: string;
    setMasterKey: React.Dispatch<React.SetStateAction<string>>;
    setOpenUpdateMasterModal: React.Dispatch<React.SetStateAction<boolean>>;
    verifyUpdateRequest: () => void;
    verifying: boolean;
}

const OpenUpdateMasterModal = ({
    masterKey,
    setMasterKey,
    setOpenUpdateMasterModal,
    verifyUpdateRequest,
    verifying
}: propsTypes) => {
    const [showKey, setShowKey] = useState<boolean>(false);

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-in fade-in zoom-in duration-200">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

                <div className="bg-linear-to-r from-blue-700 to-blue-600 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl">
                            <Edit className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">
                                Verify Master Key
                            </h2>
                            <p className="text-xs text-blue-100">
                                Enter your master key to update
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setOpenUpdateMasterModal(false)}
                        className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200 mb-6">
                        <Lock className="w-5 h-5 text-blue-600 shrink-0" />
                        <p className="text-sm text-blue-800">
                            Enter your master key to verify and update the credential
                        </p>
                    </div>

                    <div className="relative">
                        <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type={showKey ? "text" : "password"}
                            value={masterKey}
                            onChange={(e) => setMasterKey(e.target.value)}
                            placeholder="Enter your master key"
                            className="w-full pl-11 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-gray-700"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !verifying) {
                                    verifyUpdateRequest();
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
                            onClick={() => setOpenUpdateMasterModal(false)}
                            className="w-full cursor-pointer sm:w-auto px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Cancel
                        </button>

                        <button
                            onClick={verifyUpdateRequest}
                            disabled={verifying || !masterKey.trim()}
                            className="w-full cursor-pointer sm:w-auto px-6 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {verifying ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    <Shield className="w-4 h-4" />
                                    Verify & Update
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OpenUpdateMasterModal