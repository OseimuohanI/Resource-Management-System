export interface Resource {
    id: number;
    resourceid?: number | null;
    name: string;
    slug: string;
    type?: string | null;
    status?: string | null;
    quantity?: number | null;
    created_at: string;
    updated_at: string;
}

export interface CreateResourceData {
    name: string;
    type?: string;
    status?: string;
    quantity?: number;
    resourceid?: number;
}

export interface UpdateResourceData {
    name?: string;
    type?: string;
    status?: string;
    quantity?: number;
    resourceid?: number;
}

export interface ResourceFilters {
    status?: string;
    type?: string;
    search?: string;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}
