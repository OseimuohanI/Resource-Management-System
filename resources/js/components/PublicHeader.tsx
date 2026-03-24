import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';

interface PublicHeaderProps {
    variant?: 'auth' | 'back';
    backHref?: string;
}

export function PublicHeader({
    variant = 'back',
    backHref = '/',
}: PublicHeaderProps) {
    return (
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2">
                    <AppLogoIcon className="h-10 w-10" />
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                        ResourceMS
                    </span>
                </Link>
                {variant === 'auth' ? (
                    <nav className="flex items-center gap-3">
                        <Link
                            href="/login"
                            className="rounded-lg px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/register"
                            className="rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                        >
                            Sign up
                        </Link>
                    </nav>
                ) : (
                    <Link
                        href={backHref}
                        className="text-sm font-medium text-slate-600 hover:text-green-600 dark:text-slate-400 dark:hover:text-green-400"
                    >
                        Back to Home
                    </Link>
                )}
            </div>
        </header>
    );
}
