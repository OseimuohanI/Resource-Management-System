import { useState, useEffect } from 'react';
import { resourceApi, handleApiError } from '@/lib/api';
import type { Resource, CreateResourceData, UpdateResourceData, ResourceFilters } from '@/types/resource';

export function useResources(initialFilters?: ResourceFilters) {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchResources = async (filters?: ResourceFilters) => {
        setLoading(true);
        setError(null);
        try {
            const data = await resourceApi.getAll(filters || initialFilters);
            console.log('Resources fetched:', data);
            setResources(data);
        } catch (err) {
            console.error('Error fetching resources:', err);
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResources();
    }, []);

    const createResource = async (data: CreateResourceData) => {
        setLoading(true);
        setError(null);
        try {
            const newResource = await resourceApi.create(data);
            setResources(prev => [...prev, newResource]);
            return newResource;
        } catch (err) {
            const errorMsg = handleApiError(err);
            setError(errorMsg);
            throw new Error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const updateResource = async (id: number, data: UpdateResourceData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedResource = await resourceApi.update(id, data);
            setResources(prev =>
                prev.map(resource =>
                    resource.id === id ? updatedResource : resource
                )
            );
            return updatedResource;
        } catch (err) {
            const errorMsg = handleApiError(err);
            setError(errorMsg);
            throw new Error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const deleteResource = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            await resourceApi.delete(id);
            setResources(prev => prev.filter(resource => resource.id !== id));
        } catch (err) {
            const errorMsg = handleApiError(err);
            setError(errorMsg);
            throw new Error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const refetch = () => fetchResources();

    return {
        resources,
        loading,
        error,
        createResource,
        updateResource,
        deleteResource,
        refetch,
    };
}
