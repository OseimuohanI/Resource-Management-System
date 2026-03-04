import { animationStyles } from '@/components/AnimatedSection';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { setAuthToken } from '@/lib/api';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { type ReactNode, useEffect } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const pageProps = usePage().props as {
        sanctum_token?: string;
        auth?: { user?: { remember_token?: string } };
    };
    const sanctum_token = pageProps.sanctum_token;
    const remember_token = pageProps.auth?.user?.remember_token;

    useEffect(() => {
        if (sanctum_token) {
            setAuthToken(sanctum_token);
        } else if (remember_token) {
            setAuthToken(remember_token);
        }
    }, [sanctum_token, remember_token]);

    return (
        <>
            <style>{animationStyles}</style>
            <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
                {children}
            </AppLayoutTemplate>
        </>
    );
};
