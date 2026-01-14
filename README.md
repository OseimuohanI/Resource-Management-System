# Resource Management API - Frontend Integration Guide

## Backend Implementation ✅

The backend is fully implemented with:

### API Endpoints (All protected by Sanctum authentication)

- **GET** `/api/resources` - Get all resources with filters
- **POST** `/api/resources` - Create a new resource
- **GET** `/api/resources/{id}` - Get a specific resource
- **PUT/PATCH** `/api/resources/{id}` - Update a resource
- **DELETE** `/api/resources/{id}` - Delete a resource

### Validation Rules

**Creating a resource:**
```php
name: required|string|max:255
type: nullable|string|max:255
status: nullable|string|max:255
quantity: nullable|integer|min:0
resourceid: nullable|exists:managers,id
```

**Features:**
- Auto-generates unique slugs from names
- Filtering by status, type, search query
- Sorting by any field
- Proper error handling
- JSON responses

---

## Frontend Integration

### 1. Import the hook and types

```tsx
import { useResources } from '@/hooks/useResources';
import type { CreateResourceData } from '@/types/resource';
```

### 2. Use in your component

```tsx
function MyResourcePage() {
    const { 
        resources, 
        loading, 
        error, 
        createResource, 
        updateResource, 
        deleteResource,
        refetch 
    } = useResources();

    // Display resources
    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}
            
            {resources.map(resource => (
                <div key={resource.id}>
                    <h3>{resource.name}</h3>
                    <p>Type: {resource.type}</p>
                    <p>Quantity: {resource.quantity}</p>
                </div>
            ))}
        </div>
    );
}
```

### 3. Create a resource

```tsx
const handleCreate = async () => {
    try {
        const newResource = await createResource({
            name: 'New Resource',
            type: 'Equipment',
            status: 'Available',
            quantity: 10
        });
        console.log('Created:', newResource);
    } catch (err) {
        // Error already handled in hook
    }
};
```

### 4. Update a resource

```tsx
const handleUpdate = async (id: number) => {
    try {
        await updateResource(id, {
            quantity: 20,
            status: 'In Use'
        });
    } catch (err) {
        // Error handled
    }
};
```

### 5. Delete a resource

```tsx
const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
        try {
            await deleteResource(id);
        } catch (err) {
            // Error handled
        }
    }
};
```

### 6. Filter resources

```tsx
const { resources } = useResources({
    status: 'Available',
    type: 'Equipment',
    search: 'computer',
    sort_by: 'name',
    sort_order: 'asc'
});
```

---

## Required Frontend Fields

When building forms, you need these fields:

### Required:
- **name** (string) - Resource name

### Optional:
- **type** (string) - Resource type (e.g., "Equipment", "Vehicle", "Room")
- **status** (string) - Current status (e.g., "Available", "In Use", "Maintenance")
- **quantity** (number) - Available quantity (integer, min 0)
- **resourceid** (number) - Manager ID (foreign key to managers table)

**Note:** `slug` is auto-generated from `name`, no need to send it

---

## Example Component Usage

See `resources/js/components/ResourceFormExample.tsx` for a complete working example.

---

## Error Handling

The hook automatically handles errors and sets them in the `error` state. Errors are user-friendly messages extracted from Laravel validation responses.

---

## Authentication

All API endpoints require authentication via Laravel Sanctum. Make sure the user is logged in before making requests.
