import { animationStyles } from '@/components/AnimatedSection';
import AppLogoIcon from '@/components/app-logo-icon';
import { TiltCard } from '@/components/dom/TiltCard';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

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
            <div className="relative z-0 flex min-h-screen bg-transparent">
                {/* Left Side - Branding */}
                <div className="hidden w-1/2 bg-green-600 p-12 lg:flex lg:flex-col lg:justify-between">
                    <Link
                        href={home().url}
                        className="fade-in-up flex items-center gap-2"
                    >
                        <AppLogoIcon className="h-10 w-10" />
                        <span className="text-2xl font-bold text-white">
                            ResourceMS
                        </span>
                    </Link>

                    <div className="fade-in-up stagger-1 space-y-6">
                        <h2 className="text-4xl leading-[0.9] font-bold tracking-tighter text-white">
                            Manage your resources efficiently
                        </h2>
                        <p className="text-lg leading-relaxed tracking-tight text-green-100/80">
                            Track, allocate, and optimize your organization's
                            resources with real-time insights and comprehensive
                            analytics.
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
                        <Link
                            href={home().url}
                            className="fade-in-up mb-8 flex items-center justify-center gap-2 lg:hidden"
                        >
                            <AppLogoIcon className="h-10 w-10" />
                            <span className="text-xl font-bold text-slate-900 dark:text-white">
                                ResourceMS
                            </span>
                        </Link>

                        <TiltCard className="fade-in-up stagger-2 rounded-2xl border border-slate-200/50 bg-white/50 p-8 shadow-lg backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-800/90">
                            <div className="mb-8 space-y-2">
                                <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white/90">
                                    {title}
                                </h1>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {description}
                                </p>
                            </div>
                            {children}
                        </TiltCard>
                    </div>
                </div>
            </div>
        </>
    );
}
