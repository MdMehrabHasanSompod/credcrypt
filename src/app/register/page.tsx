"use client";
import { assets } from "@/assets/assets";
import axios from "axios";
import { ArrowLeft, Eye, EyeOff, Loader2, User, Mail, Phone, Key, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
    const router = useRouter()

    const submitHandler = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const result = await axios.post("/api/auth/register", {
                name,
                email,
                phone,
                password,
            });
            console.log(result);
            setName("");
            setEmail("");
            setPassword("");
            setPhone("");
            setLoading(false);
            router.push("/login")
        } catch (error) {
            console.log(error);
            setName("");
            setEmail("");
            setPassword("");
            setPhone("");
            setLoading(false);
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
                            Create Account
                        </h1>
                        <p className="mt-1.5 text-sm text-gray-500">
                            Join CredCrypt and secure your credentials
                        </p>
                    </div>

                    <form className="mt-6 space-y-4" onSubmit={submitHandler}>
                        <div className="relative">
                            <User size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-gray-700"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative">
                            <Mail size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-gray-700"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative">
                            <Phone size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-gray-700"
                                value={phone}
                                minLength={11}
                                maxLength={13}
                                onChange={(e) => setPhone(e.target.value)}
                                onInvalid={(e: React.InvalidEvent<HTMLInputElement>) =>
                                    (e.target as HTMLInputElement).setCustomValidity(
                                        "Phone number must contain 11 to 13 characters"
                                    )
                                }
                                onInput={(e: React.FormEvent<HTMLInputElement>) =>
                                    (e.target as HTMLInputElement).setCustomValidity("")
                                }
                                required
                            />
                        </div>

                        <div className="relative">
                            <Key size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="Password"
                                className="w-full pl-11 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-gray-700"
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$"
                                required
                                value={password}
                                onFocus={() => setShowPasswordRequirements(true)}
                                onBlur={() => setShowPasswordRequirements(false)}
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

                        {showPasswordRequirements && (
                            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-3 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <AlertCircle className="w-3.5 h-3.5 text-green-700" />
                                    <p className="text-xs font-medium text-green-800">
                                        Password Requirements
                                    </p>
                                </div>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 text-xs text-green-700">
                                    <li className="flex items-center gap-1.5">
                                        <CheckCircle className="w-3 h-3 text-green-600" />
                                        8–24 characters
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                        <CheckCircle className="w-3 h-3 text-green-600" />
                                        Uppercase letter
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                        <CheckCircle className="w-3 h-3 text-green-600" />
                                        Lowercase letter
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                        <CheckCircle className="w-3 h-3 text-green-600" />
                                        One number
                                    </li>
                                    <li className="col-span-1 sm:col-span-2 flex items-center gap-1.5">
                                        <CheckCircle className="w-3 h-3 text-green-600" />
                                        Special character (@$!%*?&)
                                    </li>
                                </ul>
                            </div>
                        )}

                        <label className="flex items-start gap-3 text-sm text-gray-600">
                            <input type="checkbox" className="mt-0.5 cursor-pointer accent-green-600 w-4 h-4 rounded border-gray-300" required />
                            <span>I agree to the <span className="text-green-600 font-medium" onClick={() => router.push("/privacy-policy")}>Terms</span> & <span onClick={() => router.push("/privacy-policy")} className="text-green-600 font-medium">Privacy Policy</span></span>
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full cursor-pointer bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 size={20} className="animate-spin" />}
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-linear-to-r from-transparent to-gray-200" />
                        <span className="text-xs text-gray-400 font-medium">OR</span>
                        <div className="flex-1 h-px bg-linear-to-l from-transparent to-gray-200" />
                    </div>

                    <button
                        type="button"
                        onClick={() => signIn("google")}
                        className="w-full cursor-pointer flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-green-400 py-3.5 px-4 rounded-xl hover:bg-green-50 transition-all duration-200 group"
                    >
                        <Image src={assets.GoogleImage} alt="Google" width={22} height={22} />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-green-700 transition-colors duration-200">
                            Continue with Google
                        </span>
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Already have an account?{" "}
                        <button
                            onClick={() => router.push("/login")}
                            className="text-green-600 cursor-pointer font-medium hover:text-green-700 hover:underline transition-all duration-200 focus:outline-none"
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;