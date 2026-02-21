import { useAuth } from '@/hooks/useAuth';
import { useResources } from '@/hooks/useResources';
import { Button } from '@/components/ui/button';

export default function ResourceManagementExample() {
    const { user, canCreate, canEdit, canDelete } = useAuth();
    const { resources, deleteResource } = useResources();

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this resource?')) {
            try {
                await deleteResource(id);
                alert('Resource deleted successfully');
            } catch {
                alert('Failed to delete resource');
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Resources</h1>
                {canCreate && (
                    <Button className="bg-green-600 hover:bg-green-700">
                        Create Resource
                    </Button>
                )}
            </div>

            <div className="rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
                {resources.map((resource) => (
                    <div
                        key={resource.id}
                        className="flex items-center justify-between border-b border-slate-200 p-4 last:border-0 dark:border-slate-700"
                    >
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                {resource.name}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Type: {resource.type} | Status: {resource.status} | Qty: {resource.quantity}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {canEdit && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-green-600"
                                >
                                    Edit
                                </Button>
                            )}
                            {canDelete && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600"
                                    onClick={() => handleDelete(resource.id)}
                                >
                                    Delete
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-sm text-slate-600 dark:text-slate-400">
                Logged in as: {user?.name} ({user?.role})
            </div>
        </div>
    );
}
