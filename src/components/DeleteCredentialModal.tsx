import axios from "axios";
import React, { useState } from "react";

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

    const handleDelete = async () => {
        setLoading(true);
        try {
            const result = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/delete-credential`, {
                data: {
                    masterKey,
                    credId
                }
            })
            setDeleteCredentialModal(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
            <div className="w-full max-w-sm sm:max-w-md bg-white rounded-xl p-5 sm:p-6 shadow-xl relative">

                {step === 1 ? (
                    <>
                        <h2 className="text-lg sm:text-xl font-semibold text-center">
                            Delete Credential
                        </h2>

                        <p className="text-gray-600 text-sm sm:text-base text-center mt-4">
                            Are you sure you want to permanently delete this
                            credential?
                        </p>

                        <p className="text-red-600 text-sm text-center font-medium mt-2">
                            This action cannot be undone.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">

                            <button
                                onClick={() =>
                                    setDeleteCredentialModal(false)
                                }
                                className="w-full sm:w-auto px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition cursor-pointer"
                            >
                                Go Back
                            </button>

                            <button
                                onClick={() => setStep(2)}
                                className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer"
                            >
                                Continue
                            </button>

                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-lg sm:text-xl font-semibold text-center">
                            Confirm Deletion
                        </h2>

                        <p className="text-gray-600 text-sm sm:text-base mt-4">
                            To confirm deletion, type the credential name
                            exactly as shown below.
                        </p>

                        <div className="mt-3 p-3 rounded-lg bg-gray-100 border border-gray-300 text-center font-semibold break-all">
                            {credentialName}
                        </div>

                        <input
                            type="text"
                            value={confirmationText}
                            onChange={(e) =>
                                setConfirmationText(e.target.value)
                            }
                            placeholder="Type credential name"
                            className="focus:border-red-500! form-input my-3"
                        />

                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">

                            <button
                                onClick={() => setStep(1)}
                                className="w-full sm:w-auto px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition cursor-pointer"
                            >
                                Go Back
                            </button>

                            <button
                                onClick={handleDelete}
                                disabled={
                                    confirmationText !== credentialName ||
                                    loading
                                }
                                className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition cursor-pointer"
                            >
                                {loading
                                    ? "Deleting..."
                                    : "Delete Credential"}
                            </button>

                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DeleteCredentialModal;