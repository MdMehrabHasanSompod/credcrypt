"use client";
import { assets } from '@/assets/assets'
import axios from 'axios';
import { ArrowLeft, Eye, EyeOff, Loader2, Mail, Key, Shield, } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from 'react-toastify';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const router = useRouter();

    const submitHandler = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false
            })

            if (result?.ok) {
                toast.success("Logged in successfully")
                router.push("/api/auth/post-login");
                setEmail("");
                setPassword("");
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
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-green-900 to-green-700 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 md:p-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-700 transition-all duration-200 group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
                        Back to Home
                    </Link>

                    <div className="mt-4 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-green-100 to-emerald-100 shadow-inner">
                            <Shield className="w-8 h-8 text-green-700" />
                        </div>
                        <h1 className="mt-4 text-2xl font-bold text-gray-900">
                            Login to <span className="text-green-600">CredCrypt</span>
                        </h1>
                        <p className="mt-1.5 text-sm text-gray-500">
                            Secure access to your credentials
                        </p>
                    </div>

                    <form className="mt-6 space-y-4" onSubmit={submitHandler}>
                        <div className="relative">
                            <Mail size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative">
                            <Key size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="Password"
                                className="form-input"
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$"
                                required
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setPassword(e.target.value)
                                }
                                onInvalid={(e: React.InvalidEvent<HTMLInputElement>) => {
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
                                            "Password must contain uppercase, lowercase, number, and special character (@$!%*?&)"
                                        );
                                    }
                                }}
                                onInput={(e: React.FormEvent<HTMLInputElement>) =>
                                    (e.target as HTMLInputElement).setCustomValidity("")
                                }
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass((prev) => !prev)}
                                className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors duration-200"
                            >
                                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => router.push("/contact-support")}
                                className="text-sm text-red-600 hover:text-red-700 cursor-pointer hover:underline transition-all duration-200 font-medium"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full cursor-pointer bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 size={20} className="animate-spin" />}
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-linear-to-r from-transparent to-gray-200" />
                        <span className="text-xs text-gray-400 font-medium">OR</span>
                        <div className="flex-1 h-px bg-linear-to-l from-transparent to-gray-200" />
                    </div>

                    <button
                        type="button"
                        onClick={() => signIn("google", { callbackUrl: "/api/auth/post-login" })}
                        className="w-full flex items-center cursor-pointer justify-center gap-3 border-2 border-gray-200 hover:border-green-400 py-3.5 px-4 rounded-xl hover:bg-green-50 transition-all duration-200 group"
                    >
                        <Image src={assets.GoogleImage} alt="Google" width={22} height={22} />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-green-700 transition-colors duration-200">
                            Continue with Google
                        </span>
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don&apos;t have an account?{" "}
                        <button
                            onClick={() => router.push("/register")}
                            className="text-green-600 font-medium cursor-pointer hover:text-green-700 hover:underline transition-all duration-200 focus:outline-none"
                        >
                            Register
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;