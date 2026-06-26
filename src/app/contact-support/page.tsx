"use client"
import React from 'react'
import { Mail, HelpCircle, Users, SquareCode, ExternalLink, Clock, Shield } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import Footer from '@/components/Footer'

const Helpline = () => {
    const supportEmail = "cemhaninc.org@gmail.com"

    const faqs = [
        {
            question: "How do I reset my master key?",
            answer: "If you've forgotten your master key, you'll need to verify your identity through email. Contact our support team for assistance."
        },
        {
            question: "What happens if I lose my credentials?",
            answer: "Your credentials are securely stored in the cloud. Even if you lose local access, you can retrieve them by logging in with your account credentials."
        },
        {
            question: "Is my data really secure?",
            answer: "Yes! All credentials are encrypted using AES-256 encryption before storage. We never store your master key, ensuring only you can decrypt your data."
        },
        {
            question: "Can I recover deleted credentials?",
            answer: "Deleted credentials are permanently removed. Please confirm the credential name before deleting any sensitive information."
        }
    ]

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-linear-to-b from-green-50 via-white to-green-50/30 pt-24 md:pt-28 lg:pt-32">

                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <HelpCircle className="w-4 h-4" />
                            We're Here to Help
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Need <span className="bg-linear-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">Assistance?</span>
                        </h1>
                        <p className="text-lg text-gray-600">
                            Having trouble with CredCrypt? Reach out to our support team and we'll get back to you as soon as possible.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Contact Support</h2>
                                        <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                                    </div>
                                </div>

                                <div className="bg-green-50 rounded-2xl p-6 border border-green-200 mb-6">
                                    <p className="text-gray-700 mb-2">Send us an email at:</p>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-5 h-5 text-green-600" />
                                        <a
                                            href={`mailto:${supportEmail}`}
                                            className="text-lg font-semibold text-green-700 hover:text-green-800 hover:underline transition-all duration-200"
                                        >
                                            {supportEmail}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href={`mailto:${supportEmail}`}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl group"
                                    >
                                        <Mail className="w-5 h-5" />
                                        Send Email Now
                                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>

                                <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                                    <div className="flex items-start gap-3">
                                        <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-amber-800">Response Time</p>
                                            <p className="text-sm text-amber-700">We aim to respond to all inquiries within 24 hours during business days.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 mt-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                                        <HelpCircle className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                                        <p className="text-sm text-gray-500">Quick answers to common questions</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {faqs.map((faq, index) => (
                                        <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                                            <h3 className="font-semibold text-gray-800 mb-1">{faq.question}</h3>
                                            <p className="text-gray-600 text-sm">{faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                        <Users className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">Developer</h3>
                                </div>

                                <div className="space-y-3">
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <p className="text-sm text-gray-600 mb-2">Built and maintained by:</p>
                                        <a
                                            href="https://github.com/MdMehrabHasanSompod"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-all duration-200 group"
                                        >
                                            <SquareCode className="w-5 h-5" />
                                            <span className="font-medium">MdMehrabHasanSompod</span>
                                            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <p className="text-sm text-gray-600 mb-2">Organization:</p>
                                        <div className="flex items-center gap-2">
                                            <a href="https://github.com/MdMehrabHasanSompod" target='_blank' rel='noopener noreferrer'><Image alt='MVIOT-PV' src="/mviot_logo.png" width={40} height={40} priority /></a>
                                            <span className="font-medium text-gray-800">MVIOT-PV</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-green-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">Security Tips</h3>
                                </div>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">•</span>
                                        Never share your master key with anyone
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">•</span>
                                        Use a strong password
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">•</span>
                                        Don't lose your master key
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">•</span>
                                        Use unique name for every credential
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-yellow-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">Support Hours</h3>
                                </div>
                                <p className="space-y-2 text-sm text-gray-600">
                                    Our support team is available 24/7 to help you resolve issues quickly and keep your experience smooth and secure.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    )
}

export default Helpline