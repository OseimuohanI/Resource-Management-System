import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResources } from '@/hooks/useResources';
import { useAuth } from '@/hooks/useAuth';
import type { Resource, CreateResourceData, UpdateResourceData } from '@/types/resource';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Resources',
        href: '#',
    },
];

export default function Resources() {
    const { resources, loading, error, createResource, updateResource, deleteResource } = useResources();
    const { canEdit, canDelete } = useAuth();
    
    console.log('Resources page rendering');
    console.log('Resources page - canEdit:', canEdit, 'canDelete:', canDelete);
    console.log('Resources:', resources);
    console.log('Loading:', loading);
    console.log('Error:', error);
    
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        status: 'Available',
        quantity: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantity' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        setSuccessMessage(null);

        try {
            if (editingId) {
                await updateResource(editingId, formData as UpdateResourceData);
                setSuccessMessage('Resource updated successfully!');
            } else {
                await createResource(formData as CreateResourceData);
                setSuccessMessage('Resource created successfully!');
            }
            
            setShowForm(false);
            setEditingId(null);
            setFormData({ name: '', type: '', status: 'Available', quantity: 0 });
            
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            setFormError(err instanceof Error ? err.message : 'Failed to save resource');
        }
    };

    const handleEdit = (resource: Resource) => {
        setEditingId(resource.id);
        setFormData({
            name: resource.name,
            type: resource.type || '',
            status: resource.status || 'Available',
            quantity: resource.quantity || 0,
        });
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this resource?')) return;
        
        try {
            await deleteResource(id);
            setSuccessMessage('Resource deleted successfully!');
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            setFormError(err instanceof Error ? err.message : 'Failed to delete resource');
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingId(null);
        setFormData({ name: '', type: '', status: 'Available', quantity: 0 });
        setFormError(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Resources" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Resources</h1>
                        <p className="mt-1 text-slate-600 dark:text-slate-400">Manage your organizational resources</p>
                    </div>
                    {canEdit && (
                        <Button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Add Resource
                        </Button>
                    )}
                </div>

                {successMessage && (
                    <div className="rounded-lg bg-green-50 p-4 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
                        {successMessage}
                    </div>
                )}

                {showForm && (
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                            {editingId ? 'Edit Resource' : 'Create New Resource'}
                        </h2>
                        
                        {formError && (
                            <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                                {formError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Resource Name *</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter resource name"
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                                <div>
                                    <Label htmlFor="type">Type</Label>
                                    <Input
                                        id="type"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        placeholder="e.g., Equipment"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="status">Status</Label>
                                    <select title='status' id="status" name="status" value={formData.status} onChange={handleChange} className="flex h-9 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white">
                                        <option value="Available">Available</option>
                                        <option value="In Use">In Use</option>
                                        <option value="Maintenance">Maintenance</option>
                                        <option value="Reserved">Reserved</option>
                                    </select>
                                </div>

                                <div>
                                    <Label htmlFor="quantity">Quantity</Label>
                                    <Input
                                        id="quantity"
                                        name="quantity"
                                        type="number"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    {loading ? 'Saving...' : editingId ? 'Update Resource' : 'Create Resource'}
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-700"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {error && (
                    <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                        {error}
                    </div>
                )}

                {loading && !showForm && (
                    <div className="text-center text-slate-600 dark:text-slate-400">Loading resources...</div>
                )}

                {!loading && resources.length === 0 && (
                    <div className="rounded-xl border border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-800">
                        <p className="text-slate-600 dark:text-slate-400">No resources found. Create one to get started.</p>
                    </div>
                )}

                {!loading && resources.length > 0 && (
                    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-700">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Type</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Quantity</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resources.map((resource) => (
                                    <tr key={resource.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                        <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">{resource.name}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{resource.type || 'N/A'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                                resource.status === 'Available' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                                                resource.status === 'In Use' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' :
                                                resource.status === 'Maintenance' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                                                'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                                            }`}>
                                                {resource.status || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{resource.quantity || 0}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                {canEdit && (
                                                    <Button
                                                        onClick={() => handleEdit(resource)}
                                                        className="bg-blue-600 px-3 py-1 text-xs hover:bg-blue-700"
                                                    >
                                                        Edit
                                                    </Button>
                                                )}
                                                {canDelete && (
                                                    <Button
                                                        onClick={() => handleDelete(resource.id)}
                                                        className="bg-red-600 px-3 py-1 text-xs hover:bg-red-700"
                                                    >
                                                        Delete
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
