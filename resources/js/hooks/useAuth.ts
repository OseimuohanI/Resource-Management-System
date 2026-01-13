import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';

export function useAuth() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    // Debug logging
    if (typeof window !== 'undefined') {
        console.log('useAuth - user object:', user);
        console.log('useAuth - user role:', user?.role);
        console.log('useAuth - canEdit:', user?.role === 'admin' || user?.role === 'manager');
    }

    return {
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isManager: user?.role === 'manager',
        isUser: user?.role === 'user',
        hasRole: (role: 'admin' | 'manager' | 'user') => user?.role === role,
        canDelete: user?.role === 'admin',
        canEdit: user?.role === 'admin' || user?.role === 'manager',
        canCreate: user?.role === 'admin' || user?.role === 'manager',
        canView: !!user,
    };
}
