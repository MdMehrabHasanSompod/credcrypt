"use client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteAccount = () => {
    const router = useRouter();
    const [step, setStep] = useState<1 | 2>(1);
    const [masterKey, setMasterKey] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

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
        <div className="min-h-screen bg-green-700 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 sm:p-8">

                {step === 1 && (
                    <>
                        <h1 className="text-2xl font-bold text-center">
                            Delete Your Account
                        </h1>

                        <p className="text-sm text-gray-500 text-center mt-2">
                            This action is irreversible. All your data will be permanently deleted.
                        </p>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => router.push("/user/dashboard")}
                                className="w-1/2 bg-gray-200 py-3 rounded-lg cursor-pointer"
                            >
                                Go Back
                            </button>

                            <button
                                onClick={() => setStep(2)}
                                className="w-1/2 bg-red-600 text-white py-3 rounded-lg cursor-pointer"
                            >
                                Continue
                            </button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h1 className="text-2xl font-bold text-center text-red-600">
                            Confirm Deletion
                        </h1>

                        <p className="text-sm text-gray-500 text-center mt-2">
                            Enter your credentials to permanently delete your account.
                        </p>

                        <input
                            type="text"
                            placeholder="Master Key"
                            value={masterKey}
                            onChange={(e) => setMasterKey(e.target.value)}
                            className="form-input my-4 focus:border-red-500!"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input mb-4 focus:border-red-500!"
                        />

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setStep(1)}
                                className="w-1/2 bg-gray-200 py-3 rounded-lg cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                disabled={loading}
                                className="w-1/2 bg-red-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {loading && <Loader2 className="animate-spin" size={18} />}
                                Delete Account
                            </button>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}

export default DeleteAccount