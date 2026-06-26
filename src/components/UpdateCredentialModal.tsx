import { useCredentialStore } from "@/stores/credentials.store";
import axios from "axios";
import React, { useState } from "react";
import { Edit, X, Save, Loader2, Shield, Mail, User, Key, Type, CheckSquare, Square } from "lucide-react";

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

            console.log(result);

            if (result.status === 200) {
                const updatedCredentials = credentials.map((cred) => cred._id === credId ? result.data.data : cred)
                setCredentials(updatedCredentials)
                setUpdateCredentialModal(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                <div className="bg-linear-to-r from-green-700 to-green-600 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl">
                            <Edit className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-white">
                            Update Credential
                        </h2>
                    </div>
                    <button
                        onClick={() => setUpdateCredentialModal(false)}
                        className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200 mb-6">
                        <Shield className="w-6 h-6 text-blue-600 shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-blue-800">
                                Select Fields to Update
                            </p>
                            <p className="text-xs text-blue-600">
                                Choose which fields you want to modify
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <button
                            onClick={() => toggleField("name")}
                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium ${fields.name
                                ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-200"
                                : "border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50"
                                }`}
                        >
                            {fields.name ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                            <User className="w-4 h-4" />
                            Name
                        </button>

                        <button
                            onClick={() => toggleField("email")}
                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium ${fields.email
                                ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-200"
                                : "border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50"
                                }`}
                        >
                            {fields.email ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                            <Mail className="w-4 h-4" />
                            Email
                        </button>

                        <button
                            onClick={() => toggleField("value")}
                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium ${fields.value
                                ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-200"
                                : "border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50"
                                }`}
                        >
                            {fields.value ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                            <Key className="w-4 h-4" />
                            Value
                        </button>

                        <button
                            onClick={() => toggleField("type")}
                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium ${fields.type
                                ? "border-green-600 bg-green-600 text-white shadow-lg shadow-green-200"
                                : "border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50"
                                }`}
                        >
                            {fields.type ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                            <Type className="w-4 h-4" />
                            Type
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {fields.name && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    New Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter new credential name"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-gray-700"
                                    required
                                />
                            </div>
                        )}

                        {fields.email && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    New Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter new email address"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-gray-700"
                                    required
                                />
                            </div>
                        )}

                        {fields.type && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    New Type
                                </label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value as CredentialType)}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-gray-700 bg-white appearance-none cursor-pointer"
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    New Value
                                </label>
                                <textarea
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="Enter new credential value"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-gray-700 min-h-25 resize-y"
                                    required
                                />
                            </div>
                        )}

                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => setUpdateCredentialModal(false)}
                                className="w-full cursor-pointer sm:w-auto px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading || !Object.values(fields).some(v => v === true)}
                                className="w-full cursor-pointer sm:w-auto px-6 py-2.5 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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