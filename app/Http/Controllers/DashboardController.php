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
        $isAdmin = $user->isAdmin();
        $companyId = $user->company_id;

        $resourceQuery = $isAdmin ? Resource::query() : Resource::where('company_id', $companyId);

        $stats = [
            'totalResources' => $resourceQuery->count(),
            'availableResources' => (clone $resourceQuery)->where('status', 'Available')->count(),
            'inUseResources' => (clone $resourceQuery)->where('status', 'In Use')->count(),
            'maintenanceResources' => (clone $resourceQuery)->where('status', 'Maintenance')->count(),
        ];

        $recentResources = (clone $resourceQuery)->orderBy('created_at', 'desc')->take(5)->get();

        $typeQuery = $isAdmin ? Resource::query() : Resource::where('company_id', $companyId);
        $resourcesByType = $typeQuery->selectRaw('type, COUNT(*) as count')
            ->groupBy('type')
            ->get()
            ->pluck('count', 'type');

        $statusQuery = $isAdmin ? Resource::query() : Resource::where('company_id', $companyId);
        $resourcesByStatus = $statusQuery->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get()
            ->pluck('count', 'status');

        $data = [
            'stats' => $stats,
            'recentResources' => $recentResources,
            'resourcesByType' => $resourcesByType,
            'resourcesByStatus' => $resourcesByStatus,
        ];

        if ($isAdmin) {
            $data['totalUsers'] = User::count();
            $data['adminCount'] = User::where('role', 'admin')->count();
            $data['managerCount'] = User::where('role', 'manager')->count();
            $data['userCount'] = User::where('role', 'user')->count();
        }

        return Inertia::render('dashboard', $data);
    }
}
