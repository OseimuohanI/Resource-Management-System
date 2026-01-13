<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ResourceController extends Controller
{
    public function index(Request $request)
    {
        $query = Resource::query();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        return response()->json([
            'success' => true,
            'data' => $query->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:255',
            'quantity' => 'nullable|integer|min:0',
            'resourceid' => 'nullable|exists:managers,id',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $originalSlug = $validated['slug'];
        $count = 1;
        while (Resource::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = $originalSlug . '-' . $count;
            $count++;
        }

        $resource = Resource::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Resource created successfully',
            'data' => $resource,
        ], 201);
    }

    public function show(string $id)
    {
        $resource = Resource::find($id);

        if (!$resource) {
            return response()->json([
                'success' => false,
                'message' => 'Resource not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $resource,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $resource = Resource::find($id);

        if (!$resource) {
            return response()->json([
                'success' => false,
                'message' => 'Resource not found',
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'type' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:255',
            'quantity' => 'nullable|integer|min:0',
            'resourceid' => 'nullable|exists:managers,id',
        ]);

        if (isset($validated['name']) && $validated['name'] !== $resource->name) {
            $validated['slug'] = Str::slug($validated['name']);
            
            $originalSlug = $validated['slug'];
            $count = 1;
            while (Resource::where('slug', $validated['slug'])->where('id', '!=', $id)->exists()) {
                $validated['slug'] = $originalSlug . '-' . $count;
                $count++;
            }
        }

        $resource->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Resource updated successfully',
            'data' => $resource,
        ]);
    }

    public function destroy(string $id)
    {
        $resource = Resource::find($id);

        if (!$resource) {
            return response()->json([
                'success' => false,
                'message' => 'Resource not found',
            ], 404);
        }

        $resource->delete();

        return response()->json([
            'success' => true,
            'message' => 'Resource deleted successfully',
        ]);
    }
}
