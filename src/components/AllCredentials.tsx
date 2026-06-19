"use client";

import React, { useState } from "react";
import {
    MenuSquare,
    Eye,
    Trash2,
    FilePlusCorner,
} from "lucide-react";
import ResponsiveSearch from "./ResponsiveSearch";
import { useCredentialStore } from "@/stores/credentials.store";
import axios from "axios";
import { IDecryptedCredential } from "@/types/credential.type";
import OpenMasterModal from "./OpenMasterModal";
import UnlockedCredential from "./UnlockedCredential";

type propType = { setOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>> };

const typeStyles: Record<string, string> = {
    "password": "bg-red-100 text-red-700",
    "pin": "bg-blue-100 text-blue-700",
    "security-code": "bg-purple-100 text-purple-700",
    "security-question": "bg-yellow-100 text-yellow-800",
    "recovery-code": "bg-orange-100 text-orange-700",
    "otp": "bg-pink-100 text-pink-700",
    "session-token": "bg-gray-200 text-gray-800",
    "api-key": "bg-emerald-100 text-emerald-700",
    "others": "bg-green-100 text-green-800",
};

const AllCredentials = ({ setOpenMobileSidebar }: propType) => {
    const credentials = useCredentialStore((state) => state.credentials);
    const [searchTerm, setSearchTerm] = useState("");
    const [openMasterModal, setOpenMasterModal] = useState(false);
    const [openUnlockedCredModal, setOpenUnlockedCredModal] = useState(false);
    const [selectedCredId, setSelectedCredId] = useState<string | null>(null);
    const [masterKey, setMasterKey] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [selectedCredential, setSelectedCredential] = useState<IDecryptedCredential | null>(null);

    const filteredCredentials = credentials?.filter(
        (c) =>
            c.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            c.email
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            c.type
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    const handleViewClick = (id: string) => {
        setSelectedCredId(id);
        setOpenMasterModal(true);
    };

    const revealCredential = async () => {
        try {
            setVerifying(true);
            const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/reveal-credential`,
                {
                    masterKey,
                    selectedCredId
                }
            );
            setSelectedCredential(result.data.data);
            setOpenMasterModal(false);
            setMasterKey("");
            setOpenUnlockedCredModal(true);
        } catch (error) {
            console.log(error);
        } finally {
            setVerifying(false);
        }
    };

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
    };

    return (
        <div className="w-full max-w-full px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden">
            <h1 className="text-lg md:text-2xl lg:text-3xl text-white font-semibold bg-green-900 w-full py-4 px-5 md:px-8 shadow-md rounded-xl my-3 flex items-center justify-between gap-4">
                All Credentials

                <MenuSquare
                    size={28}
                    className="block lg:hidden cursor-pointer shrink-0"
                    onClick={() =>
                        setOpenMobileSidebar(
                            (prev) => !prev
                        )
                    }
                />
            </h1>

            <ResponsiveSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholderText="Search credentials..."
            />

            <div className="hidden lg:block w-full overflow-x-auto mt-4">
                <table className="min-w-350 w-full text-sm border border-green-200 rounded-xl overflow-hidden shadow-sm">
                    <thead className="bg-green-100 text-green-900">
                        <tr>
                            <th className="text-left px-4 py-3">
                                #
                            </th>
                            <th className="text-left px-4 py-3">
                                Name
                            </th>
                            <th className="text-left px-4 py-3">
                                Email
                            </th>
                            <th className="text-left px-4 py-3">
                                Type
                            </th>
                            <th className="text-left px-4 py-3">
                                Value
                            </th>
                            <th className="text-left px-4 py-3">
                                View
                            </th>
                            <th className="text-left px-4 py-3">
                                Update
                            </th>
                            <th className="text-left px-4 py-3">
                                Created
                            </th>
                            <th className="text-left px-4 py-3">
                                Updated
                            </th>
                            <th className="text-left px-4 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {filteredCredentials?.length ===
                            0 ? (
                            <tr>
                                <td
                                    colSpan={10}
                                    className="text-center py-10 text-gray-500"
                                >
                                    No credentials found
                                </td>
                            </tr>
                        ) : (
                            filteredCredentials?.map(
                                (cred, index) => (
                                    <tr
                                        key={cred._id}
                                        className="border-t hover:bg-green-50"
                                    >
                                        <td className="px-4 py-3 font-semibold">
                                            {index + 1}
                                        </td>

                                        <td className="px-4 py-3 font-medium wrap-break-word">
                                            {cred.name}
                                        </td>

                                        <td className="px-4 py-3 break-all">
                                            {cred.email}
                                        </td>

                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${typeStyles[cred.type]}`}
                                            >
                                                {
                                                    cred.type
                                                }
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 font-mono break-all max-w-62.5">

                                            ********
                                        </td>

                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() =>

                                                    cred._id

                                                }
                                                className="text-green-700 cursor-pointer"
                                            >
                                                <Eye size={22} onClick={() => handleViewClick(cred._id)} />
                                            </button>
                                        </td>

                                        <td className="px-4 py-3">
                                            <FilePlusCorner size={22} className="w-7 h-7 text-blue-500 cursor-pointer hover:bg-blue-100 hover:rounded-full p-1" />
                                        </td>

                                        <td className="px-4 py-3 text-sm text-gray-500">
                                            {cred.createdAt
                                                ? new Date(
                                                    cred.createdAt
                                                ).toLocaleDateString()
                                                : "-"}
                                        </td>

                                        <td className="px-4 py-3 text-sm text-gray-500">
                                            {cred.updatedAt
                                                ? new Date(
                                                    cred.updatedAt
                                                ).toLocaleDateString()
                                                : "-"}
                                        </td>

                                        <td className="px-4 py-3">
                                            <Trash2
                                                size={
                                                    22
                                                }
                                                className="h-7 w-7 cursor-pointer text-red-700 hover:bg-red-200 p-1 rounded-full"
                                            />
                                        </td>
                                    </tr>
                                )
                            )
                        )}
                    </tbody>
                </table>
            </div>


            <div className="hidden md:grid lg:hidden grid-cols-2 gap-4 mt-4">
                {filteredCredentials?.length === 0 ? (
                    <div className="col-span-2 bg-white rounded-xl border border-green-200 p-10 text-center text-gray-500">
                        No credentials found
                    </div>
                ) : (
                    filteredCredentials?.map(
                        (cred, index) => (
                            <div
                                key={cred._id}
                                className="bg-white rounded-2xl border border-green-200 shadow-sm hover:shadow-md transition-all p-5 min-w-0"
                            >
                                <div className="flex justify-between gap-3">
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-gray-400">
                                            Credential #
                                            {index +
                                                1}
                                        </p>

                                        <h3 className="font-semibold text-green-900 wrap-break-word">
                                            {
                                                cred.name
                                            }
                                        </h3>

                                        <p className="text-xs text-gray-500 break-all mt-1">
                                            {
                                                cred.email
                                            }
                                        </p>
                                    </div>

                                    <span
                                        className={`shrink-0 px-2 py-1 h-fit rounded-full text-xs font-medium ${typeStyles[cred.type]}`}
                                    >
                                        {
                                            cred.type
                                        }
                                    </span>
                                </div>

                                <div className="mt-4 bg-gray-50 rounded-lg p-3">
                                    <p className="text-xs text-gray-400 mb-1">
                                        Credential
                                        Value
                                    </p>

                                    <p className="font-mono text-sm break-all">
                                        ********
                                    </p>
                                </div>


                                <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                                    <div>
                                        <p className="text-gray-400">
                                            Created
                                        </p>
                                        <p>
                                            {cred.createdAt
                                                ? new Date(
                                                    cred.createdAt
                                                ).toLocaleDateString()
                                                : "-"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-400">
                                            Updated
                                        </p>
                                        <p>
                                            {cred.updatedAt
                                                ? new Date(
                                                    cred.updatedAt
                                                ).toLocaleDateString()
                                                : "-"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-4 pt-3 border-t">
                                    <div className="flex items-center justify-between gap-2">
                                        <button
                                            onClick={() => handleViewClick(cred._id)}
                                            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-green-50 text-green-700 font-semibold"
                                        >
                                            <Eye size={16} />
                                            View
                                        </button>
                                        <button className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold">
                                            <FilePlusCorner size={16} className="cursor-pointer" /> Update
                                        </button>
                                    </div>

                                    <Trash2
                                        size={
                                            20
                                        }
                                        className="cursor-pointer text-red-600"
                                    />
                                </div>
                            </div>
                        )
                    )
                )}
            </div>


            <div className="md:hidden space-y-4 mt-4">
                {filteredCredentials?.length === 0 ? (
                    <div className="bg-white rounded-xl border border-green-200 p-8 text-center text-gray-500">
                        No credentials found
                    </div>
                ) : (
                    filteredCredentials?.map(
                        (cred, index) => (
                            <div
                                key={cred._id}
                                className="bg-white border border-green-200 rounded-2xl shadow-sm p-4"
                            >
                                <div className="flex justify-between gap-2">
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-gray-400">
                                            Credential #
                                            {index +
                                                1}
                                        </p>

                                        <h3 className="font-semibold text-green-900 wrap-break-word">
                                            {
                                                cred.name
                                            }
                                        </h3>

                                        <p className="text-xs text-gray-500 break-all mt-1">
                                            {
                                                cred.email
                                            }
                                        </p>
                                    </div>

                                    <span
                                        className={`shrink-0 px-2 py-1 h-fit rounded-full text-[10px] font-medium ${typeStyles[cred.type]}`}
                                    >
                                        {
                                            cred.type
                                        }
                                    </span>
                                </div>

                                <div className="mt-4 bg-gray-50 rounded-lg p-3">
                                    <p className="text-xs text-gray-400 mb-1">
                                        Credential
                                        Value
                                    </p>

                                    <p className="font-mono text-sm break-all">
                                        ********
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                                    <div>
                                        <p className="text-gray-400">
                                            Created
                                        </p>
                                        <p>
                                            {cred.createdAt
                                                ? new Date(
                                                    cred.createdAt
                                                ).toLocaleDateString()
                                                : "-"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-400">
                                            Updated
                                        </p>
                                        <p>
                                            {cred.updatedAt
                                                ? new Date(
                                                    cred.updatedAt
                                                ).toLocaleDateString()
                                                : "-"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-4 pt-3 border-t">
                                    <div className="flex items-center justify-between gap-3">
                                        <button
                                            onClick={() => handleViewClick(cred._id)}
                                            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-green-50 text-green-700 font-semibold"
                                        >
                                            <Eye size={16} />
                                            View
                                        </button>
                                        <button className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold">
                                            <FilePlusCorner size={16} /> Update
                                        </button>
                                    </div>
                                    <button className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-50 text-red-700 font-semibold">
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        )
                    )
                )}
            </div>
            {openMasterModal && (
                <OpenMasterModal
                    masterKey={masterKey}
                    setMasterKey={setMasterKey}
                    setOpenMasterModal={setOpenMasterModal}
                    revealCredential={revealCredential}
                    verifying={verifying}
                />
            )}
            {openUnlockedCredModal && (
                <UnlockedCredential
                    selectedCredential={selectedCredential as IDecryptedCredential}
                    copyToClipboard={copyToClipboard}
                    setOpenUnlockedCredModal={setOpenUnlockedCredModal}
                />
            )}

        </div>
    );
};

export default AllCredentials;


