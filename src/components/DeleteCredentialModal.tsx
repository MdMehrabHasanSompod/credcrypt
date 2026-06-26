import { useCredentialStore } from "@/stores/credentials.store";
import axios from "axios";
import React, { useState } from "react";
import { Trash2, AlertTriangle, ArrowLeft, X, Shield, Lock, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

type propsTypes = {
    credId: string;
    masterKey: string;
    credentialName: string;
    setDeleteCredentialModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteCredentialModal = ({
    credId,
    masterKey,
    credentialName,
    setDeleteCredentialModal,
}: propsTypes) => {
    const [step, setStep] = useState<1 | 2>(1);
    const [confirmationText, setConfirmationText] = useState("");
    const [loading, setLoading] = useState(false);
    const credentials = useCredentialStore((state) => state.credentials)
    const setCredentials = useCredentialStore((state) => state.setCredentials)

    const handleDelete = async () => {
        setLoading(true);
        try {
            const result = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/delete-credential`, {
                data: {
                    masterKey,
                    credId
                }
            })

            if (result.status === 200) {
                toast.success("Credential deleted successfully")
                const updatedCredentials = credentials.filter((cred) => cred._id !== credId)
                setCredentials(updatedCredentials)
                setDeleteCredentialModal(false);
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                <div className="bg-linear-to-r from-red-600 to-red-700 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl">
                            <Trash2 className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-white">
                            {step === 1 ? "Delete Credential" : "Confirm Deletion"}
                        </h2>
                    </div>
                    <button
                        onClick={() => setDeleteCredentialModal(false)}
                        className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {step === 1 ? (
                        <>
                            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-200 mb-6">
                                <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-red-800">
                                        Permanent Deletion
                                    </p>
                                    <p className="text-xs text-red-600">
                                        This action cannot be undone
                                    </p>
                                </div>
                            </div>

                            <p className="text-gray-700 text-sm mb-2">
                                Are you sure you want to permanently delete this credential?
                            </p>

                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-lg">
                                        <Shield className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Credential Name</p>
                                        <p className="text-sm font-semibold text-gray-800">{credentialName}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
                                <button
                                    onClick={() => setDeleteCredentialModal(false)}
                                    className="w-full cursor-pointer sm:w-auto px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setStep(2)}
                                    className="w-full cursor-pointer sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Continue Deletion
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200 mb-6">
                                <Lock className="w-6 h-6 text-amber-600 shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-amber-800">
                                        Confirm Credential Name
                                    </p>
                                    <p className="text-xs text-amber-600">
                                        Type the credential name exactly as shown
                                    </p>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-3">
                                To confirm deletion, type the credential name below.
                            </p>

                            <div className="bg-gray-100 rounded-xl p-4 border-2 border-gray-200 text-center font-mono font-bold text-lg text-gray-800 mb-4">
                                {credentialName}
                            </div>

                            <input
                                type="text"
                                value={confirmationText}
                                onChange={(e) => setConfirmationText(e.target.value)}
                                placeholder="Type credential name here..."
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none text-gray-700"
                                autoFocus
                            />

                            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setStep(1)}
                                    className="w-full cursor-pointer sm:w-auto px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Go Back
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={confirmationText !== credentialName || loading}
                                    className="w-full cursor-pointer sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:bg-red-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-4 h-4" />
                                            Delete Permanently
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
};

export default DeleteCredentialModal;