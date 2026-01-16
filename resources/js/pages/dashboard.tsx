import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import type { Resource } from '@/types/resource';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Badge } from '@/components/ui/badge';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    stats: {
        totalResources: number;
        availableResources: number;
        inUseResources: number;
        maintenanceResources: number;
    };
    recentResources: Resource[];
    resourcesByType: Record<string, number>;
    resourcesByStatus: Record<string, number>;
    totalUsers?: number;
    adminCount?: number;
    managerCount?: number;
    userCount?: number;
    [key: string]: unknown;
}

export default function Dashboard() {
    const { stats, recentResources, resourcesByType, resourcesByStatus, totalUsers, adminCount, managerCount, userCount } = usePage<DashboardProps>().props;
    const { user, isAdmin } = useAuth();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-6 p-6">
                <AnimatedSection className="fade-in-up">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                        <p className="mt-1 text-slate-600 dark:text-slate-400">
                            Welcome back, {user?.name}
                        </p>
                    </div>
                    <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
                        Role: {user?.role?.toUpperCase()}
                    </Badge>
                </div>
                </AnimatedSection>

                <AnimatedSection delay={100}>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Resources</p>
                                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{stats.totalResources}</p>
                            </div>
                            <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6 text-blue-600 dark:text-blue-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Available</p>
                                <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">{stats.availableResources}</p>
                            </div>
                            <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6 text-green-600 dark:text-green-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">In Use</p>
                                <p className="mt-2 text-3xl font-bold text-orange-600 dark:text-orange-400">{stats.inUseResources}</p>
                            </div>
                            <div className="rounded-lg bg-orange-100 p-3 dark:bg-orange-900">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6 text-orange-600 dark:text-orange-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Maintenance</p>
                                <p className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">{stats.maintenanceResources}</p>
                            </div>
                            <div className="rounded-lg bg-red-100 p-3 dark:bg-red-900">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6 text-red-600 dark:text-red-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                </AnimatedSection>

                {isAdmin && totalUsers !== undefined && (
                    <div className="rounded-xl border border-slate-200 bg-gradient-to-r from-blue-50 to-purple-50 p-6 shadow-sm dark:border-slate-700 dark:from-blue-900/20 dark:to-purple-900/20">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">User Management</h2>
                            <Link href="/team">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-200 dark:hover:bg-blue-900/40"
                                >
                                    Manage Team
                                </Button>
                            </Link>
                        </div>
                        <div className="grid gap-4 md:grid-cols-4">
                            <div className="rounded-lg bg-white p-4 dark:bg-slate-800">
                                <p className="text-sm text-slate-600 dark:text-slate-400">Total Users</p>
                                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{totalUsers}</p>
                            </div>
                            <div className="rounded-lg bg-white p-4 dark:bg-slate-800">
                                <p className="text-sm text-slate-600 dark:text-slate-400">Admins</p>
                                <p className="mt-1 text-2xl font-bold text-purple-600 dark:text-purple-400">{adminCount}</p>
                            </div>
                            <div className="rounded-lg bg-white p-4 dark:bg-slate-800">
                                <p className="text-sm text-slate-600 dark:text-slate-400">Managers</p>
                                <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">{managerCount}</p>
                            </div>
                            <div className="rounded-lg bg-white p-4 dark:bg-slate-800">
                                <p className="text-sm text-slate-600 dark:text-slate-400">Users</p>
                                <p className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">{userCount}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Resources by Type</h2>
                        <div className="space-y-3">
                            {Object.entries(resourcesByType).map(([type, count]) => (
                                <div key={type} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                                        <span className="text-sm text-slate-700 dark:text-slate-300">{type || 'Unspecified'}</span>
                                    </div>
                                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Resources by Status</h2>
                        <div className="space-y-3">
                            {Object.entries(resourcesByStatus).map(([status, count]) => {
                                const statusColors: Record<string, string> = {
                                    'Available': 'bg-green-600',
                                    'In Use': 'bg-orange-600',
                                    'Maintenance': 'bg-red-600',
                                    'Reserved': 'bg-purple-600',
                                };
                                return (
                                    <div key={status} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-2 w-2 rounded-full ${statusColors[status] || 'bg-slate-600'}`}></div>
                                            <span className="text-sm text-slate-700 dark:text-slate-300">{status || 'Unspecified'}</span>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Resources</h2>
                        <Link href="/resources">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                View All Resources
                            </Button>
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-700">
                                    <th className="pb-3 text-left text-sm font-medium text-slate-600 dark:text-slate-400">Name</th>
                                    <th className="pb-3 text-left text-sm font-medium text-slate-600 dark:text-slate-400">Type</th>
                                    <th className="pb-3 text-left text-sm font-medium text-slate-600 dark:text-slate-400">Status</th>
                                    <th className="pb-3 text-left text-sm font-medium text-slate-600 dark:text-slate-400">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentResources.map((resource) => (
                                    <tr key={resource.id} className="border-b border-slate-100 dark:border-slate-700/50">
                                        <td className="py-3 text-sm text-slate-900 dark:text-white">{resource.name}</td>
                                        <td className="py-3 text-sm text-slate-600 dark:text-slate-400">{resource.type || 'N/A'}</td>
                                        <td className="py-3">
                                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                                resource.status === 'Available' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                                                resource.status === 'In Use' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' :
                                                resource.status === 'Maintenance' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                                                'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                                            }`}>
                                                {resource.status || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="py-3 text-sm text-slate-600 dark:text-slate-400">{resource.quantity || 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
