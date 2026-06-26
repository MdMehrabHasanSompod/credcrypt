"use client";

import React, { useState } from "react";
import {
    MenuSquare,
    Eye,
    Trash2,
    Shield,
    Lock,
    Edit,
} from "lucide-react";
import ResponsiveSearch from "./ResponsiveSearch";
import { useCredentialStore } from "@/stores/credentials.store";
import axios from "axios";
import { IDecryptedCredential } from "@/types/credential.type";
import UnlockedCredential from "./UnlockedCredential";
import OpenViewMasterModal from "./OpenViewMasterModal";
import OpenUpdateMasterModal from "./OpenUpdateMasterModal";
import UpdateCredentialModal from "./UpdateCredentialModal";
import OpenDeleteMasterModal from "./OpenDeleteMasterModal";
import DeleteCredentialModal from "./DeleteCredentialModal";

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
    const [openViewMasterModal, setOpenViewMasterModal] = useState<boolean>(false);
    const [openUpdateMasterModal, setOpenUpdateMasterModal] = useState<boolean>(false);
    const [openUnlockedCredModal, setOpenUnlockedCredModal] = useState<boolean>(false);
    const [openDeleteMasterModal, setOpenDeleteMasterModal] = useState<boolean>(false);
    const [selectedCredId, setSelectedCredId] = useState<string | null>(null);
    const [masterKey, setMasterKey] = useState<string>("");
    const [verifying, setVerifying] = useState<boolean>(false);
    const [selectedCredential, setSelectedCredential] = useState<IDecryptedCredential | null>(null);
    const [updateCredentialModal, setUpdateCredentialModal] = useState<boolean>(false);
    const [deleteCredentialModal, setDeleteCredentialModal] = useState<boolean>(false);
    const [selectedCredName, setSelectedCredName] = useState<string>("")

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

    const handleClick = (id: string, request: string, name?: string) => {
        setSelectedCredId(id);
        if (request === "view") {
            setOpenViewMasterModal(true);
        }

        if (request === "update") {
            setOpenUpdateMasterModal(true);
        }

        if (request === "delete") {
            setOpenDeleteMasterModal(true);
            setSelectedCredName(name as string)
        }
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
            if (result.status === 200) {
                setSelectedCredential(result.data.data);
                setOpenViewMasterModal(false);
                setMasterKey("");
                setOpenUnlockedCredModal(true);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setVerifying(false);
        }
    };

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
    };



    const verifyUpdateRequest = async () => {
        try {
            setVerifying(true);
            const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/verify-update-request`, { masterKey });
            if (result.status === 200) {
                setOpenUpdateMasterModal(false)
                setUpdateCredentialModal(true)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setVerifying(false)
        }
    }

    const verifyDeleteRequest = async () => {
        try {
            setVerifying(true);
            const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/verify-update-request`, { masterKey });
            if (result.status === 200) {
                setOpenDeleteMasterModal(false)
                setDeleteCredentialModal(true)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setVerifying(false)
        }
    }


    return (
        <div className="w-full mx-auto overflow-hidden">
            <div className="bg-linear-to-r from-green-800 to-green-600 w-full py-4 px-6 md:px-8 shadow-lg rounded-xl my-2 flex items-center justify-between gap-4">
                <h1 className="text-xl md:text-2xl lg:text-3xl text-white font-bold flex items-center gap-3">
                    <Shield className="w-6 h-6 md:w-7 md:h-7" />
                    All Credentials
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-normal">
                        {filteredCredentials?.length || 0}
                    </span>
                </h1>

                <button
                    onClick={() => setOpenMobileSidebar((prev) => !prev)}
                    className="lg:hidden text-white hover:bg-green-700 p-2 rounded-lg transition-all duration-200"
                >
                    <MenuSquare size={28} />
                </button>
            </div>

            <div className="mt-6">
                <ResponsiveSearch
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    placeholderText="Search credentials by name, email or type..."
                />
            </div>

            <div className="hidden lg:block w-full overflow-x-auto mt-6">
                <table className="min-w-full w-full text-sm border border-green-200 rounded-xl overflow-hidden shadow-sm">
                    <thead className="bg-linear-to-r from-green-50 to-emerald-50 text-green-900">
                        <tr>
                            <th className="text-left px-4 py-3 font-semibold">#</th>
                            <th className="text-left px-4 py-3 font-semibold">Name</th>
                            <th className="text-left px-4 py-3 font-semibold">Email</th>
                            <th className="text-left px-4 py-3 font-semibold">Type</th>
                            <th className="text-left px-4 py-3 font-semibold">Value</th>
                            <th className="text-left px-4 py-3 font-semibold">Actions</th>
                            <th className="text-left px-4 py-3 font-semibold">Created</th>
                            <th className="text-left px-4 py-3 font-semibold">Updated</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-100">
                        {filteredCredentials?.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-12 text-gray-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <Lock className="w-12 h-12 text-gray-300" />
                                        <p className="text-lg font-medium">No credentials found</p>
                                        <p className="text-sm">Add your first credential to get started</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredCredentials?.map((cred, index) => (
                                <tr key={cred._id} className="hover:bg-green-50/50 transition-all duration-200">
                                    <td className="px-4 py-3 font-semibold text-gray-500">{index + 1}</td>
                                    <td className="px-4 py-3 font-medium text-gray-800">{cred.name}</td>
                                    <td className="px-4 py-3 text-gray-600">{cred.email || "-"}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeStyles[cred.type]}`}>
                                            {cred.type}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-mono text-gray-500">••••••••</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleClick(cred._id, "view")}
                                                className="p-2 text-green-700 hover:bg-green-100 rounded-lg transition-all duration-200"
                                                title="View Credential"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleClick(cred._id, "update")}
                                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200"
                                                title="Update Credential"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleClick(cred._id, "delete", cred.name)}
                                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200"
                                                title="Delete Credential"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500">
                                        {cred.createdAt ? new Date(cred.createdAt).toLocaleDateString() : "-"}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500">
                                        {cred.updatedAt ? new Date(cred.updatedAt).toLocaleDateString() : "-"}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="hidden md:grid lg:hidden grid-cols-2 gap-4 mt-6">
                {filteredCredentials?.length === 0 ? (
                    <div className="col-span-2 bg-white rounded-2xl border-2 border-dashed border-green-200 p-12 text-center">
                        <Lock className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">No credentials found</p>
                        <p className="text-sm text-gray-400">Start securing your credentials today</p>
                    </div>
                ) : (
                    filteredCredentials?.map((cred, index) => (
                        <div
                            key={cred._id}
                            className="bg-white rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 group"
                        >
                            <div className="flex justify-between items-start gap-3">
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-gray-400 font-medium"># {index + 1}</p>
                                    <h3 className="font-semibold text-green-900 text-lg mt-1 truncate">{cred.name}</h3>
                                    <p className="text-sm text-gray-500 truncate">{cred.email || "No email"}</p>
                                </div>
                                <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium ${typeStyles[cred.type]}`}>
                                    {cred.type}
                                </span>
                            </div>

                            <div className="mt-4 bg-gray-50 rounded-xl p-3 border border-gray-100">
                                <p className="text-xs text-gray-400 font-medium mb-1">Credential Value</p>
                                <p className="font-mono text-sm text-gray-600">••••••••</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                                <div>
                                    <p className="text-gray-400 font-medium">Created</p>
                                    <p className="text-gray-700">{cred.createdAt ? new Date(cred.createdAt).toLocaleDateString() : "-"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 font-medium">Updated</p>
                                    <p className="text-gray-700">{cred.updatedAt ? new Date(cred.updatedAt).toLocaleDateString() : "-"}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleClick(cred._id, "view")}
                                        className="flex items-center gap-1.5 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 font-medium rounded-xl transition-all duration-200 text-sm"
                                    >
                                        <Eye size={16} />
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleClick(cred._id, "update")}
                                        className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-xl transition-all duration-200 text-sm"
                                    >
                                        <Edit size={16} />
                                        Edit
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleClick(cred._id, "delete", cred.name)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="md:hidden space-y-4 mt-6">
                {filteredCredentials?.length === 0 ? (
                    <div className="bg-white rounded-2xl border-2 border-dashed border-green-200 p-10 text-center">
                        <Lock className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">No credentials found</p>
                    </div>
                ) : (
                    filteredCredentials?.map((cred, index) => (
                        <div
                            key={cred._id}
                            className="bg-white rounded-2xl border border-green-100 shadow-sm p-5"
                        >
                            <div className="flex justify-between items-start gap-2">
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-gray-400 font-medium"># {index + 1}</p>
                                    <h3 className="font-semibold text-green-900 text-base mt-1">{cred.name}</h3>
                                    <p className="text-xs text-gray-500 truncate">{cred.email || "No email"}</p>
                                </div>
                                <span className={`shrink-0 px-2 py-1 rounded-full text-[10px] font-medium ${typeStyles[cred.type]}`}>
                                    {cred.type}
                                </span>
                            </div>

                            <div className="mt-3 bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-400 font-medium mb-1">Value</p>
                                <p className="font-mono text-sm text-gray-600">••••••••</p>
                            </div>

                            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleClick(cred._id, "view")}
                                        className="flex items-center gap-1 px-3 py-2 bg-green-50 text-green-700 font-medium rounded-lg text-xs"
                                    >
                                        <Eye size={14} />
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleClick(cred._id, "update")}
                                        className="flex items-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg text-xs"
                                    >
                                        <Edit size={14} />
                                        Edit
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleClick(cred._id, "delete", cred.name)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {openViewMasterModal && (
                <OpenViewMasterModal
                    masterKey={masterKey}
                    setMasterKey={setMasterKey}
                    setOpenViewMasterModal={setOpenViewMasterModal}
                    revealCredential={revealCredential}
                    verifying={verifying}
                />
            )}

            {openUpdateMasterModal && (
                <OpenUpdateMasterModal
                    masterKey={masterKey}
                    setMasterKey={setMasterKey}
                    setOpenUpdateMasterModal={setOpenUpdateMasterModal}
                    verifyUpdateRequest={verifyUpdateRequest}
                    verifying={verifying}
                />
            )}

            {openDeleteMasterModal && (
                <OpenDeleteMasterModal
                    masterKey={masterKey}
                    setMasterKey={setMasterKey}
                    setOpenDeleteMasterModal={setOpenDeleteMasterModal}
                    verifyDeleteRequest={verifyDeleteRequest}
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

            {updateCredentialModal && (
                <UpdateCredentialModal
                    credId={selectedCredId as string}
                    masterKey={masterKey}
                    setUpdateCredentialModal={setUpdateCredentialModal}
                />
            )}

            {deleteCredentialModal && (
                <DeleteCredentialModal
                    credId={selectedCredId as string}
                    credentialName={selectedCredName}
                    masterKey={masterKey}
                    setDeleteCredentialModal={setDeleteCredentialModal}
                />
            )}
        </div>
    );
};

export default AllCredentials;