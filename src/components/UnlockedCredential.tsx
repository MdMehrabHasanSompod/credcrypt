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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-in fade-in zoom-in duration-200">

            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">

                <div className="bg-linear-to-r from-green-700 to-green-600 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl">
                            <Unlock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">
                                Credential Unlocked
                            </h1>
                            <p className="text-xs text-green-100">
                                Decrypted secure credential preview
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setOpenUnlockedCredModal(false)}
                        className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200 mb-6">
                        <Lock className="w-5 h-5 text-green-600 shrink-0" />
                        <p className="text-sm text-green-800">
                            This credential has been successfully decrypted
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg p-3 border border-gray-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <User className="w-4 h-4 text-green-600" />
                                    <p className="text-xs text-gray-500 font-medium">Name</p>
                                </div>
                                <p className="font-semibold text-gray-900 text-sm">{data.name}</p>
                            </div>

                            <div className="bg-white rounded-lg p-3 border border-gray-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <Mail className="w-4 h-4 text-blue-600" />
                                    <p className="text-xs text-gray-500 font-medium">Email</p>
                                </div>
                                <p className="font-semibold text-gray-900 text-sm break-all">{data.email || "Not provided"}</p>
                            </div>

                            <div className="bg-white rounded-lg p-3 border border-gray-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <Key className="w-4 h-4 text-purple-600" />
                                    <p className="text-xs text-gray-500 font-medium">Type</p>
                                </div>
                                <p className="font-semibold text-gray-900 text-sm">{data.type}</p>
                            </div>

                            <div className="bg-white rounded-lg p-3 border border-gray-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <Shield className="w-4 h-4 text-red-600" />
                                    <p className="text-xs text-gray-500 font-medium">Value</p>
                                </div>
                                <p className="font-mono font-semibold text-gray-900 text-sm break-all bg-gray-50 p-2 rounded-lg border border-gray-200">
                                    {data.value}
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-3 border border-gray-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <Calendar className="w-4 h-4 text-gray-600" />
                                    <p className="text-xs text-gray-500 font-medium">Created</p>
                                </div>
                                <p className="text-gray-800 text-xs">
                                    {new Date(data.createdAt).toLocaleString()}
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-3 border border-gray-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <Clock className="w-4 h-4 text-gray-600" />
                                    <p className="text-xs text-gray-500 font-medium">Updated</p>
                                </div>
                                <p className="text-gray-800 text-xs">
                                    {new Date(data.updatedAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleCopy}
                        className="w-full mt-6 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                        {copied ? (
                            <>
                                <CheckCircle className="w-5 h-5" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="w-5 h-5" />
                                Copy Credential Value
                            </>
                        )}
                    </button>

                    <div className="flex items-center gap-2 mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        <p className="text-xs text-amber-700">
                            Keep this credential private and secure. Never share it with anyone.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UnlockedCredential