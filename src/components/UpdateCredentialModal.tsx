import { useCredentialStore } from "@/stores/credentials.store";
import axios from "axios";
import React, { useState } from "react";
import { Edit, X, Save, Loader2, Shield, Mail, User, Key, Type, CheckSquare, Square } from "lucide-react";
import { toast } from "react-toastify";

type propsTypes = {
    credId: string;
    masterKey: string;
    setUpdateCredentialModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type CredentialType =
    | ""
    | "password"
    | "pin"
    | "security-code"
    | "security-question"
    | "recovery-code"
    | "otp"
    | "session-token"
    | "api-key"
    | "others";

type UpdateFields = {
    name: boolean;
    email: boolean;
    value: boolean;
    type: boolean;
};

const UpdateCredentialModal = ({
    credId,
    masterKey,
    setUpdateCredentialModal,
}: propsTypes) => {
    const credentials = useCredentialStore((state) => state.credentials)
    const setCredentials = useCredentialStore((state) => state.setCredentials)
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [type, setType] = useState<CredentialType>("");
    const [value, setValue] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const [fields, setFields] = useState<UpdateFields>({
        name: false,
        email: false,
        value: false,
        type: false,
    });

    const toggleField = (key: keyof UpdateFields) => {
        setFields((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (fields.type && !type) {
            alert("Please select a credential type!");
            return;
        }

        if (fields.name && name.length < 2) {
            toast.error("Name must be at least 2 characters.");
            return;
        }

        if (fields.name && name.length > 100) {
            toast.error("Name cannot exceed 100 characters.");
            return;
        }

        setLoading(true);

        try {
            const payload: any = {
                masterKey,
                credentialId: credId,
            };

            if (fields.name) payload.updatedName = name;
            if (fields.email) payload.updatedEmail = email;
            if (fields.type) payload.updatedType = type;
            if (fields.value) payload.updatedValue = value;

            const result = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/update-credential`,
                payload
            );

            if (result.status === 200) {
                toast.success("Credential updated successfully")
                const updatedCredentials = credentials.map((cred) => cred._id === credId ? result.data.data : cred)
                setCredentials(updatedCredentials)
                setUpdateCredentialModal(false);
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-2 sm:px-4 p-2 sm:p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[98vh] sm:max-h-[95vh] flex flex-col animate-in fade-in zoom-in duration-200">

                <div className="bg-linear-to-r from-green-700 to-green-600 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between shrink-0 gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <div className="bg-white/20 p-1.5 sm:p-2 rounded-xl shrink-0">
                            <Edit className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <h2 className="text-sm sm:text-xl font-bold text-white truncate flex-1">
                            Update Credential
                        </h2>
                    </div>
                    <button
                        onClick={() => setUpdateCredentialModal(false)}
                        className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 sm:p-2 rounded-lg transition-all duration-200 shrink-0"
                    >
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>

                <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-200 mb-4 sm:mb-6">
                        <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 shrink-0 mt-0.5 sm:mt-0" />
                        <div>
                            <p className="text-sm font-medium text-blue-800">
                                Select Fields to Update
                            </p>
                            <p className="text-xs text-blue-600">
                                Choose which fields you want to modify
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                        <button
                            onClick={() => toggleField("name")}
                            className={`flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 transition-all duration-200 font-medium text-xs sm:text-sm ${fields.name
                                ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-200"
                                : "border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50"
                                }`}
                        >
                            {fields.name ? <CheckSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> : <Square className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />}
                            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                            <span className="truncate">Name</span>
                        </button>

                        <button
                            onClick={() => toggleField("email")}
                            className={`flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 transition-all duration-200 font-medium text-xs sm:text-sm ${fields.email
                                ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-200"
                                : "border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50"
                                }`}
                        >
                            {fields.email ? <CheckSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> : <Square className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />}
                            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                            <span className="truncate">Email</span>
                        </button>

                        <button
                            onClick={() => toggleField("value")}
                            className={`flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 transition-all duration-200 font-medium text-xs sm:text-sm ${fields.value
                                ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-200"
                                : "border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50"
                                }`}
                        >
                            {fields.value ? <CheckSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> : <Square className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />}
                            <Key className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                            <span className="truncate">Value</span>
                        </button>

                        <button
                            onClick={() => toggleField("type")}
                            className={`flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 transition-all duration-200 font-medium text-xs sm:text-sm ${fields.type
                                ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-200"
                                : "border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50"
                                }`}
                        >
                            {fields.type ? <CheckSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> : <Square className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />}
                            <Type className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                            <span className="truncate">Type</span>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                        {fields.name && (
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                                    New Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter new credential name"
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-gray-700 text-sm sm:text-base"
                                    required
                                    minLength={2}
                                    maxLength={100}
                                />
                            </div>
                        )}

                        {fields.email && (
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                                    New Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter new email address"
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-gray-700 text-sm sm:text-base"
                                    required
                                />
                            </div>
                        )}

                        {fields.type && (
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                                    New Type
                                </label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value as CredentialType)}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-gray-700 bg-white appearance-none cursor-pointer text-sm sm:text-base"
                                    required
                                >
                                    <option value="">Select New Credential Type</option>
                                    <option value="password">🔑 Password</option>
                                    <option value="pin">🔢 PIN</option>
                                    <option value="security-code">🛡️ Security Code</option>
                                    <option value="security-question">❓ Security Question</option>
                                    <option value="recovery-code">🔄 Recovery Code</option>
                                    <option value="otp">📱 OTP</option>
                                    <option value="session-token">🍪 Session Token</option>
                                    <option value="api-key">🔌 API Key</option>
                                    <option value="others">📦 Others</option>
                                </select>
                            </div>
                        )}

                        {fields.value && (
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                                    New Value
                                </label>
                                <textarea
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="Enter new credential value"
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-gray-700 min-h-20 sm:min-h-25 resize-y text-sm sm:text-base"
                                    required
                                />
                            </div>
                        )}

                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => setUpdateCredentialModal(false)}
                                className="w-full cursor-pointer sm:w-auto px-4 sm:px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200 text-sm sm:text-base"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading || !Object.values(fields).some(v => v === true)}
                                className="w-full cursor-pointer sm:w-auto px-4 sm:px-6 py-2.5 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Update Credential
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

export default UpdateCredentialModal;