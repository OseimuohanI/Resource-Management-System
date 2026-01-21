import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { animationStyles } from '@/components/AnimatedSection';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <>
            <style>{animationStyles}</style>
            <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            {/* Left Side - Branding */}
            <div className="hidden w-1/2 bg-green-600 p-12 lg:flex lg:flex-col lg:justify-between">
                <Link href={home().url} className="flex items-center gap-2 fade-in-up">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6 text-green-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                    </div>
                    <span className="text-2xl font-bold text-white">ResourceMS</span>
                </Link>
                
                <div className="space-y-6 fade-in-up stagger-1">
                    <h2 className="text-4xl font-bold leading-tight text-white">
                        Manage your resources efficiently
                    </h2>
                    <p className="text-lg text-green-100">
                        Track, allocate, and optimize your organization's resources with real-time insights and comprehensive analytics.
                    </p>
                </div>

                <div className="text-sm text-green-100">
                    © 2026 ResourceMS. All rights reserved.
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <Link href={home().url} className="mb-8 flex items-center justify-center gap-2 lg:hidden fade-in-up">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-slate-900 dark:text-white">ResourceMS</span>
                    </Link>

                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-800 fade-in-up stagger-2">
                        <div className="mb-8 space-y-2">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                {description}
                            </p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
