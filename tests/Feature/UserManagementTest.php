<?php

namespace Tests\Feature;

use App\Models\Company;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_can_add_user_within_limit()
    {
        $company = Company::create([
            'name' => 'User Limit Co',
            'slug' => 'user-limit-co',
        ]);

        $manager = User::create([
            'name' => 'Manager User',
            'email' => 'manager-userlimit@example.com',
            'password' => bcrypt('password'),
            'role' => 'manager',
            'company_id' => $company->id,
        ]);

        $company->update(['owner_id' => $manager->id]);

        Subscription::create([
            'company_id' => $company->id,
            'user_id' => $manager->id,
            'plan' => 'professional',
            'status' => 'active',
        ]);

        $this->actingAs($manager);

        $response = $this->postJson('/api/company/users', [
            'name' => 'Team Member',
            'email' => 'teammember@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'role' => 'user',
        ]);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'email' => 'teammember@example.com',
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'teammember@example.com',
            'company_id' => $company->id,
        ]);
    }

    public function test_manager_cannot_add_user_over_limit()
    {
        $company = Company::create([
            'name' => 'Free Plan Co',
            'slug' => 'free-plan-co',
        ]);

        $manager = User::create([
            'name' => 'Manager User',
            'email' => 'manager-freeplan@example.com',
            'password' => bcrypt('password'),
            'role' => 'manager',
            'company_id' => $company->id,
        ]);

        Subscription::create([
            'company_id' => $company->id,
            'user_id' => $manager->id,
            'plan' => 'free',
            'status' => 'active',
        ]);

        $this->actingAs($manager);

        $response = $this->postJson('/api/company/users', [
            'name' => 'Another User',
            'email' => 'another@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'role' => 'user',
        ]);

        $response->assertStatus(403);

        $this->assertDatabaseMissing('users', [
            'email' => 'another@example.com',
        ]);
    }
}
