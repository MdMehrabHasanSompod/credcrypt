"use client"
import { Mail, SquareCode } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Footer = () => {
    const router = useRouter()
    return (

        <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div onClick={() => { router.push("/") }} className='relative w-10 h-10 cursor-pointer bg-green-500 rounded-full'>
                        <Image
                            src="/logo.png"
                            alt="CredCrypt"
                            fill
                            className="object-cover"
                            priority
                            sizes='40'
                        />
                    </div>
                    <span className="font-semibold text-gray-900">CredCrypt</span>
                    <span className="text-sm text-gray-500">© 2026</span>
                </div>

                <div className="flex items-center gap-6">
                    <a
                        href="https://github.com/MdMehrabHasanSompod"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    >
                        <SquareCode className="w-5 h-5" />
                    </a>
                    <a
                        href="mailto:cemhaninc.org@gmail.com"
                        className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    >
                        <Mail className="w-5 h-5" />
                    </a>
                </div>

                <div className="text-sm text-gray-400">
                    Built with <span className="text-red-400">❤</span> by{" "}
                    <a
                        href="https://github.com/MdMehrabHasanSompod"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                    >
                        MVIOT-PV
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer