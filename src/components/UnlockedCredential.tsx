import { IDecryptedCredential } from '@/types/credential.type'
import React from 'react'
import { X, Copy, CheckCircle, Shield, Lock, Unlock, User, Mail, Key, Calendar, Clock, AlertTriangle } from 'lucide-react'
import { toast } from 'react-toastify';

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
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
        await copyToClipboard(data.value);
        setCopied(true);
        toast.success("Value copied")
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-2 sm:px-4 animate-in fade-in zoom-in duration-200 p-2 sm:p-4">

            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[98vh] sm:max-h-[95vh] flex flex-col">

                <div className="bg-linear-to-r from-green-700 to-green-600 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between shrink-0 gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <div className="bg-white/20 p-1.5 sm:p-2 rounded-xl shrink-0">
                            <Unlock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h1 className="text-sm sm:text-xl font-bold text-white truncate">
                                Credential Unlocked
                            </h1>
                            <p className="text-[10px] sm:text-xs text-green-100 truncate">
                                Decrypted secure credential preview
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setOpenUnlockedCredModal(false)}
                        className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 sm:p-2 rounded-lg transition-all duration-200 shrink-0"
                    >
                        <X className="w-5 h-5 sm:w-5 sm:h-5" />
                    </button>
                </div>

                <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                    <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-green-50 rounded-xl border border-green-200 mb-4 sm:mb-6">
                        <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0" />
                        <p className="text-xs sm:text-sm text-green-800">
                            This credential has been successfully decrypted
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl border border-gray-200 p-3 sm:p-5 space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div className="bg-white rounded-lg p-2.5 sm:p-3 border border-gray-100">
                                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 shrink-0" />
                                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Name</p>
                                </div>
                                <p className="font-semibold text-gray-900 text-xs sm:text-sm wrap-break-word">{data.name}</p>
                            </div>

                            <div className="bg-white rounded-lg p-2.5 sm:p-3 border border-gray-100">
                                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0" />
                                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Email</p>
                                </div>
                                <p className="font-semibold text-gray-900 text-xs sm:text-sm wrap-break-word">{data.email || "Not provided"}</p>
                            </div>

                            <div className="bg-white rounded-lg p-2.5 sm:p-3 border border-gray-100">
                                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                                    <Key className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 shrink-0" />
                                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Type</p>
                                </div>
                                <p className="font-semibold text-gray-900 text-xs sm:text-sm wrap-break-word">{data.type}</p>
                            </div>

                            <div className="bg-white rounded-lg p-2.5 sm:p-3 border border-gray-100">
                                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                                    <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600 shrink-0" />
                                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Value</p>
                                </div>
                                <p className="font-mono font-semibold text-gray-900 text-xs sm:text-sm break-all bg-gray-50 p-1.5 sm:p-2 rounded-lg border border-gray-200">
                                    {data.value}
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-2.5 sm:p-3 border border-gray-100">
                                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 shrink-0" />
                                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Created</p>
                                </div>
                                <p className="text-gray-800 text-[10px] sm:text-xs wrap-break-word">
                                    {new Date(data.createdAt).toLocaleString()}
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-2.5 sm:p-3 border border-gray-100">
                                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 shrink-0" />
                                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Updated</p>
                                </div>
                                <p className="text-gray-800 text-[10px] sm:text-xs wrap-break-word">
                                    {new Date(data.updatedAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleCopy}
                        className="w-full mt-4 sm:mt-6 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2.5 sm:py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                        {copied ? (
                            <>
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                                Copy Credential Value
                            </>
                        )}
                    </button>

                    <div className="flex items-start sm:items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 p-2.5 sm:p-3 bg-amber-50 rounded-xl border border-amber-200">
                        <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
                        <p className="text-[10px] sm:text-xs text-amber-700 leading-relaxed">
                            Keep this credential private and secure. Never share it with anyone.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UnlockedCredential