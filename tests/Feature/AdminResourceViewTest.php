<?php

namespace Tests\Feature;

use App\Models\Company;
use App\Models\Resource;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminResourceViewTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_all_resources()
    {
        $companyA = Company::create(['name' => 'Acme', 'slug' => 'acme']);
        $companyB = Company::create(['name' => 'Orbit', 'slug' => 'orbit']);

        $resA = Resource::create([
            'company_id' => $companyA->id,
            'slug' => 'server-a',
            'name' => 'Server A',
            'type' => 'Hardware',
            'status' => 'Available',
            'quantity' => 5,
        ]);

        $resB = Resource::create([
            'company_id' => $companyB->id,
            'slug' => 'server-b',
            'name' => 'Server B',
            'type' => 'Hardware',
            'status' => 'In Use',
            'quantity' => 2,
        ]);

        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'company_id' => null,
        ]);

        $this->actingAs($admin);

        $response = $this->getJson('/api/resources');
        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertCount(2, $data);
        $this->assertEqualsCanonicalizing(
            [$resA->id, $resB->id],
            array_map(fn ($r) => $r['id'], $data)
        );
    }

    public function test_admin_can_view_single_resource_across_companies()
    {
        $company = Company::create(['name' => 'Nova', 'slug' => 'nova']);
        $resource = Resource::create([
            'company_id' => $company->id,
            'slug' => 'nova-db',
            'name' => 'Nova DB',
            'type' => 'Database',
            'status' => 'Available',
            'quantity' => 1,
        ]);

        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin2@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'company_id' => null,
        ]);

        $this->actingAs($admin);

        $response = $this->getJson('/api/resources/' . $resource->id);
        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'data' => [
                'id' => $resource->id,
                'name' => 'Nova DB',
            ],
        ]);
    }

    public function test_unauthenticated_requests_are_rejected()
    {
        $response = $this->getJson('/api/resources');
        $response->assertStatus(401);
    }
}
