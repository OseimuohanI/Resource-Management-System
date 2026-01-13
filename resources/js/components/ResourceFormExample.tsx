import { useState } from 'react';
import { useResources } from '@/hooks/useResources';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResourceFormExample() {
    const { createResource, loading, error } = useResources();
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        status: '',
        quantity: 0,
    });
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(false);
        
        try {
            await createResource(formData);
            setSuccess(true);
            // Reset form
            setFormData({
                name: '',
                type: '',
                status: '',
                quantity: 0,
            });
        } catch (err) {
            // Error is already handled by the hook
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantity' ? Number(value) : value,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Resource Name</Label>
                <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter resource name"
                />
            </div>

            <div>
                <Label htmlFor="type">Type</Label>
                <Input
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    placeholder="Enter resource type"
                />
            </div>

            <div>
                <Label htmlFor="status">Status</Label>
                <Input
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    placeholder="Enter status"
                />
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
                    placeholder="Enter quantity"
                />
            </div>

            {error && (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}

            {success && (
                <div className="rounded-lg bg-green-50 p-4 text-sm text-green-600">
                    Resource created successfully!
                </div>
            )}

            <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
            >
                {loading ? 'Creating...' : 'Create Resource'}
            </Button>
        </form>
    );
}
