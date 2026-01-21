import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { api, handleApiError } from '@/lib/api';
import { type SharedData } from '@/types';

interface CompanyUser {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    deleted_at: string | null;
}

const formatPlanName = (plan: string | null) => {
    if (!plan) {
        return 'Free';
    }

    if (plan === 'professional') {
        return 'Professional';
    }

    if (plan === 'enterprise') {
        return 'Enterprise';
    }

    if (plan === 'free') {
        return 'Free';
    }

    return plan.charAt(0).toUpperCase() + plan.slice(1);
};

const formatRoleLabel = (role: string) => {
    if (role === 'admin') {
        return 'Admin';
    }

    if (role === 'manager') {
        return 'Manager';
    }

    return 'User';
};

const getRoleBadgeClasses = (role: string) => {
    if (role === 'admin') {
        return 'border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-700 dark:bg-purple-900/40 dark:text-purple-200';
    }

    if (role === 'manager') {
        return 'border-green-200 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900/40 dark:text-green-200';
    }

    return 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200';
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Team',
        href: '/team',
    },
];

export default function Team() {
    const { auth } = usePage<SharedData>().props;
    const canManageTeam = auth.user.role === 'admin' || auth.user.role === 'manager';

    const [users, setUsers] = useState<CompanyUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [plan, setPlan] = useState<string | null>(null);
    const [userLimit, setUserLimit] = useState<number | null>(null);
    const [usedSeats, setUsedSeats] = useState<number | null>(null);
    const [remainingSeats, setRemainingSeats] = useState<number | null>(null);
    const [isUnlimitedSeats, setIsUnlimitedSeats] = useState(false);
    const [showTrashed, setShowTrashed] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'user',
    });

    const fetchUsers = async () => {
        try {
            setError(null);
            const url = `/company/users${showTrashed ? '?trashed=only' : ''}`;
            const response = await api.get(url);
            const data = response.data;

            setUsers(data.users || []);
            setPlan(typeof data.plan === 'string' ? data.plan : null);
            setUserLimit(typeof data.user_limit === 'number' ? data.user_limit : null);
            setUsedSeats(typeof data.used_seats === 'number' ? data.used_seats : null);
            setRemainingSeats(typeof data.remaining_seats === 'number' ? data.remaining_seats : null);
            setIsUnlimitedSeats(Boolean(data.is_unlimited_seats));
        } catch (err) {
            setError(handleApiError(err));
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [showTrashed]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            await api.post('/company/users', formData);

            setSuccessMessage('Team member added successfully');
            setFormData({
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                role: 'user',
            });

            await fetchUsers();

            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    };

    const handleRestoreUser = async (userId: number) => {
        setLoading(true);
        try {
            await api.post(`/company/users/${userId}/restore`);
            setSuccessMessage('User restored successfully');
            await fetchUsers();
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    };

    const handleForceDeleteUser = async (userId: number) => {
        if (!confirm('This will permanently delete the user. This action cannot be undone.')) return;
        
        setLoading(true);
        try {
            await api.delete(`/company/users/${userId}/force`);
            setSuccessMessage('User permanently deleted');
            await fetchUsers();
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId: number) => {
        if (!confirm('Are you sure you want to remove this team member?')) {
            return;
        }

        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            await api.delete(`/company/users/${userId}`);
            setSuccessMessage('Team member removed successfully');
            await fetchUsers();
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Team" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Team</h1>
                        <p className="mt-1 text-slate-600 dark:text-slate-400">
                            Manage users in your company based on your subscription plan
                        </p>
                    </div>
                    {plan && (
                        <div className="flex flex-col items-end gap-1">
                            <Badge
                                variant="secondary"
                                className="border-green-200 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900/40 dark:text-green-200"
                            >
                                Plan: {formatPlanName(plan)}
                            </Badge>
                            {!isUnlimitedSeats && userLimit !== null && usedSeats !== null && (
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    {usedSeats} of {userLimit} seats used
                                    {remainingSeats !== null && remainingSeats >= 0
                                        ? ` (${remainingSeats} remaining)`
                                        : ''}
                                </p>
                            )}
                            {isUnlimitedSeats && usedSeats !== null && (
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    {usedSeats} seats used on an unlimited plan
                                </p>
                            )}
                        </div>
                    )}
                    {canManageTeam && (
                        <Button
                            variant="outline"
                            onClick={() => setShowTrashed(!showTrashed)}
                            className={showTrashed ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/20 dark:border-amber-700 dark:text-amber-200" : ""}
                        >
                            {showTrashed ? 'Show Active Users' : 'Show Trashed Users'}
                        </Button>
                    )}
                </div>

                {successMessage && (
                    <div className="rounded-lg bg-green-50 p-4 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
                        {successMessage}
                    </div>
                )}

                {error && (
                    <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                        {error}
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                    {canManageTeam && (
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                                Invite new team member
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Full name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Name"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="email@example.com"
                                    />
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="password_confirmation">Confirm password</Label>
                                        <Input
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            type="password"
                                            value={formData.password_confirmation}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="role">Role</Label>
                                    <select
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        title="Role"
                                        className="flex h-9 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                    >
                                        <option value="user">User</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    {loading ? 'Adding...' : 'Add team member'}
                                </Button>
                            </form>
                        </div>
                    )}

                    <div className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 ${!canManageTeam ? 'md:col-span-2' : ''}`}>
                        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                            Current team members
                        </h2>
                        {users.length === 0 ? (
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                No team members yet.
                            </p>
                        ) : (
                            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-200 dark:border-slate-700">
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                                                Name
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                                                Email
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                                                Role
                                            </th>
                                            {canManageTeam && (
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                                                    Actions
                                                </th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="border-b border-slate-100 dark:border-slate-700/50"
                                            >
                                                <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">
                                                    {user.name}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                                                    {user.email}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <Badge
                                                        variant="outline"
                                                        className={getRoleBadgeClasses(user.role)}
                                                    >
                                                        {formatRoleLabel(user.role)}
                                                    </Badge>
                                                </td>
                                                {canManageTeam && (
                                                    <td className="px-4 py-3 text-sm">
                                                        {user.deleted_at ? (
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => handleRestoreUser(user.id)}
                                                                    className="h-8 px-2 text-xs"
                                                                >
                                                                    Restore
                                                                </Button>
                                                                <Button
                                                                    variant="destructive"
                                                                    size="sm"
                                                                    onClick={() => handleForceDeleteUser(user.id)}
                                                                    className="h-8 px-2 text-xs"
                                                                >
                                                                    Delete Forever
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            user.id !== auth.user.id && (
                                                                <Button
                                                                    variant="destructive"
                                                                    size="sm"
                                                                    onClick={() => handleDeleteUser(user.id)}
                                                                    className="h-8 px-2 text-xs"
                                                                >
                                                                    Remove
                                                                </Button>
                                                            )
                                                        )}
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
