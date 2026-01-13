<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        $stats = [
            'totalResources' => Resource::count(),
            'availableResources' => Resource::where('status', 'Available')->count(),
            'inUseResources' => Resource::where('status', 'In Use')->count(),
            'maintenanceResources' => Resource::where('status', 'Maintenance')->count(),
        ];

        $recentResources = Resource::orderBy('created_at', 'desc')->take(5)->get();

        $resourcesByType = Resource::selectRaw('type, COUNT(*) as count')
            ->groupBy('type')
            ->get()
            ->pluck('count', 'type');

        $resourcesByStatus = Resource::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get()
            ->pluck('count', 'status');

        $data = [
            'stats' => $stats,
            'recentResources' => $recentResources,
            'resourcesByType' => $resourcesByType,
            'resourcesByStatus' => $resourcesByStatus,
        ];

        if ($user->isAdmin()) {
            $data['totalUsers'] = User::count();
            $data['adminCount'] = User::where('role', 'admin')->count();
            $data['managerCount'] = User::where('role', 'manager')->count();
            $data['userCount'] = User::where('role', 'user')->count();
        }

        return Inertia::render('dashboard', $data);
    }
}
