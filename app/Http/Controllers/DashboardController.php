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
        $companyId = $user->company_id;

        $stats = [
            'totalResources' => Resource::where('company_id', $companyId)->count(),
            'availableResources' => Resource::where('company_id', $companyId)->where('status', 'Available')->count(),
            'inUseResources' => Resource::where('company_id', $companyId)->where('status', 'In Use')->count(),
            'maintenanceResources' => Resource::where('company_id', $companyId)->where('status', 'Maintenance')->count(),
        ];

        $recentResources = Resource::where('company_id', $companyId)->orderBy('created_at', 'desc')->take(5)->get();

        $resourcesByType = Resource::selectRaw('type, COUNT(*) as count')
            ->where('company_id', $companyId)
            ->groupBy('type')
            ->get()
            ->pluck('count', 'type');

        $resourcesByStatus = Resource::selectRaw('status, COUNT(*) as count')
            ->where('company_id', $companyId)
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
            $data['totalUsers'] = User::where('company_id', $companyId)->count();
            $data['adminCount'] = User::where('company_id', $companyId)->where('role', 'admin')->count();
            $data['managerCount'] = User::where('company_id', $companyId)->where('role', 'manager')->count();
            $data['userCount'] = User::where('company_id', $companyId)->where('role', 'user')->count();
        }

        return Inertia::render('dashboard', $data);
    }
}
