import { TiltCard } from '@/components/dom/TiltCard';
import { Footer } from '@/components/Footer';
import { PricingCard } from '@/components/PricingCard';
import { PRICING_PLANS } from '@/config/pricing';
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;
    const aboutSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px',
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        const animatedElements =
            document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const scrollToAbout = () => {
        aboutSectionRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
        });
    };

    return (
        <>
            <Head title="Resource Management System" />
            <style>{`
                .animate-on-scroll {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }
                
                .animate-on-scroll.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }

                .fade-in-up {
                    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .stagger-1 { animation-delay: 0.1s; }
                .stagger-2 { animation-delay: 0.2s; }
                .stagger-3 { animation-delay: 0.3s; }
                .stagger-4 { animation-delay: 0.4s; }
            `}</style>
            <div className="relative z-0 min-h-screen bg-transparent">
                {/* Header */}
                <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-6 w-6 text-white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                                    />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">
                                ResourceMS
                            </span>
                        </div>
                        <nav className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard().url}
                                    className="rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login().url}
                                        className="rounded-lg px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                                    >
                                        Log in
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register().url}
                                            className="rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                                        >
                                            Register
                                        </Link>
                                    )}
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 lg:py-48">
                    <div className="w-full space-y-8 md:w-[85%] lg:w-[75%]">
                        {/* Off-Grid Monospace Label */}
                        <div className="flex items-center gap-4 font-mono text-xs tracking-[0.2em] text-slate-400 uppercase">
                            <span className="h-px w-12 bg-slate-300 dark:bg-slate-700"></span>
                            Resource Management OS
                        </div>

                        <h1 className="text-[4rem] leading-[0.85] font-bold tracking-tighter text-slate-800 sm:text-[5.5rem] md:text-[6.5rem] lg:text-[7.5rem] dark:text-white/90">
                            Streamline Your
                            <span className="block text-green-600">
                                Operations
                            </span>
                        </h1>
                        <p className="max-w-md border-l border-slate-300 pl-6 text-sm leading-relaxed font-medium tracking-tight text-slate-600 dark:border-slate-700 dark:text-slate-400">
                            Efficiently track, allocate, and manage your
                            organization's resources with an opinionated
                            management system designed for scale.
                        </p>
                        <div className="flex gap-4 pt-8">
                            {!auth.user && (
                                <>
                                    <Link
                                        href={register().url}
                                        className="inline-flex h-12 items-center justify-center rounded-sm bg-slate-900 px-8 text-xs font-bold tracking-widest text-white uppercase transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                                    >
                                        Start Free Trial
                                    </Link>
                                    <button
                                        onClick={scrollToAbout}
                                        className="inline-flex h-12 items-center justify-center rounded-sm border border-slate-300 bg-transparent px-8 text-xs font-bold tracking-widest text-slate-700 uppercase transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                                    >
                                        Explore System
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Asymmetrical Bento Features Grid */}
                    <div className="-mx-4 mt-8 grid gap-4 sm:mx-0 md:grid-cols-3">
                        <div className="animate-on-scroll group relative rounded-none border border-slate-200/50 bg-slate-50/50 p-12 backdrop-blur-sm md:col-span-2 dark:border-slate-700/50 dark:bg-slate-800/20">
                            <div className="absolute top-8 left-8 font-mono text-xs text-slate-400">
                                01.
                            </div>
                            <div className="mt-24 md:mt-48">
                                <h3 className="mb-4 text-3xl font-bold tracking-tighter text-slate-800 dark:text-white">
                                    Real-Time Tracking
                                </h3>
                                <p className="max-w-md leading-relaxed text-slate-600 dark:text-slate-400">
                                    Monitor resource availability, allocation,
                                    and utilization in real-time. No more
                                    waiting for end-of-day syncs.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="animate-on-scroll group relative flex-1 rounded-none border border-slate-200/50 bg-transparent p-8 dark:border-slate-700/50">
                                <div className="mb-12 font-mono text-xs text-slate-400">
                                    02.
                                </div>
                                <h3 className="mb-2 text-xl font-bold tracking-tighter text-slate-800 dark:text-white">
                                    Smart Allocation
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                    Optimize resource distribution with
                                    intelligent algorithms.
                                </p>
                            </div>

                            <div className="animate-on-scroll group relative flex-1 rounded-none border border-slate-200/50 bg-transparent p-8 dark:border-slate-700/50">
                                <div className="mb-12 font-mono text-xs text-slate-400">
                                    03.
                                </div>
                                <h3 className="mb-2 text-xl font-bold tracking-tighter text-slate-800 dark:text-white">
                                    Deep Analytics
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                    Generate reports tailored exactly to your
                                    stakeholder needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Section with Parallax */}
                <div
                    ref={aboutSectionRef}
                    className="relative overflow-hidden bg-gradient-to-br from-green-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900"
                >
                    {/* Background decorative elements */}
                    <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-green-200 opacity-20 mix-blend-multiply blur-3xl filter dark:bg-green-900" />
                    <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-indigo-200 opacity-20 mix-blend-multiply blur-3xl filter dark:bg-indigo-900" />

                    <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                        <div className="grid items-center gap-12 md:grid-cols-2">
                            {/* Left Content */}
                            <div className="animate-on-scroll">
                                <h2 className="mb-6 text-4xl font-bold text-slate-900 dark:text-white">
                                    Why Choose ResourceMS?
                                </h2>
                                <p className="mb-4 text-lg text-slate-600 dark:text-slate-300">
                                    Our resource management system is designed
                                    to help organizations of all sizes
                                    streamline their operations and maximize
                                    efficiency.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-green-600 text-white">
                                            <svg
                                                className="h-4 w-4"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white">
                                                Easy to Use
                                            </h4>
                                            <p className="text-slate-600 dark:text-slate-300">
                                                Intuitive interface that
                                                requires minimal training
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-green-600 text-white">
                                            <svg
                                                className="h-4 w-4"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white">
                                                Real-Time Updates
                                            </h4>
                                            <p className="text-slate-600 dark:text-slate-300">
                                                Live tracking and instant
                                                notifications
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-green-600 text-white">
                                            <svg
                                                className="h-4 w-4"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white">
                                                Secure & Reliable
                                            </h4>
                                            <p className="text-slate-600 dark:text-slate-300">
                                                Enterprise-grade security and
                                                99.9% uptime
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Right Image/Stats */}
                            <div className="animate-on-scroll">
                                <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-slate-700">
                                    <div className="grid gap-6">
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-green-600">
                                                10K+
                                            </div>
                                            <p className="mt-2 text-slate-600 dark:text-slate-300">
                                                Active Users
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-green-600">
                                                500+
                                            </div>
                                            <p className="mt-2 text-slate-600 dark:text-slate-300">
                                                Organizations
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-purple-600">
                                                99.9%
                                            </div>
                                            <p className="mt-2 text-slate-600 dark:text-slate-300">
                                                Uptime
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Deep Dive Section */}
                <div className="border-t border-slate-200/50 bg-transparent dark:border-slate-700/50">
                    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                        <div className="animate-on-scroll mb-16 text-center">
                            <h3 className="mb-4 text-3xl font-bold tracking-tighter text-slate-800 dark:text-white/90">
                                Powerful Features
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Everything you need to manage resources
                                effectively
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            <div className="animate-on-scroll border-t border-slate-200/50 bg-transparent p-6 dark:border-slate-700/50">
                                <h4 className="mb-2 font-semibold tracking-tight text-slate-800 dark:text-white/90">
                                    Advanced Analytics
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Detailed insights and comprehensive reports
                                </p>
                            </div>

                            <div className="animate-on-scroll border-t border-slate-200/50 bg-transparent p-6 md:translate-y-6 dark:border-slate-700/50">
                                <h4 className="mb-2 font-semibold tracking-tight text-slate-800 dark:text-white/90">
                                    Smart Automation
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Automate routine tasks and workflows
                                </p>
                            </div>

                            <div className="animate-on-scroll border-t border-slate-200/50 bg-transparent p-6 md:translate-y-12 dark:border-slate-700/50">
                                <h4 className="mb-2 font-semibold tracking-tight text-slate-800 dark:text-white/90">
                                    Secure Access
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Role-based permissions and data encryption
                                </p>
                            </div>

                            <div className="animate-on-scroll border-t border-slate-200/50 bg-transparent p-6 md:translate-y-16 dark:border-slate-700/50">
                                <h4 className="mb-2 font-semibold tracking-tight text-slate-800 dark:text-white/90">
                                    Custom Reports
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Build reports tailored to your needs
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How It Works Section */}
                <div className="border-t border-slate-200/50 bg-transparent pt-48 pb-24 dark:border-slate-700/50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="animate-on-scroll mb-24 grid gap-12 md:grid-cols-2">
                            <h3 className="text-[3rem] leading-[0.9] font-bold tracking-tighter text-slate-900 dark:text-white">
                                Deploy instantly.
                                <br />
                                Scale infinitely.
                            </h3>
                            <p className="max-w-md self-end text-lg font-medium tracking-tight text-slate-600 dark:text-slate-400">
                                A three-phase architecture designed completely
                                around speed of integration.
                            </p>
                        </div>
                        <div className="grid gap-px border border-slate-200/50 bg-slate-200/50 md:grid-cols-3 dark:border-slate-700/50 dark:bg-slate-700/50">
                            <div className="animate-on-scroll bg-slate-50 p-12 dark:bg-slate-900">
                                <div className="mb-12 font-mono text-sm tracking-widest text-green-600">
                                    [ PHASE 01 ]
                                </div>
                                <h4 className="mb-4 text-2xl font-bold tracking-tighter text-slate-900 dark:text-white">
                                    Initialize
                                </h4>
                                <p className="text-sm leading-relaxed font-medium text-slate-600 dark:text-slate-400">
                                    Sign up and provision your organizational
                                    space instantly. No complex onboarding
                                    required.
                                </p>
                            </div>
                            <div className="animate-on-scroll bg-slate-50 p-12 dark:bg-slate-900">
                                <div className="mb-12 font-mono text-sm tracking-widest text-slate-400">
                                    [ PHASE 02 ]
                                </div>
                                <h4 className="mb-4 text-2xl font-bold tracking-tighter text-slate-900 dark:text-white">
                                    Connect
                                </h4>
                                <p className="text-sm leading-relaxed font-medium text-slate-600 dark:text-slate-400">
                                    Import your infrastructure. Bulk-upload CSVs
                                    or utilize our intelligent categorization
                                    APIs.
                                </p>
                            </div>
                            <div className="animate-on-scroll bg-slate-50 p-12 dark:bg-slate-900">
                                <div className="mb-12 font-mono text-sm tracking-widest text-slate-400">
                                    [ PHASE 03 ]
                                </div>
                                <h4 className="mb-4 text-2xl font-bold tracking-tighter text-slate-900 dark:text-white">
                                    Execute
                                </h4>
                                <p className="text-sm leading-relaxed font-medium text-slate-600 dark:text-slate-400">
                                    Allocate resources with deterministic
                                    accuracy and monitor throughput via WebGL
                                    telemetry.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Use Cases Section */}
                <div className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                        <div className="animate-on-scroll mb-16 text-center">
                            <h3 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
                                Built for Every Industry
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-slate-300">
                                From healthcare to education, our system adapts
                                to your needs
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <div className="animate-on-scroll rounded-xl border border-slate-200 p-6 transition-shadow hover:shadow-lg dark:border-slate-700">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                                    <svg
                                        className="h-6 w-6 text-green-600 dark:text-green-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                                    Healthcare
                                </h4>
                                <p className="text-slate-600 dark:text-slate-300">
                                    Manage medical equipment, hospital beds, and
                                    staff scheduling efficiently.
                                </p>
                            </div>
                            <div className="animate-on-scroll rounded-xl border border-slate-200 p-6 transition-shadow hover:shadow-lg dark:border-slate-700">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                                    <svg
                                        className="h-6 w-6 text-green-600 dark:text-green-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                                    Education
                                </h4>
                                <p className="text-slate-600 dark:text-slate-300">
                                    Track classroom resources, library
                                    materials, and lab equipment with ease.
                                </p>
                            </div>
                            <div className="animate-on-scroll rounded-xl border border-slate-200 p-6 transition-shadow hover:shadow-lg dark:border-slate-700">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                                    <svg
                                        className="h-6 w-6 text-purple-600 dark:text-purple-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                                    Corporate
                                </h4>
                                <p className="text-slate-600 dark:text-slate-300">
                                    Optimize office space, equipment, and
                                    employee resource allocation.
                                </p>
                            </div>
                            <div className="animate-on-scroll rounded-xl border border-slate-200 p-6 transition-shadow hover:shadow-lg dark:border-slate-700">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900">
                                    <svg
                                        className="h-6 w-6 text-orange-600 dark:text-orange-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                                    Manufacturing
                                </h4>
                                <p className="text-slate-600 dark:text-slate-300">
                                    Monitor machinery, tools, and production
                                    resources in real-time.
                                </p>
                            </div>
                            <div className="animate-on-scroll rounded-xl border border-slate-200 p-6 transition-shadow hover:shadow-lg dark:border-slate-700">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900">
                                    <svg
                                        className="h-6 w-6 text-red-600 dark:text-red-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                                    Events
                                </h4>
                                <p className="text-slate-600 dark:text-slate-300">
                                    Coordinate venues, equipment, and staff for
                                    successful events.
                                </p>
                            </div>
                            <div className="animate-on-scroll rounded-xl border border-slate-200 p-6 transition-shadow hover:shadow-lg dark:border-slate-700">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900">
                                    <svg
                                        className="h-6 w-6 text-teal-600 dark:text-teal-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                                    IT & Tech
                                </h4>
                                <p className="text-slate-600 dark:text-slate-300">
                                    Track hardware, software licenses, and
                                    technical equipment inventory.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className="border-t border-slate-200 bg-gradient-to-br from-green-50 to-indigo-50 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
                    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                        <div className="animate-on-scroll mb-16 text-center">
                            <h3 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
                                What Our Clients Say
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-slate-300">
                                Trusted by organizations worldwide
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="animate-on-scroll rounded-xl bg-white p-8 shadow-sm dark:bg-slate-800">
                                <div className="mb-4 flex items-center">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className="h-5 w-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="mb-4 text-slate-600 dark:text-slate-300">
                                    "ResourceMS transformed our equipment
                                    management. We've reduced downtime by 40%
                                    and improved resource utilization
                                    significantly."
                                </p>
                                <div className="flex items-center">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-semibold text-white">
                                        JD
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-semibold text-slate-900 dark:text-white">
                                            John Davis
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            Operations Manager
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="animate-on-scroll rounded-xl bg-white p-8 shadow-sm dark:bg-slate-800">
                                <div className="mb-4 flex items-center">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className="h-5 w-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="mb-4 text-slate-600 dark:text-slate-300">
                                    "The analytics features are outstanding. We
                                    can now make data-driven decisions about
                                    resource allocation and planning."
                                </p>
                                <div className="flex items-center">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-semibold text-white">
                                        SM
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-semibold text-slate-900 dark:text-white">
                                            Sarah Martinez
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            IT Director
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="animate-on-scroll rounded-xl bg-white p-8 shadow-sm dark:bg-slate-800">
                                <div className="mb-4 flex items-center">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className="h-5 w-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="mb-4 text-slate-600 dark:text-slate-300">
                                    "Easy to use and incredibly efficient. Our
                                    team adopted it within days, and we're
                                    already seeing improved productivity."
                                </p>
                                <div className="flex items-center">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 font-semibold text-white">
                                        MC
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-semibold text-slate-900 dark:text-white">
                                            Michael Chen
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            Facility Manager
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing Section */}
                <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 dark:bg-slate-800">
                    <div className="mx-auto max-w-7xl">
                        <div className="animate-on-scroll mb-12 text-center">
                            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
                                Simple, Transparent Pricing
                            </h2>
                            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                                Choose the plan that fits your needs. All plans
                                include a 14-day free trial.
                            </p>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-3">
                            {PRICING_PLANS.map((plan, index) => (
                                <div
                                    key={plan.slug}
                                    className="animate-on-scroll"
                                    style={{
                                        transitionDelay: `${index * 100}ms`,
                                    }}
                                >
                                    <TiltCard className="h-full">
                                        <PricingCard plan={plan} />
                                    </TiltCard>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-slate-600 dark:text-slate-400">
                                Want to see all pricing details?{' '}
                                <Link
                                    href="/pricing"
                                    className="font-semibold text-green-600 hover:text-green-700 dark:text-green-400"
                                >
                                    View pricing page
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <div className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                    <div className="animate-on-scroll mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                            Ready to optimize your resources?
                        </h2>
                        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                            Join organizations already using ResourceMS to
                            streamline their operations.
                        </p>
                        {!auth.user && (
                            <div className="mt-8">
                                <Link
                                    href={register().url}
                                    className="inline-block rounded-lg bg-green-600 px-8 py-3 text-base font-medium text-white transition hover:bg-green-700"
                                >
                                    Start Free Trial
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
