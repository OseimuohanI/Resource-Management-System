<?php

namespace Tests\Feature;

use App\Models\Company;
use App\Models\Resource;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class ResourceManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_resource_within_limit()
    {
        // Setup: Create Company, User, Subscription (Free: limit 50)
        $company = Company::create(['name' => 'Test Co', 'slug' => 'test-co']);
        $user = User::factory()->create([
            'company_id' => $company->id,
            'role' => 'manager'
        ]);
        $company->update(['owner_id' => $user->id]);
        
        Subscription::create([
            'company_id' => $company->id,
            'plan' => 'free',
            'status' => 'active'
        ]);

        $this->actingAs($user);

        $response = $this->postJson('/api/resources', [
            'name' => 'Test Resource',
            'type' => 'Hardware',
            'status' => 'Available',
            'quantity' => 10
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('resources', [
            'name' => 'Test Resource',
            'company_id' => $company->id
        ]);
    }

    public function test_user_cannot_create_resource_over_limit()
    {
        // Setup: Create Company, User, Subscription (Free: limit 50)
        $company = Company::create(['name' => 'Test Co', 'slug' => 'test-co']);
        $user = User::factory()->create([
            'company_id' => $company->id,
            'role' => 'manager'
        ]);
        
        Subscription::create([
            'company_id' => $company->id,
            'plan' => 'free',
            'status' => 'active'
        ]);

        // Create 50 resources
        Resource::factory()->count(50)->create([
            'company_id' => $company->id
        ]);

        $this->actingAs($user);

        $response = $this->postJson('/api/resources', [
            'name' => 'Over Limit Resource',
            'type' => 'Hardware',
            'status' => 'Available',
            'quantity' => 1
        ]);

        $response->assertStatus(403);
        $this->assertDatabaseMissing('resources', [
            'name' => 'Over Limit Resource'
        ]);
    }

    public function test_resources_are_isolated_by_company()
    {
        // Company A
        $companyA = Company::create(['name' => 'Company A', 'slug' => 'company-a']);
        $userA = User::factory()->create(['company_id' => $companyA->id]);
        $resourceA = Resource::create([
            'company_id' => $companyA->id,
            'name' => 'Resource A',
            'slug' => 'resource-a',
            'type' => 'Type A',
            'status' => 'Available',
            'quantity' => 1
        ]);

        // Company B
        $companyB = Company::create(['name' => 'Company B', 'slug' => 'company-b']);
        $userB = User::factory()->create(['company_id' => $companyB->id]);
        $resourceB = Resource::create([
            'company_id' => $companyB->id,
            'name' => 'Resource B',
            'slug' => 'resource-b',
            'type' => 'Type B',
            'status' => 'Available',
            'quantity' => 1
        ]);

        // Act as User A
        $this->actingAs($userA);
        $responseA = $this->getJson('/api/resources');
        
        $responseA->assertStatus(200)
            ->assertJsonFragment(['name' => 'Resource A'])
            ->assertJsonMissing(['name' => 'Resource B']);

        // Act as User B
        $this->actingAs($userB);
        $responseB = $this->getJson('/api/resources');
        
        $responseB->assertStatus(200)
            ->assertJsonFragment(['name' => 'Resource B'])
            ->assertJsonMissing(['name' => 'Resource A']);
    }
}
