import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useRef, useEffect } from 'react';
import { Footer } from '@/components/Footer';
import { CheckCircle, Star } from 'lucide-react';

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
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const scrollToAbout = () => {
        aboutSectionRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
    };

    return (
        <>
            <Head title="Resource Management System" />
            <style>{`
                .animate-on-scroll {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                }
                
                .animate-on-scroll.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }

                .fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
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
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                {/* Header */}
                <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">ResourceMS</span>
                        </div>
                        <nav className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard().url}
                                    className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
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
                                            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
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
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white fade-in-up">
                            Streamline Your
                            <span className="block text-blue-600">Resource Management</span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300 fade-in-up stagger-1">
                            Efficiently track, allocate, and manage your organization's resources with our comprehensive management system. 
                            Get real-time insights and make data-driven decisions.
                        </p>
                        <div className="mt-10 flex justify-center gap-4 fade-in-up stagger-2">
                            {!auth.user && (
                                <>
                                    <Link
                                        href={register().url}
                                        className="rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white transition hover:bg-blue-700"
                                    >
                                        Get Started
                                    </Link>
                                    <button
                                        onClick={scrollToAbout}
                                        className="rounded-lg border border-slate-300 bg-white px-8 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                                    >
                                        Learn More
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="mt-24 grid gap-8 md:grid-cols-3">
                        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800 animate-on-scroll">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6 text-blue-600 dark:text-blue-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">Real-Time Tracking</h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                Monitor resource availability, allocation, and utilization in real-time with intuitive dashboards.
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800 animate-on-scroll">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6 text-green-600 dark:text-green-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">Smart Allocation</h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                Optimize resource distribution with intelligent allocation algorithms and availability forecasting.
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800 animate-on-scroll">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6 text-purple-600 dark:text-purple-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">Detailed Analytics</h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                Access comprehensive reports and analytics to make informed decisions about resource planning.
                            </p>
                        </div>
                    </div>
                </div>

                {/* About Section with Parallax */}
                <div
                    ref={aboutSectionRef}
                    className="relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 overflow-hidden"
                >
                    {/* Background decorative elements */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 dark:bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

                    <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                        <div className="grid gap-12 md:grid-cols-2 items-center">
                            {/* Left Content */}
                            <div className="animate-on-scroll">
                                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                                    Why Choose ResourceMS?
                                </h2>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
                                    Our resource management system is designed to help organizations of all sizes streamline their operations and maximize efficiency.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-md bg-blue-600 text-white">
                                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white">Easy to Use</h4>
                                            <p className="text-slate-600 dark:text-slate-300">Intuitive interface that requires minimal training</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-md bg-blue-600 text-white">
                                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white">Real-Time Updates</h4>
                                            <p className="text-slate-600 dark:text-slate-300">Live tracking and instant notifications</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-md bg-blue-600 text-white">
                                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white">Secure & Reliable</h4>
                                            <p className="text-slate-600 dark:text-slate-300">Enterprise-grade security and 99.9% uptime</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Right Image/Stats */}
                            <div className="animate-on-scroll">
                                <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-8">
                                    <div className="grid gap-6">
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-blue-600">10K+</div>
                                            <p className="text-slate-600 dark:text-slate-300 mt-2">Active Users</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-green-600">500+</div>
                                            <p className="text-slate-600 dark:text-slate-300 mt-2">Organizations</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-purple-600">99.9%</div>
                                            <p className="text-slate-600 dark:text-slate-300 mt-2">Uptime</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Deep Dive Section */}
                <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 animate-on-scroll">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Powerful Features</h3>
                            <p className="text-lg text-slate-600 dark:text-slate-300">Everything you need to manage resources effectively</p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            <div className="p-6 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 animate-on-scroll">
                                <div className="h-12 w-12 rounded-lg bg-blue-600 flex items-center justify-center mb-4">
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Advanced Analytics</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Detailed insights and comprehensive reports</p>
                            </div>

                            <div className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 animate-on-scroll">
                                <div className="h-12 w-12 rounded-lg bg-green-600 flex items-center justify-center mb-4">
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Smart Automation</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Automate routine tasks and workflows</p>
                            </div>

                            <div className="p-6 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 animate-on-scroll">
                                <div className="h-12 w-12 rounded-lg bg-purple-600 flex items-center justify-center mb-4">
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Secure Access</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Role-based permissions and data encryption</p>
                            </div>

                            <div className="p-6 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 animate-on-scroll">
                                <div className="h-12 w-12 rounded-lg bg-orange-600 flex items-center justify-center mb-4">
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12M8 11h12M8 15h12M3 7h.01M3 11h.01M3 15h.01" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Custom Reports</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Build reports tailored to your needs</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How It Works Section */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-t border-slate-200 dark:border-slate-700">
                    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 animate-on-scroll">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">How It Works</h3>
                            <p className="text-lg text-slate-600 dark:text-slate-300">Get started in three simple steps</p>
                        </div>
                        <div className="grid gap-12 md:grid-cols-3">
                            <div className="text-center animate-on-scroll">
                                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white text-2xl font-bold mb-6">1</div>
                                <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Create Your Account</h4>
                                <p className="text-slate-600 dark:text-slate-300">Sign up in seconds and set up your organization profile. No credit card required for the trial period.</p>
                            </div>
                            <div className="text-center animate-on-scroll">
                                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white text-2xl font-bold mb-6">2</div>
                                <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Add Your Resources</h4>
                                <p className="text-slate-600 dark:text-slate-300">Import or manually add your resources. Categorize, tag, and set availability for each item.</p>
                            </div>
                            <div className="text-center animate-on-scroll">
                                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-white text-2xl font-bold mb-6">3</div>
                                <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Start Managing</h4>
                                <p className="text-slate-600 dark:text-slate-300">Track, allocate, and monitor resources in real-time. Generate reports and optimize your workflow.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Use Cases Section */}
                <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 animate-on-scroll">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Built for Every Industry</h3>
                            <p className="text-lg text-slate-600 dark:text-slate-300">From healthcare to education, our system adapts to your needs</p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg transition-shadow animate-on-scroll">
                                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                                    <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Healthcare</h4>
                                <p className="text-slate-600 dark:text-slate-300">Manage medical equipment, hospital beds, and staff scheduling efficiently.</p>
                            </div>
                            <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg transition-shadow animate-on-scroll">
                                <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                                    <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Education</h4>
                                <p className="text-slate-600 dark:text-slate-300">Track classroom resources, library materials, and lab equipment with ease.</p>
                            </div>
                            <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg transition-shadow animate-on-scroll">
                                <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                                    <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Corporate</h4>
                                <p className="text-slate-600 dark:text-slate-300">Optimize office space, equipment, and employee resource allocation.</p>
                            </div>
                            <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg transition-shadow animate-on-scroll">
                                <div className="h-12 w-12 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center mb-4">
                                    <svg className="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Manufacturing</h4>
                                <p className="text-slate-600 dark:text-slate-300">Monitor machinery, tools, and production resources in real-time.</p>
                            </div>
                            <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg transition-shadow animate-on-scroll">
                                <div className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center mb-4">
                                    <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Events</h4>
                                <p className="text-slate-600 dark:text-slate-300">Coordinate venues, equipment, and staff for successful events.</p>
                            </div>
                            <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-lg transition-shadow animate-on-scroll">
                                <div className="h-12 w-12 rounded-lg bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-4">
                                    <svg className="h-6 w-6 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">IT & Tech</h4>
                                <p className="text-slate-600 dark:text-slate-300">Track hardware, software licenses, and technical equipment inventory.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border-t border-slate-200 dark:border-slate-700">
                    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 animate-on-scroll">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">What Our Clients Say</h3>
                            <p className="text-lg text-slate-600 dark:text-slate-300">Trusted by organizations worldwide</p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm animate-on-scroll">
                                <div className="flex items-center mb-4">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 mb-4">"ResourceMS transformed our equipment management. We've reduced downtime by 40% and improved resource utilization significantly."</p>
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">JD</div>
                                    <div className="ml-3">
                                        <p className="font-semibold text-slate-900 dark:text-white">John Davis</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Operations Manager</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm animate-on-scroll">
                                <div className="flex items-center mb-4">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 mb-4">"The analytics features are outstanding. We can now make data-driven decisions about resource allocation and planning."</p>
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">SM</div>
                                    <div className="ml-3">
                                        <p className="font-semibold text-slate-900 dark:text-white">Sarah Martinez</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">IT Director</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm animate-on-scroll">
                                <div className="flex items-center mb-4">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 mb-4">"Easy to use and incredibly efficient. Our team adopted it within days, and we're already seeing improved productivity."</p>
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">MC</div>
                                    <div className="ml-3">
                                        <p className="font-semibold text-slate-900 dark:text-white">Michael Chen</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Facility Manager</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing Section */}
                <section className="bg-slate-50 dark:bg-slate-800 px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center animate-on-scroll mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                                Simple, Transparent Pricing
                            </h2>
                            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                                Choose the plan that fits your needs. All plans include a 14-day free trial.
                            </p>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Free Plan */}
                            <div className="animate-on-scroll rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Free</h3>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Perfect for getting started</p>
                                <div className="mt-6">
                                    <span className="text-5xl font-bold text-slate-900 dark:text-white">$0</span>
                                    <span className="text-slate-600 dark:text-slate-400"> Forever free</span>
                                </div>
                                <Link
                                    href={register().url}
                                    className="mt-8 block w-full rounded-lg border border-slate-300 bg-white py-2 text-center text-slate-900 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                                >
                                    Get Started
                                </Link>
                                <div className="mt-8 space-y-4 border-t border-slate-200 pt-8 dark:border-slate-700">
                                    {['Up to 50 resources', 'Single user account', 'Basic resource tracking', 'Email support', '7-day history retention'].map((feature) => (
                                        <div key={feature} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400 mt-0.5" />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Professional Plan - Featured */}
                            <div className="animate-on-scroll relative rounded-2xl border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-white p-8 shadow-2xl dark:from-blue-900/20 dark:to-slate-900">
                                <div className="mb-4 flex items-center gap-2">
                                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Most Popular</span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Professional</h3>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">For growing teams</p>
                                <div className="mt-6">
                                    <span className="text-5xl font-bold text-slate-900 dark:text-white">$29</span>
                                    <span className="text-slate-600 dark:text-slate-400"> /month</span>
                                </div>
                                <Link
                                    href={register().url}
                                    className="mt-8 block w-full rounded-lg bg-blue-600 py-2 text-center font-medium text-white transition hover:bg-blue-700"
                                >
                                    Start 14-Day Trial
                                </Link>
                                <div className="mt-8 space-y-4 border-t border-slate-200 pt-8 dark:border-slate-700">
                                    {['Up to 500 resources', 'Up to 5 team members', 'Advanced resource tracking', 'Resource analytics & reports', '1-year history retention', 'Priority email support', 'API access', 'Custom resource fields'].map((feature) => (
                                        <div key={feature} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400 mt-0.5" />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Enterprise Plan */}
                            <div className="animate-on-scroll rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Enterprise</h3>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">For large organizations</p>
                                <div className="mt-6">
                                    <span className="text-5xl font-bold text-slate-900 dark:text-white">$99</span>
                                    <span className="text-slate-600 dark:text-slate-400"> /month</span>
                                </div>
                                <a
                                    href="mailto:info@resourcems.com"
                                    className="mt-8 block w-full rounded-lg border border-slate-300 bg-white py-2 text-center text-slate-900 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                                >
                                    Contact Sales
                                </a>
                                <div className="mt-8 space-y-4 border-t border-slate-200 pt-8 dark:border-slate-700">
                                    {['Unlimited resources', 'Unlimited team members', 'Advanced resource tracking', 'Resource analytics & reports', 'Unlimited history retention', '24/7 phone & email support', 'Advanced API access', 'Custom resource fields', 'Role-based permissions', 'Audit logging', 'Custom integrations', 'Dedicated account manager'].map((feature) => (
                                        <div key={feature} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400 mt-0.5" />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-slate-600 dark:text-slate-400">
                                Want to see all pricing details?{' '}
                                <Link href="/pricing" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">
                                    View pricing page
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <div className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                    <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 animate-on-scroll">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                            Ready to optimize your resources?
                        </h2>
                        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                            Join organizations already using ResourceMS to streamline their operations.
                        </p>
                        {!auth.user && (
                            <div className="mt-8">
                                <Link
                                    href={register().url}
                                    className="inline-block rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white transition hover:bg-blue-700"
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
