"use client"
import { useUserStore } from '@/stores/user.store';
import axios from 'axios';
import { Loader2, LogOut, MenuSquare, PlusCircle, RotateCcw, Settings, Trash2, UploadIcon, User, Wrench } from 'lucide-react'
import { signOut } from 'next-auth/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react'

type propType = {
    setOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const UserSettings = ({ setOpenMobileSidebar }: propType) => {
    const user = useUserStore((state) => state.user)
    const setUser = useUserStore((state) => state.setUser)
    const [updateProfile, setUpdateProfile] = useState<boolean>(false)
    const [updatedAvatar, setUpdatedAvatar] = useState<File | null>(null)
    const [displayUpdatedAvatar, setDisplayUpdatedAvatar] = useState<string | undefined>(user?.avatar as string | undefined)
    const [updatedName, setUpdatedName] = useState<string>(user?.name as string || "")
    const [updatedPhone, setUpdatedPhone] = useState<string>(user?.phone as string || "")
    const [updateLoading, setUpdateLoading] = useState<boolean>(false)
    const [addAccountLoading, setAddAccountLoading] = useState<boolean>(false)
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
    const [removeAvatar, setRemoveAvatar] = useState<boolean>(false);
    const router = useRouter()

    const removeImage = () => {
        if (displayUpdatedAvatar && displayUpdatedAvatar.startsWith("blob:")) {
            URL.revokeObjectURL(displayUpdatedAvatar);
        }
        setDisplayUpdatedAvatar(undefined);
        setUpdatedAvatar(null);
        const input = document.getElementById("image") as HTMLInputElement | null;
        if (input) input.value = "";
        setRemoveAvatar(true);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        const file = files[0];
        if (displayUpdatedAvatar && displayUpdatedAvatar.startsWith("blob:")) {
            URL.revokeObjectURL(displayUpdatedAvatar);
        }
        setUpdatedAvatar(file);
        setDisplayUpdatedAvatar(URL.createObjectURL(file));
    };

    const handleUserUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setUpdateLoading(true)
            const formData = new FormData();
            if (updatedName !== user?.name) formData.append("updatedName", updatedName);
            if (updatedPhone !== user?.phone) formData.append("updatedPhone", updatedPhone);
            if (updatedAvatar) formData.append("updatedAvatar", updatedAvatar);
            if (removeAvatar) formData.append("removeAvatar", "true");

            const result = await axios.patch("/api/user/update-user", formData)

            console.log(result);

            if (result.data.success) {
                setUser(result.data.updatedUser)
                setUpdatedName(result.data.updatedUser.name || "");
                setUpdatedPhone(result.data.updatedUser.phone || "");
                setDisplayUpdatedAvatar(result.data.updatedUser.avatar || undefined);
                setUpdatedAvatar(null);
                setRemoveAvatar(false);
            }

            setUpdateLoading(false)
            setUpdateProfile(false)


        } catch (error) {
            setUpdateLoading(false)
            console.log(error);
        }
    }

    const handleAddAccount = async () => {
        setAddAccountLoading(true)
        await signOut({ redirect: false });
        router.push("/register");
        setAddAccountLoading(false)
    };

    const handleDeleteAccount = async () => {
        setDeleteLoading(true)
        try {
            const result = await fetch(`/api/user/delete-account?id=${user?._id}}`, { method: "DELETE" })
            setDeleteLoading(false)
            if (result.ok) {
                await signOut({ redirect: false });
                router.push("/")
            }

        } catch (error) {
            console.log(error);
            setDeleteLoading(false)
        }
    }


    return (
        <div className='w-full mx-auto'>
            <h1 className='text-xl md:text-2xl lg:text-3xl text-white font-semibold  bg-green-900 w-full py-4 px-8 shadow-md rounded-md my-2 flex items-center justify-between gap-4'>Settings<MenuSquare size={30} className='block lg:hidden cursor-pointer' onClick={() => setOpenMobileSidebar(prev => !prev)} /></h1>
            <div className='w-full flex flex-col md:flex-row mt-10 gap-4 items-start'>
                <div className='m-2 flex flex-col flex-1 gap-3'>
                    <div className='bg-green-200 p-6 rounded-lg flex flex-col gap-2'>
                        {updateProfile ? (<form onSubmit={handleUserUpdate}>
                            <div className='bg-green-50 p-6 rounded-lg flex flex-col gap-3'>
                                <div>
                                    <input
                                        type="text"
                                        name="updatedName"
                                        placeholder="New Name"
                                        className="form-input"
                                        value={updatedName}
                                        onChange={(e) => setUpdatedName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="updatedPhone"
                                        placeholder="New Phone"
                                        className="form-input"
                                        value={updatedPhone}
                                        onChange={(e) => setUpdatedPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='mt-3'>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Update Avatar</h3>
                                    <div className="flex flex-col md:flex-row items-center gap-6">
                                        <label
                                            htmlFor="image"
                                            className="flex cursor-pointer items-center justify-center gap-2  rounded-lg border-2 border-gray-300 px-5 py-3 text-md font-medium text-gray-600 hover:border-green-500 hover:bg-green-50 hover:text-green-600 transition w-full md:w-auto"
                                        >
                                            <UploadIcon size={18} />
                                            Upload New Avatar
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="image"
                                            hidden
                                            onChange={handleImageChange}
                                        />

                                        {displayUpdatedAvatar && (
                                            <div className="relative w-40 h-40 rounded-xl overflow-hidden shadow-md border-2 border-green-300">
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="absolute top-2 cursor-pointer right-2 z-10 text-red-500 hover:text-red-700 bg-white p-1.5 rounded-full shadow-sm transition"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                                <Image
                                                    src={displayUpdatedAvatar}
                                                    alt="avatar preview"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='my-10 flex items-center justify-around gap-3'>
                                    <button onClick={() => setUpdateProfile(false)} className='bg-red-500 shadow-md px-4 py-2 rounded-md text-white font-semibold cursor-pointer hover:bg-red-600'>Cancel Update</button>
                                    <button type='submit' className='bg-green-500 shadow-md px-4 py-2 rounded-md flex items-center justify-center gap-1 text-white font-semibold cursor-pointer hover:bg-green-600'>{updateLoading && <Loader2 size={18} className='animate-spin' />}Save Chnages</button>
                                </div>
                            </div>
                        </form>) : (<>
                            <div className='bg-green-600 p-6 rounded-lg flex flex-col gap-2'>
                                <div className="w-36 h-36 sm:w-40 sm:h-40 mt-6 lg:w-50 lg:h-50 rounded-full overflow-hidden border-4 border-green-300 mb-5 mx-auto">
                                    {user?.avatar ? <Image className="object-cover w-full h-full" src={user?.avatar} alt={user?.name} width={200} height={200} />
                                        : <User className="object-cover w-full h-full bg-green-600 text-white" />
                                    }
                                </div>
                                <p className='text-xl text-white'><span className='font-semibold'>Name:</span> {user?.name}</p>
                                <p className='text-xl text-white'><span className='font-semibold'>Email:</span> {user?.email}</p>
                                <p className='text-xl text-white'><span className='font-semibold'>Phone:</span> {user?.phone === undefined ? "Not Provided" : user?.phone}</p>
                                <p className='text-xl text-white'><span className='font-semibold'>Joined At:</span> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                }) : ""}</p>
                                <button onClick={() => setUpdateProfile(true)} className='bg-green-800 hover:bg-green-900 rounded-lg text-white text-center px-4 py-3 mt-2 cursor-pointer text-md font-semibold'>Update Profile</button>
                            </div>
                        </>
                        )}
                    </div>
                </div>
                <div className='m-2 flex flex-col gap-6 flex-1 self-start'>
                    <div className='bg-green-600 rounded-xl p-8 shadow-lg'>
                        <h2 className='text-white text-2xl font-semibold text-center flex items-center justify-center gap-1'><Wrench size={24} /> Manage Account</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8'>
                            <button onClick={() => signOut()} className='bg-red-500 shadow-md p-3 rounded-md flex items-center justify-center gap-1 text-white font-semibold cursor-pointer hover:bg-red-600'><LogOut size={18} />Logout Now</button>
                            <button onClick={handleAddAccount} className='bg-yellow-500 shadow-md p-3 rounded-md flex items-center justify-center gap-1 text-white font-semibold cursor-pointer hover:bg-yellow-600'>{addAccountLoading ? <Loader2 size={18} className='animate-spin' /> : <PlusCircle size={18} />} Add Account</button>
                        </div>
                    </div>
                    <div className='bg-green-600 rounded-xl p-8 shadow-lg'>
                        <h2 className='text-white text-2xl font-semibold text-center flex items-center justify-center gap-1'><Settings size={24} /> Account Settings</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8'>
                            <button onClick={() => router.push("/user/reset-password")} className='bg-purple-500 shadow-md p-3 rounded-md flex items-center justify-center gap-1 text-white font-semibold cursor-pointer hover:bg-purple-600'><RotateCcw size={18} /> Reset Password</button>
                            <button onClick={handleDeleteAccount} className='bg-red-500 shadow-md p-3 rounded-md flex items-center justify-center gap-1 text-white font-semibold cursor-pointer hover:bg-red-600'>{deleteLoading ? <Loader2 size={18} className='animate-spin' /> : <Trash2 size={18} />}  Delete Account</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UserSettings