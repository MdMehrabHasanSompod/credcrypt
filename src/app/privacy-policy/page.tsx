"use client"
import React from 'react'
import { Shield, Lock, Key, Database, Server, Mail, Clock, CheckCircle, AlertTriangle, Scale } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const PrivacyPolicy = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-linear-to-b from-green-50 via-white to-green-50/30 pt-24 md:pt-28 lg:pt-32">

                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <Scale className="w-4 h-4" />
                            Legal & Privacy
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Privacy <span className="bg-linear-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">Policy</span>
                        </h1>
                        <p className="text-lg text-gray-600">
                            Your privacy and data security are our top priorities. Read our comprehensive privacy policy to understand how we protect your information.
                        </p>
                        <p className="text-sm text-gray-500 mt-2">Last updated: January 2026</p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="p-6 md:p-10">
                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center shrink-0">
                                        <Shield className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-2">1. Information We Collect</h2>
                                        <p className="text-gray-600">
                                            CredCrypt collects minimal personal information to provide you with secure credential management services:
                                        </p>
                                        <ul className="mt-3 space-y-2 text-gray-600">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Account Information:</strong> Name, email address, and phone number for account creation and communication.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Credentials:</strong> The credentials you choose to store in our encrypted vault (these are encrypted and we cannot access them).</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Usage Data:</strong> Non-personal data about how you interact with our platform to improve user experience.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center shrink-0">
                                        <Lock className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-2">2. How We Protect Your Data</h2>
                                        <p className="text-gray-600">
                                            We employ military-grade security measures to ensure your data remains safe and private:
                                        </p>
                                        <ul className="mt-3 space-y-2 text-gray-600">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>AES-256 Encryption:</strong> All credentials are encrypted using the industry-standard AES-256 encryption algorithm.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Zero-Knowledge Architecture:</strong> Your master key is never stored anywhere. We cannot decrypt or access your credentials.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Secure Cloud Storage:</strong> Your encrypted data is stored in secure cloud infrastructure with multiple layers of protection.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                                        <Database className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-2">3. Data Usage</h2>
                                        <p className="text-gray-600">
                                            How we use the information we collect:
                                        </p>
                                        <ul className="mt-3 space-y-2 text-gray-600">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Service Delivery:</strong> To provide and maintain our credential management services.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Account Management:</strong> To manage your account and provide customer support.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Platform Improvement:</strong> To analyze usage patterns and improve our platform.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Security:</strong> To detect and prevent security threats and fraudulent activities.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center shrink-0">
                                        <Key className="w-6 h-6 text-yellow-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-2">4. Your Rights</h2>
                                        <p className="text-gray-600">
                                            You have full control over your personal data:
                                        </p>
                                        <ul className="mt-3 space-y-2 text-gray-600">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Access:</strong> You can access and review your personal information at any time.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Correction:</strong> You can update or correct your personal information.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Deletion:</strong> You can permanently delete your account and all associated data.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Data Portability:</strong> You can export your data in a portable format.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center shrink-0">
                                        <AlertTriangle className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-2">5. Data Retention</h2>
                                        <p className="text-gray-600">
                                            We retain your data only as long as necessary:
                                        </p>
                                        <ul className="mt-3 space-y-2 text-gray-600">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Active Accounts:</strong> Data is retained as long as your account remains active.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Deleted Accounts:</strong> All data is permanently removed within 30 days of account deletion.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Legal Requirements:</strong> Some data may be retained if required by law or for legitimate business purposes.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center shrink-0">
                                        <Server className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-2">6. Third-Party Services</h2>
                                        <p className="text-gray-600">
                                            We use trusted third-party services to provide our platform:
                                        </p>
                                        <ul className="mt-3 space-y-2 text-gray-600">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Cloud Providers:</strong> Secure cloud infrastructure for data storage.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Authentication:</strong> OAuth providers for secure authentication.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Analytics:</strong> Anonymous usage analytics to improve our platform.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center shrink-0">
                                        <Clock className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-2">7. Policy Updates</h2>
                                        <p className="text-gray-600">
                                            We may update this privacy policy to reflect changes in our practices or legal requirements:
                                        </p>
                                        <ul className="mt-3 space-y-2 text-gray-600">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Notification:</strong> We will notify users of significant changes via email or platform notification.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Review:</strong> We encourage users to review the policy periodically.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                <span><strong>Effective Date:</strong> Updates become effective immediately upon posting.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-2">8. Contact Us</h2>
                                        <p className="text-gray-600">
                                            If you have questions about our privacy policy, please contact us:
                                        </p>
                                        <div className="mt-3 p-4 bg-green-50 rounded-xl border border-green-200">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-5 h-5 text-green-600" />
                                                <a
                                                    href="mailto:cemhaninc.org@gmail.com"
                                                    className="text-green-700 hover:text-green-800 hover:underline font-medium"
                                                >
                                                    cemhaninc.org@gmail.com
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        <p>By using CredCrypt, you agree to our privacy policy. Your data security is our priority.</p>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    )
}

export default PrivacyPolicy