import axios from 'axios';
import type {
    Resource,
    CreateResourceData,
    UpdateResourceData,
    ResourceFilters,
    ApiResponse,
} from '@/types/resource';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Function to set token
export function setAuthToken(token: string | null) {
    if (token) {
        localStorage.setItem('sanctum_token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        localStorage.removeItem('sanctum_token');
        delete axios.defaults.headers.common['Authorization'];
    }
}

// Check for Sanctum token in localStorage on load
const token = localStorage.getItem('sanctum_token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (csrfToken) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
}

const API_BASE = '/api';

export const resourceApi = {
    async getAll(filters?: ResourceFilters): Promise<Resource[]> {
        const params = new URLSearchParams();
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    params.append(key, String(value));
                }
            });
        }

        const response = await axios.get<ApiResponse<Resource[]>>(
            `${API_BASE}/resources?${params.toString()}`
        );
        return response.data.data || [];
    },

    async getById(id: number): Promise<Resource> {
        const response = await axios.get<ApiResponse<Resource>>(
            `${API_BASE}/resources/${id}`
        );
        if (!response.data.data) {
            throw new Error('Resource not found');
        }
        return response.data.data;
    },

    async create(data: CreateResourceData): Promise<Resource> {
        const response = await axios.post<ApiResponse<Resource>>(
            `${API_BASE}/resources`,
            data
        );
        if (!response.data.data) {
            throw new Error(response.data.message || 'Failed to create resource');
        }
        return response.data.data;
    },

    async update(id: number, data: UpdateResourceData): Promise<Resource> {
        const response = await axios.put<ApiResponse<Resource>>(
            `${API_BASE}/resources/${id}`,
            data
        );
        if (!response.data.data) {
            throw new Error(response.data.message || 'Failed to update resource');
        }
        return response.data.data;
    },

    async delete(id: number): Promise<void> {
        await axios.delete(`${API_BASE}/resources/${id}`);
    },
};

export const api = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
});

export function handleApiError(error: unknown): string {
    if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
            return error.response.data.message;
        }
        if (error.response?.data?.errors) {
            const errors = error.response.data.errors;
            const firstError = Object.values(errors)[0];
            if (Array.isArray(firstError)) {
                return firstError[0];
            }
        }
        return error.message;
    }
    return 'An unexpected error occurred';
}
