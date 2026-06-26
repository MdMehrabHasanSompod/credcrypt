"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useUserStore } from '@/stores/user.store'
import {
    Shield,
    Key,
    Lock,
    Sparkles,
    CheckCircle,
    ArrowRight,
    Star,
    Database,
    Users,
    Zap,
    Award,
    ChevronRight,
    ShieldCheck,
    Fingerprint,
    Brain,
    Package,
    Heart,
    SquareCode,
    Cloud,
    RefreshCw,
    AlertTriangle
} from 'lucide-react'
import Navbar from '@/components/Navbar'

const Homepage = () => {
    const user = useUserStore((state) => state.user)
    const featuresRef = useRef<HTMLDivElement>(null)
    const aboutRef = useRef<HTMLDivElement>(null)
    const [imageError, setImageError] = useState(false)

    const scrollToFeatures = () => {
        featuresRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const scrollToAbout = () => {
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const stats = [
        { icon: Shield, label: "Encrypted Credentials", value: "100%" },
        { icon: Users, label: "Active Users", value: "1000+" },
        { icon: Star, label: "User Satisfaction", value: "100%" },
        { icon: Database, label: "Credentials Stored", value: "10K+" },
    ]

    const features = [
        {
            icon: Lock,
            title: "Enterprise-Grade Encryption",
            description: "All your credentials are encrypted using AES-256 encryption algorithm before being stored in our database.",
            color: "from-blue-500 to-blue-600"
        },
        {
            icon: Fingerprint,
            title: "Master Key Protection",
            description: "Your master key is never stored anywhere. Only you have access to decrypt your credentials.",
            color: "from-purple-500 to-purple-600"
        },
        {
            icon: Zap,
            title: "Instant Access",
            description: "Retrieve your credentials instantly with a single click. No delays, no complications.",
            color: "from-yellow-500 to-orange-500"
        },
        {
            icon: Shield,
            title: "Secure Access",
            description: "Credentials are protected with secure authentication, keeping unauthorized access and suspicious activity away from your data.",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: Cloud,
            title: "Cloud Based Storage",
            description: "Credentials are stored securely in the cloud. Never lose access to your data, even if your local device fails..",
            color: "from-indigo-500 to-blue-500"
        },
        {
            icon: Brain,
            title: "Zero Knowledge Architecture",
            description: "Your data is encrypted end-to-end with zero knowledge architecture. We never have access to your credentials.",
            color: "from-red-500 to-pink-500"
        }
    ]

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "CTO, TechStart Inc.",
            content: "CredCrypt has revolutionized how we handle our team's credentials. The encryption is top-notch and the interface is incredibly intuitive.",
            avatar: "SJ"
        },
        {
            name: "Michael Chen",
            role: "Lead Developer, DevForge",
            content: "The best credential management system I've ever used. The master key concept gives me complete peace of mind.",
            avatar: "MC"
        },
        {
            name: "Emily Rodriguez",
            role: "Security Consultant",
            content: "CredCrypt's approach to security is exceptional. The encryption and zero-knowledge architecture set a new standard.",
            avatar: "ER"
        }
    ]

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-linear-to-b from-green-50 via-white to-green-50/30 pt-24 md:pt-28 lg:pt-32">

                <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                    <div className="absolute inset-0 bg-grid-green-900/[0.03] bg-size-[60px_60px]" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-green-300/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />

                    <div className="max-w-6xl mx-auto relative">
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                            <div className="flex-1 text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                                    <Sparkles className="w-4 h-4" />
                                    Secure Credential Management
                                </div>

                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                    Your Credentials,
                                    <span className="bg-linear-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent"> Unbreakably Secure</span>
                                </h1>

                                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 mb-8">
                                    Store, manage, and protect your sensitive credentials with military-grade encryption.
                                    Only you hold the master key to your digital fortress.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    {!user ? (
                                        <Link
                                            href="/register"
                                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl group"
                                        >
                                            Get Started Free
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    ) : (
                                        <Link
                                            href="/user/dashboard"
                                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl group"
                                        >
                                            Go to Dashboard
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    )}
                                    <button
                                        onClick={scrollToFeatures}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all duration-200 border-2 border-gray-200 hover:border-green-400"
                                    >
                                        Explore Features
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="w-10 h-10 rounded-full bg-linear-to-br from-green-400 to-green-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                                                {String.fromCharCode(64 + i)}
                                            </div>
                                        ))}
                                        <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-600 text-xs font-bold">
                                            +
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-600">Trusted by 1000+ users</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 relative">
                                <div className="relative w-full max-w-md mx-auto">
                                    <div className="absolute inset-0 bg-linear-to-r from-green-400 to-emerald-400 rounded-3xl blur-2xl opacity-20" />
                                    <div className="relative bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                                <div className="w-3 h-3 rounded-full bg-green-400" />
                                            </div>
                                            <Shield className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <Key className="w-5 h-5 text-green-600" />
                                                    <span className="font-medium text-gray-700">Master Key</span>
                                                </div>
                                                <span className="text-sm text-gray-400">••••••••</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <Lock className="w-5 h-5 text-green-600" />
                                                    <span className="font-medium text-gray-700">Encrypted</span>
                                                </div>
                                                <span className="text-sm text-green-600">AES-256</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <ShieldCheck className="w-5 h-5 text-green-600" />
                                                    <span className="font-medium text-gray-700">Status</span>
                                                </div>
                                                <span className="text-sm text-green-600">Secure</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
                                            <div className="flex items-center gap-2 text-sm text-green-700">
                                                <CheckCircle className="w-4 h-4" />
                                                <span>Your credentials are safe and encrypted</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <stat.icon className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section ref={featuresRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose <span className="bg-linear-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">CredCrypt</span>
                        </h2>
                        <p className="text-lg text-gray-600">
                            Built with security at its core, CredCrypt provides the ultimate solution for managing your digital credentials.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 text-center md:text-left">
                                <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto md:mx-0`}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            What Our <span className="bg-linear-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">Users Say</span>
                        </h2>
                        <p className="text-lg text-gray-600">
                            Join thousands of satisfied users who trust CredCrypt for their credential management.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm italic">"{testimonial.content}"</p>
                                <div className="flex items-center gap-1 mt-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section ref={aboutRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                                    About <span className="bg-linear-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">CredCrypt</span>
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    CredCrypt is a next-generation credential management system designed with security-first principles.
                                    Built by <span className="font-semibold text-gray-800">MVIOT-PV</span>, it combines enterprise-grade encryption with an intuitive user experience.
                                </p>
                                <p className="text-gray-600 mb-4">
                                    Our mission is to make credential security accessible to everyone, from individual users to large enterprises.
                                    With CredCrypt, you never have to worry about your sensitive data falling into the wrong hands.
                                </p>
                                <p className="text-gray-600 mb-6">
                                    Unlike traditional systems that store credentials locally, CredCrypt provides a secure cloud-based solution.
                                    Even if you accidentally delete your local files or reboot your system, your credentials remain safe and accessible
                                    from anywhere, anytime. Your data is never lost.
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl">
                                        <ShieldCheck className="w-4 h-4 text-green-600" />
                                        <span className="text-sm text-gray-700">Zero-Knowledge Architecture</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl">
                                        <Lock className="w-4 h-4 text-green-600" />
                                        <span className="text-sm text-gray-700">AES-256 Encryption</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl">
                                        <Cloud className="w-4 h-4 text-green-600" />
                                        <span className="text-sm text-gray-700">Cloud-Based Storage</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl">
                                        <RefreshCw className="w-4 h-4 text-green-600" />
                                        <span className="text-sm text-gray-700">Data Recovery</span>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    <a
                                        href="https://github.com/MdMehrabHasanSompod/credcrypt"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl group"
                                    >
                                        <SquareCode className="w-5 h-5" />
                                        <span className="font-medium">View on GitHub</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Package className="w-5 h-5 text-green-600" />
                                        <h3 className="font-semibold text-gray-900">Tech Stack</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">Next.js</span>
                                        <span className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">TypeScript</span>
                                        <span className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">Tailwind CSS</span>
                                        <span className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">MongoDB</span>
                                        <span className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">Node.js</span>
                                        <span className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">Redis</span>
                                        <span className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">NextAuth</span>
                                        <span className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">CryptoJS</span>
                                        <span className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">Zustand</span>
                                    </div>
                                </div>

                                <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Heart className="w-5 h-5 text-blue-600" />
                                        <h3 className="font-semibold text-gray-900">Why We Built This</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        We believe everyone deserves secure credential management. CredCrypt was built to provide enterprise-grade security with a consumer-friendly interface.
                                    </p>
                                </div>

                                <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Award className="w-5 h-5 text-purple-600" />
                                        <h3 className="font-semibold text-gray-900">Our Commitment</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        Your data security is our top priority. We continuously improve our security measures and stay updated with the latest encryption standards.
                                    </p>
                                </div>

                                <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                                    <div className="flex items-center gap-3 mb-2">
                                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                                        <h3 className="font-semibold text-gray-900">Never Lose Your Data</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        Unlike local storage solutions, CredCrypt ensures your credentials are always safe in the cloud.
                                        Even if you delete local files or reboot your system, your data remains secure and accessible.
                                        No more worrying about accidental data loss.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="relative overflow-hidden bg-linear-to-r from-green-700 to-green-800 rounded-3xl p-8 md:p-12 shadow-2xl">
                        <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[60px_60px]" />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/30 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/30 rounded-full blur-3xl" />

                        <div className="relative text-center max-w-3xl mx-auto">
                            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <Sparkles className="w-4 h-4" />
                                Get Started Today
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                                Ready to Secure Your Credentials?
                            </h2>
                            <p className="text-lg text-green-100 mb-8">
                                Join thousands of users who trust CredCrypt to keep their sensitive information safe and accessible.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {!user ? (
                                    <Link
                                        href="/register"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-700 hover:bg-gray-50 font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl group"
                                    >
                                        Start Now!
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                ) : (
                                    <Link
                                        href="/user/dashboard"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-700 hover:bg-gray-50 font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl group"
                                    >
                                        Go to Dashboard
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                )}
                                <button
                                    onClick={scrollToAbout}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600/30 hover:bg-green-600/40 text-white font-semibold rounded-xl transition-all duration-200 border-2 border-white/20 hover:border-white/40"
                                >
                                    Learn More
                                </button>
                            </div>
                            <p className="text-sm text-green-200/80 mt-4">
                                Free forever for individual users. No credit card required.
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}

export default Homepage