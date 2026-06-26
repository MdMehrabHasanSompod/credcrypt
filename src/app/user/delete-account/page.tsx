"use client";
import axios from "axios";
import { Loader2, ArrowLeft, Trash2, AlertTriangle, Shield, Key, Lock, Eye, EyeOff, UserX, CheckCircle } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteAccount = () => {
    const router = useRouter();
    const [step, setStep] = useState<1 | 2>(1);
    const [masterKey, setMasterKey] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showMasterKey, setShowMasterKey] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const result = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/delete-account`,
                {
                    data: { masterKey, password },
                }
            );

            if (result.status === 200) {
                await signOut({ redirect: false });
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-red-900 to-red-700 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                <div className="bg-linear-to-r from-red-700 to-red-600 px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl">
                            <UserX className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">
                                {step === 1 ? "Delete Account" : "Confirm Deletion"}
                            </h1>
                            <p className="text-xs text-red-100">
                                {step === 1 ? "Permanent account removal" : "Final confirmation step"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {step === 1 && (
                        <>
                            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-200 mb-6">
                                <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-red-800">
                                        Irreversible Action
                                    </p>
                                    <p className="text-xs text-red-600">
                                        All your data will be permanently deleted
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="bg-red-100 p-2 rounded-lg">
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">What will be deleted</p>
                                        <ul className="text-xs text-gray-700 space-y-1 mt-1">
                                            <li>• All your credentials</li>
                                            <li>• Personal information</li>
                                            <li>• Account settings</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col-reverse sm:flex-row gap-3">
                                <button
                                    onClick={() => router.push("/user/dashboard")}
                                    className="w-full cursor-pointer sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Go Back
                                </button>

                                <button
                                    onClick={() => setStep(2)}
                                    className="w-full cursor-pointer sm:w-auto flex-1 px-6 py-3 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Continue Deletion
                                </button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200 mb-6">
                                <Shield className="w-6 h-6 text-amber-600 shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-amber-800">
                                        Verify Your Identity
                                    </p>
                                    <p className="text-xs text-amber-600">
                                        Enter your credentials to confirm deletion
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="relative">
                                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showMasterKey ? "text" : "password"}
                                        placeholder="Master Key"
                                        value={masterKey}
                                        onChange={(e) => setMasterKey(e.target.value)}
                                        className="w-full pl-11 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none text-gray-700"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowMasterKey(!showMasterKey)}
                                        className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                    >
                                        {showMasterKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>

                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-11 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none text-gray-700"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !loading) {
                                                handleDelete();
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
                                <button
                                    onClick={() => setStep(1)}
                                    className="w-full cursor-pointer sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Cancel
                                </button>

                                <button
                                    onClick={handleDelete}
                                    disabled={loading || !masterKey.trim() || !password.trim()}
                                    className="w-full cursor-pointer sm:w-auto flex-1 px-6 py-3 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-4 h-4" />
                                            Confirm Delete
                                        </>
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DeleteAccount;