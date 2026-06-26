"use client";
import axios from "axios";
import { Loader2, Copy, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const setMasterKey = () => {
    const [key, setKey] = useState("");
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchKey = async () => {
            try {
                setLoading(true);

                const result = await axios.get("/api/user/get-master-key");
                setKey(result.data.masterKey);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchKey();
    }, []);

    const handleCopyText = async () => {
        if (!key) return;

        await navigator.clipboard.writeText(key);
        setCopied(true);

        setTimeout(() => setCopied(false), 2000);
    };

    const handleConfirmSave = async () => {
        try {
            setConfirming(true);

            const result = await axios.patch("/api/user/confirm-master-key");
            if (result.status === 200) {
                router.push("/user/dashboard");
            }

        } catch (error) {
            console.log(error);
        } finally {
            setConfirming(false);
        }
    };

    return (
        <div className="min-h-screen bg-green-700 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 sm:p-8">

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
                    Save Your{" "}
                    <span className="text-green-600">Master Key</span>
                </h1>

                <p className="text-center text-sm text-gray-500 mt-2">
                    Do not refresh this page before saving. This master key is available for only <b>this time</b>. After that you <b>can't accees</b> it.
                    Without this key, you can't create or access your credentials. Save it wisely.
                    If you lose it, you can recover it by contacting support.
                </p>

                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <Loader2 className="animate-spin text-green-600" />
                    </div>
                ) : (
                    <>
                        <div className="mt-6 bg-gray-100 border border-gray-200 rounded-lg p-4 break-all text-center font-mono text-lg">
                            {key}
                        </div>

                        <button
                            onClick={handleCopyText}
                            className="w-full mt-4 cursor-copy flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-lg hover:bg-black transition"
                        >
                            {copied ? (
                                <>
                                    <CheckCircle size={18} />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy size={18} />
                                    Copy Master Key
                                </>
                            )}
                        </button>

                        <div className="mt-5 text-sm text-red-600 text-center">
                            ⚠️ Do not share this key with anyone
                        </div>

                        <button
                            disabled={confirming}
                            onClick={handleConfirmSave}
                            className="w-full mt-6 bg-green-600 cursor-pointer hover:bg-green-700 disabled:bg-green-500 disabled:cursor-not-allowed text-white py-3 rounded-lg flex items-center justify-center gap-2"
                        >
                            {confirming && <Loader2 className="animate-spin" />}
                            I Have Saved My Master Key
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default setMasterKey;