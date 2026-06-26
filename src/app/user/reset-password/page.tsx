"use client";

import axios from "axios";
import {
    ArrowLeft,
    Eye,
    EyeOff,
    Loader2,
    ShieldCheck,
    Lock,
    Key,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const passwordPattern =
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,24}$";


    const submitHandler = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);

            const result = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/reset-password`, {
                password: currentPassword,
                newPassword,
            });

            if (result.status === 200) {
                toast.success("Password changed successfully")
                router.push("/user/dashboard");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message || "Something went wrong"
                );
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-green-900 to-green-700 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 md:p-8">
                    <Link
                        href="/user/dashboard"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-700 transition-all duration-200 group"
                    >
                        <ArrowLeft size={17} className="group-hover:-translate-x-1 transition-transform duration-200" />
                        Back to Dashboard
                    </Link>

                    <div className="mt-6 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-green-100 to-emerald-100 shadow-inner">
                            <ShieldCheck size={32} className="text-green-700" />
                        </div>

                        <h1 className="mt-4 text-2xl font-bold text-gray-900">
                            Reset Password
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Enter your current password and choose a new secure password
                        </p>
                    </div>

                    <form onSubmit={submitHandler} className="mt-6 space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Current Password
                            </label>

                            <div className="relative">
                                <Lock size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />

                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    className="w-full pl-11 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-gray-700"
                                    placeholder="Enter current password"
                                    required
                                    pattern={passwordPattern}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    onInvalid={(e) => {
                                        const target = e.target as HTMLInputElement;

                                        if (target.validity.valueMissing) {
                                            target.setCustomValidity("Password is required");
                                        } else if (target.value.length < 8) {
                                            target.setCustomValidity(
                                                "Password must be at least 8 characters"
                                            );
                                        } else if (target.value.length > 24) {
                                            target.setCustomValidity(
                                                "Password cannot exceed 24 characters"
                                            );
                                        } else if (target.validity.patternMismatch) {
                                            target.setCustomValidity(
                                                "Password must contain uppercase, lowercase, number and special character (@$!%*?&)"
                                            );
                                        }
                                    }}
                                    onInput={(e) =>
                                        (e.target as HTMLInputElement).setCustomValidity("")
                                    }
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                                    className="absolute cursor-pointer top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors duration-200"
                                >
                                    {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                New Password
                            </label>

                            <div className="relative">
                                <Key size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />

                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    className="w-full pl-11 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-gray-700"
                                    required
                                    pattern={passwordPattern}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    onInvalid={(e) => {
                                        const target = e.target as HTMLInputElement;

                                        if (target.validity.valueMissing) {
                                            target.setCustomValidity("Password is required");
                                        } else if (target.value.length < 8) {
                                            target.setCustomValidity(
                                                "Password must be at least 8 characters"
                                            );
                                        } else if (target.value.length > 24) {
                                            target.setCustomValidity(
                                                "Password cannot exceed 24 characters"
                                            );
                                        } else if (target.validity.patternMismatch) {
                                            target.setCustomValidity(
                                                "Password must contain uppercase, lowercase, number and special character (@$!%*?&)"
                                            );
                                        }
                                    }}
                                    onInput={(e) =>
                                        (e.target as HTMLInputElement).setCustomValidity("")
                                    }
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword((prev) => !prev)}
                                    className="absolute cursor-pointer top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors duration-200"
                                >
                                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertCircle className="w-4 h-4 text-green-700" />
                                <p className="text-sm font-medium text-green-800">
                                    Password Requirements
                                </p>
                            </div>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-green-700">
                                <li className="flex items-center gap-1.5">
                                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                                    8–24 characters
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                                    Uppercase letter
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                                    Lowercase letter
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                                    One number
                                </li>
                                <li className="col-span-1 sm:col-span-2 flex items-center gap-1.5">
                                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                                    Special character (@$!%*?&)
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => router.push("/user/dashboard")}
                                className="w-full cursor-pointer sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full cursor-pointer sm:w-auto flex-1 px-6 py-3 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck size={18} />
                                        Change Password
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;