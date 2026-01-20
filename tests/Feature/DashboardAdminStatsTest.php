<?php

namespace Tests\Feature;

use App\Models\Company;
use App\Models\Resource;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardAdminStatsTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_sees_global_resource_stats_and_recent_resources()
    {
        $companyA = Company::create(['name' => 'Acme', 'slug' => 'acme']);
        $companyB = Company::create(['name' => 'Orbit', 'slug' => 'orbit']);

        Resource::create([
            'company_id' => $companyA->id,
            'slug' => 'acme-server',
            'name' => 'Acme Server',
            'type' => 'Hardware',
            'status' => 'Available',
            'quantity' => 10,
        ]);

        Resource::create([
            'company_id' => $companyB->id,
            'slug' => 'orbit-db',
            'name' => 'Orbit DB',
            'type' => 'Database',
            'status' => 'In Use',
            'quantity' => 1,
        ]);

        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin-dashboard@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'company_id' => null,
        ]);

        $this->actingAs($admin)
            ->get(route('dashboard'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('dashboard')
                ->where('stats.totalResources', 2)
                ->has('recentResources', 2)
                ->where('resourcesByType.Hardware', 1)
                ->where('resourcesByStatus', function ($map) {
                    return ($map['Available'] ?? 0) === 1 && ($map['In Use'] ?? 0) === 1;
                })
            );
    }
}
