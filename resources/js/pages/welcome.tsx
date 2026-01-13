import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Resource Management System" />
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
                                    href={dashboard()}
                                    className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="rounded-lg px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                                    >
                                        Log in
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
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
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
                            Streamline Your
                            <span className="block text-blue-600">Resource Management</span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                            Efficiently track, allocate, and manage your organization's resources with our comprehensive management system. 
                            Get real-time insights and make data-driven decisions.
                        </p>
                        <div className="mt-10 flex justify-center gap-4">
                            {!auth.user && (
                                <>
                                    <Link
                                        href={register()}
                                        className="rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white transition hover:bg-blue-700"
                                    >
                                        Get Started
                                    </Link>
                                    <Link
                                        href={login()}
                                        className="rounded-lg border border-slate-300 bg-white px-8 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                                    >
                                        Learn More
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="mt-24 grid gap-8 md:grid-cols-3">
                        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
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

                        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
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

                        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
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

                {/* CTA Section */}
                <div className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                    <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                            Ready to optimize your resources?
                        </h2>
                        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                            Join organizations already using ResourceMS to streamline their operations.
                        </p>
                        {!auth.user && (
                            <div className="mt-8">
                                <Link
                                    href={register()}
                                    className="inline-block rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white transition hover:bg-blue-700"
                                >
                                    Start Free Trial
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
