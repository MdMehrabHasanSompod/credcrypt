import { useCredentialStore } from "@/stores/credentials.store";
import axios from "axios";
import React, { useState } from "react";

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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
            <div className="w-full max-w-sm sm:max-w-md bg-white rounded-xl p-5 sm:p-6 shadow-xl relative">

                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">
                    Select Fields to Update
                </h2>

                <div className="grid grid-cols-2 gap-2 mb-4">

                    <button
                        onClick={() => toggleField("name")}
                        className={`px-3 py-2 rounded-lg border-2 border-green-600 cursor-pointer text-sm transition ${fields.name
                            ? "bg-green-600 text-white"
                            : "bg-white"
                            }`}
                    >
                        Name
                    </button>

                    <button
                        onClick={() => toggleField("email")}
                        className={`px-3 py-2 rounded-lg border-2 border-green-600 cursor-pointer text-sm transition ${fields.email
                            ? "bg-green-600 text-white"
                            : "bg-white"
                            }`}
                    >
                        Email
                    </button>

                    <button
                        onClick={() => toggleField("value")}
                        className={`px-3 py-2 rounded-lg border-2 border-green-600 cursor-pointer text-sm transition ${fields.value
                            ? "bg-green-600 text-white"
                            : "bg-white"
                            }`}
                    >
                        Value
                    </button>

                    <button
                        onClick={() => toggleField("type")}
                        className={`px-3 py-2 rounded-lg border-2 border-green-600 cursor-pointer text-sm transition ${fields.type
                            ? "bg-green-600 text-white"
                            : "bg-white"
                            }`}
                    >
                        Type
                    </button>

                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {fields.name && (
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="New Name"
                            className="form-input"
                        />
                    )}

                    {fields.email && (
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="New Email"
                            className="form-input"
                        />
                    )}

                    {fields.type && (
                        <select
                            value={type}
                            onChange={(e) =>
                                setType(e.target.value as CredentialType)
                            }
                            className="form-select"
                        >
                            <option className='select-option' value="">Select New Credential Type</option>
                            <option className='select-option' value="password">Password</option>
                            <option className='select-option' value="pin">PIN</option>
                            <option className='select-option' value="security-code">Security Code</option>
                            <option className='select-option' value="security-question">Security Question</option>
                            <option className='select-option' value="recovery-code">Recovery Code</option>
                            <option className='select-option' value="otp">OTP</option>
                            <option className='select-option' value="session-token">Session Token</option>
                            <option className='select-option' value="api-key">API Key</option>
                            <option className='select-option' value="others">Others</option>
                        </select>
                    )}

                    {fields.value && (
                        <textarea
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="New Value"
                            className="form-input min-h-30"
                        />
                    )}


                    <div className="flex flex-col sm:flex-row justify-end gap-3 mt-5">

                        <button
                            onClick={() => setUpdateCredentialModal(false)}
                            className="w-full sm:w-auto px-4 py-2 bg-gray-200 cursor-pointer rounded-lg hover:bg-gray-300 transition text-sm sm:text-base"
                        >
                            Cancel
                        </button>

                        <button
                            type='submit'
                            disabled={loading}
                            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 cursor-pointer disabled:cursor-not-allowed transition flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                            {loading ? "Processing..." : "Update"}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
};

export default UpdateCredentialModal;