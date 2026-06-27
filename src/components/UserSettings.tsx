"use client"

import { useUserStore } from '@/stores/user.store';
import axios from 'axios';
import { Loader2, LogOut, MenuSquare, Settings, Trash2, User, Wrench, Mail, Phone, Calendar, UserCircle, Camera, Shield, Key, UserPlus } from 'lucide-react'
import { signOut } from 'next-auth/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify';

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

            const result = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/update-user`, formData)

            if (result.data.success) {
                toast.success("User updated successfully")
                setUser(result.data.updatedUser)
                setUpdatedName(result.data.updatedUser.name || "");
                setUpdatedPhone(result.data.updatedUser.phone || "");
                setDisplayUpdatedAvatar(result.data.updatedUser.avatar || undefined);
                setUpdatedAvatar(null);
                setRemoveAvatar(false);
                setUpdateProfile(false)
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
            setUpdateLoading(false)
        }
    }

    const handleAddAccount = async () => {
        setAddAccountLoading(true)
        await signOut({ redirect: false });
        router.push("/register");
        setAddAccountLoading(false)
    };


    return (
        <div className='w-full mx-auto'>
            <div className='bg-linear-to-r from-green-800 to-green-600 w-full py-4 px-6 md:px-8 shadow-lg rounded-xl my-2 flex items-center justify-between gap-4'>
                <h1 className='text-xl md:text-2xl lg:text-3xl text-white font-bold flex items-center gap-3'>
                    <Settings className='w-6 h-6 md:w-7 md:h-7' />
                    Settings
                </h1>
                <button
                    onClick={() => setOpenMobileSidebar(prev => !prev)}
                    className='lg:hidden text-white hover:bg-green-700 p-2 rounded-lg transition-all duration-200'
                >
                    <MenuSquare size={28} />
                </button>
            </div>

            <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8'>
                <div className='lg:col-span-2'>
                    <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
                        {updateProfile ? (
                            <form onSubmit={handleUserUpdate} className='p-6 md:p-8'>
                                <div className='flex items-center justify-center mb-6'>
                                    <h2 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
                                        <UserCircle className='w-10 h-10 text-green-600' />
                                        Edit Profile
                                    </h2>
                                </div>

                                <div className='space-y-5'>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                            User Name
                                        </label>
                                        <input
                                            type="text"
                                            name="updatedName"
                                            placeholder="Enter your full name"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-gray-700"
                                            value={updatedName}
                                            onChange={(e) => setUpdatedName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            name="updatedPhone"
                                            placeholder="Enter your phone number"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none text-gray-700"
                                            value={updatedPhone}
                                            onChange={(e) => setUpdatedPhone(e.target.value)}

                                        />
                                    </div>

                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-3'>
                                            Profile Picture
                                        </label>
                                        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-6'>
                                            <label
                                                htmlFor="image"
                                                className="flex cursor-pointer items-center justify-center gap-2 px-6 py-3 bg-green-50 hover:bg-green-100 text-green-700 font-medium rounded-xl border-2 border-green-200 hover:border-green-400 transition-all duration-200 w-full sm:w-auto"
                                            >
                                                <Camera className='w-5 h-5' />
                                                Change Avatar
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                id="image"
                                                hidden
                                                onChange={handleImageChange}
                                            />
                                            {displayUpdatedAvatar && (
                                                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-green-400 shadow-md shrink-0">
                                                    <Image
                                                        src={displayUpdatedAvatar}
                                                        alt="avatar preview"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={removeImage}
                                                        className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-all duration-200"
                                                    >
                                                        <div className="bg-white rounded-full p-2 shadow-lg hover:bg-red-200 cursor-pointer hover:shadow-xl transition-all duration-200">
                                                            <Trash2 className='w-4 h-4 text-red-500' />
                                                        </div>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className='flex flex-col sm:flex-row items-center gap-4 pt-4'>
                                        <button
                                            type="button"
                                            onClick={() => setUpdateProfile(false)}
                                            className='w-full sm:w-auto flex-1 cursor-pointer px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200'
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type='submit'
                                            disabled={updateLoading}
                                            className='w-full sm:w-auto flex-1 cursor-pointer px-6 py-3 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed'
                                        >
                                            {updateLoading && <Loader2 size={20} className='animate-spin' />}
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div className='bg-linear-to-r from-green-700 to-green-600 p-8 text-center relative overflow-hidden'>
                                    <div className='absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-32 -translate-y-32'></div>
                                    <div className='absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full transform -translate-x-24 translate-y-24'></div>

                                    <div className="relative inline-block">
                                        <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden mx-auto">
                                            {user?.avatar ? (
                                                <Image
                                                    className="object-cover w-full h-full"
                                                    src={user?.avatar}
                                                    alt={user?.name}
                                                    width={128}
                                                    height={128}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-green-500 flex items-center justify-center">
                                                    <User className="w-16 h-16 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => setUpdateProfile(true)}
                                            className='absolute bottom-0 right-0 cursor-pointer bg-white hover:bg-gray-100 text-green-700 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-green-600'
                                        >
                                            <Camera className='w-4 h-4' />
                                        </button>
                                    </div>

                                    <h2 className='text-2xl font-bold text-white mt-4'>{user?.name}</h2>
                                    <p className='text-green-100 text-sm'>Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    }) : ""}</p>
                                </div>

                                <div className='p-6 md:p-8 space-y-4'>
                                    <div className='flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200'>
                                        <Mail className='w-5 h-5 text-green-600 mt-1 shrink-0' />
                                        <div>
                                            <p className='text-xs text-gray-500 font-medium uppercase tracking-wider'>Email Address</p>
                                            <p className='text-gray-800 font-medium'>{user?.email}</p>
                                        </div>
                                    </div>

                                    <div className='flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200'>
                                        <Phone className='w-5 h-5 text-green-600 mt-1 shrink-0' />
                                        <div>
                                            <p className='text-xs text-gray-500 font-medium uppercase tracking-wider'>Phone Number</p>
                                            <p className='text-gray-800 font-medium'>{user?.phone === undefined ? "Not Provided" : user?.phone}</p>
                                        </div>
                                    </div>

                                    <div className='flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200'>
                                        <Calendar className='w-5 h-5 text-green-600 mt-1 shrink-0' />
                                        <div>
                                            <p className='text-xs text-gray-500 font-medium uppercase tracking-wider'>Joined Date</p>
                                            <p className='text-gray-800 font-medium'>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            }) : ""}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setUpdateProfile(true)}
                                        className='w-full cursor-pointer mt-4 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2'
                                    >
                                        <UserCircle className='w-5 h-5' />
                                        Edit Profile
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className='space-y-6'>
                    <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
                        <div className='p-6 border-b border-gray-100'>
                            <h3 className='text-lg font-bold text-gray-800 flex items-center gap-2'>
                                <Wrench className='w-5 h-5 text-green-600' />
                                Quick Actions
                            </h3>
                            <p className='text-sm text-gray-500 mt-1'>Manage your account quickly</p>
                        </div>
                        <div className='p-4 space-y-3'>
                            <button
                                onClick={() => signOut()}
                                className='w-full cursor-pointer bg-red-50 hover:bg-red-100 text-red-700 font-semibold p-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 group'
                            >
                                <LogOut className='w-5 h-5 group-hover:scale-110 transition-transform duration-200' />
                                <span>Logout Now</span>
                            </button>
                            <button
                                onClick={handleAddAccount}
                                className='w-full bg-yellow-50 hover:bg-yellow-100 cursor-pointer text-yellow-700 font-semibold p-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 group'
                            >
                                {addAccountLoading ? (
                                    <Loader2 size={20} className='animate-spin' />
                                ) : (
                                    <>
                                        <UserPlus className='w-5 h-5 group-hover:scale-110 transition-transform duration-200' />
                                        <span>Add Account</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
                        <div className='p-6 border-b border-gray-100'>
                            <h3 className='text-lg font-bold text-gray-800 flex items-center gap-2'>
                                <Shield className='w-5 h-5 text-purple-600' />
                                Security
                            </h3>
                            <p className='text-sm text-gray-500 mt-1'>Protect your account</p>
                        </div>
                        <div className='p-4 space-y-3'>
                            <button
                                onClick={() => router.push("/user/reset-password")}
                                className='w-full bg-purple-50 hover:bg-purple-100 cursor-pointer text-purple-700 font-semibold p-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 group'
                            >
                                <Key className='w-5 h-5 group-hover:scale-110 transition-transform duration-200' />
                                <span>Reset Password</span>
                            </button>
                            <button
                                onClick={() => router.push("/user/delete-account")}
                                className='w-full bg-red-50 hover:bg-red-100 cursor-pointer text-red-700 font-semibold p-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 group'
                            >
                                <Trash2 className='w-5 h-5 group-hover:scale-110 transition-transform duration-200' />
                                <span>Delete Account</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default UserSettings;