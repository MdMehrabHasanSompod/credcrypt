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

const Register = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const router = useRouter();

    const submitHandler = async (
        e: React.SubmitEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            const result = await axios.post("/api/user/setup-password", {
                password,
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
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">


                <div className="p-8">

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 transition"
                    >
                        <ArrowLeft size={17} />
                        Back to Home
                    </Link>

                    <div className="mt-7 text-center">

                        <div className="w-16 h-16 mx-auto rounded-2xl bg-green-100 flex items-center justify-center">
                            <ShieldCheck className="text-green-700" size={32} />
                        </div>

                        <h1 className="mt-5 text-3xl font-bold text-gray-900">
                            Set Up Password
                        </h1>

                        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                            Create a strong password to keep your account protected.
                        </p>
                    </div>

                    <form
                        className="mt-8 space-y-5"
                        onSubmit={submitHandler}
                    >
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Password
                            </label>

                            <div className="relative">

                                <Lock
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type={showPass ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="form-input pl-10!"
                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                    onClick={() => setShowPass((prev) => !prev)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-700 cursor-pointer transition"
                                >
                                    {showPass ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                            <p className="font-medium text-green-800 mb-2 text-sm">
                                Password Requirements
                            </p>

                            <ul className="text-sm text-green-700 space-y-1">
                                <li>• 8–24 characters long</li>
                                <li>• At least one uppercase letter</li>
                                <li>• At least one lowercase letter</li>
                                <li>• At least one number</li>
                                <li>• One special character (@$!%*?&)</li>
                            </ul>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 rounded-xl bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold flex items-center justify-center gap-3 transition-all duration-200 disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed shadow-lg shadow-green-700/20"
                        >
                            {loading && (
                                <Loader2
                                    size={20}
                                    className="animate-spin"
                                />
                            )}

                            {loading ? "Saving..." : "Save Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;