"use client";

import axios from "axios";
import {
    ArrowLeft,
    Eye,
    EyeOff,
    Loader2,
    ShieldCheck,
    Lock,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
                router.push("/user/dashboard");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-green-700 flex items-center justify-center px-5 py-10">
            <div className="w-full max-w-md overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl">
                <div className="p-8">
                    <Link
                        href="/user/dashboard"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-green-600"
                    >
                        <ArrowLeft size={17} />
                        Back to Dashboard
                    </Link>

                    <div className="mt-7 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
                            <ShieldCheck
                                size={32}
                                className="text-green-700"
                            />
                        </div>

                        <h1 className="mt-5 text-3xl font-bold text-gray-900">
                            Reset Password
                        </h1>

                        <p className="mt-2 text-sm leading-relaxed text-gray-500">
                            Enter your current password and choose a new secure
                            password to keep your account protected.
                        </p>
                    </div>

                    <form
                        onSubmit={submitHandler}
                        className="mt-8 space-y-5"
                    >

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Current Password
                            </label>

                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type={
                                        showCurrentPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className="form-input pl-10!"
                                    placeholder="Enter current password"
                                    required
                                    pattern={passwordPattern}
                                    value={currentPassword}
                                    onChange={(e) =>
                                        setCurrentPassword(e.target.value)
                                    }
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
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowCurrentPassword((prev) => !prev)
                                    }
                                    className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-green-700"
                                >
                                    {showCurrentPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>


                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                New Password
                            </label>

                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type={
                                        showNewPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter new password"
                                    className="form-input pl-10!"
                                    required
                                    pattern={passwordPattern}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)
                                    }
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
                                        (
                                            e.target as HTMLInputElement
                                        ).setCustomValidity("")
                                    }
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowNewPassword((prev) => !prev)
                                    }
                                    className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-green-700"
                                >
                                    {showNewPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                            <p className="mb-2 text-sm font-medium text-green-800">
                                New Password Requirements
                            </p>

                            <ul className="space-y-1 text-sm text-green-700">
                                <li>• 8–24 characters long</li>
                                <li>• At least one uppercase letter</li>
                                <li>• At least one lowercase letter</li>
                                <li>• At least one number</li>
                                <li>• One special character (@$!%*?&)</li>
                            </ul>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    router.push("/user/dashboard")
                                }
                                className="h-12 flex-1 cursor-pointer rounded-xl border border-gray-300 bg-white font-medium text-gray-700 transition hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex h-12 flex-1 items-center cursor-pointer justify-center gap-2 rounded-xl bg-linear-to-r from-green-600 to-green-700 font-semibold text-white shadow-lg shadow-green-700/20 transition hover:from-green-700 hover:to-green-800 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {loading && (
                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />
                                )}

                                {loading
                                    ? "Updating..."
                                    : "Change Password"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;