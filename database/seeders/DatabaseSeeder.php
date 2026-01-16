<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Resource;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->createSystemAdmins();

        $companies = [
            [
                'name' => 'Acme Free',
                'slug' => 'acme-free',
                'plan' => 'free',
                'user_count' => 1,
                'resource_count' => 10,
            ],
            [
                'name' => 'Orbit Professional',
                'slug' => 'orbit-professional',
                'plan' => 'professional',
                'user_count' => 4,
                'resource_count' => 40,
            ],
            [
                'name' => 'Nova Enterprise',
                'slug' => 'nova-enterprise',
                'plan' => 'enterprise',
                'user_count' => 8,
                'resource_count' => 80,
            ],
        ];

        foreach ($companies as $config) {
            $this->seedCompanyWithData(
                $config['name'],
                $config['slug'],
                $config['plan'],
                $config['user_count'],
                $config['resource_count']
            );
        }
    }

    protected function createSystemAdmins(): void
    {
        $adminEmails = [
            'admin@resourcems.test',
            'admin@resourcems.com',
        ];

        foreach ($adminEmails as $email) {
            User::firstOrCreate(
                ['email' => $email],
                [
                    'name' => 'System Admin',
                    'password' => Hash::make('password'),
                    'role' => 'admin',
                    'company_id' => null,
                ]
            );
        }
    }

    protected function seedCompanyWithData(
        string $name,
        string $slug,
        string $plan,
        int $userCount,
        int $resourceCount
    ): void {
        $company = Company::create([
            'name' => $name,
            'slug' => $slug,
        ]);

        $manager = User::create([
            'name' => $name . ' Manager',
            'email' => 'manager+' . $slug . '@example.com',
            'password' => Hash::make('password'),
            'role' => 'manager',
            'company_id' => $company->id,
        ]);

        $company->update(['owner_id' => $manager->id]);

        Subscription::create([
            'company_id' => $company->id,
            'user_id' => $manager->id,
            'plan' => $plan,
            'status' => 'active',
            'trial_ends_at' => now()->addDays(14),
        ]);

        for ($i = 1; $i < $userCount; $i++) {
            User::create([
                'name' => $name . ' User ' . $i,
                'email' => 'user' . $i . '+' . $slug . '@example.com',
                'password' => Hash::make('password'),
                'role' => 'user',
                'company_id' => $company->id,
            ]);
        }

        $resourceTypes = ['Hardware', 'Software', 'Human', 'Room', 'Vehicle', 'Furniture', 'Equipment'];
        $statuses = ['Available', 'In Use', 'Maintenance', 'Reserved'];
        $baseNames = [
            'Conference Room',
            'Projector',
            'Laptop',
            'Desktop',
            'Company Van',
            'Delivery Truck',
            'Office Desk',
            'Ergonomic Chair',
            'Whiteboard',
            'Microphone Set',
            'Training Room',
        ];

        for ($i = 1; $i <= $resourceCount; $i++) {
            $baseName = fake()->randomElement($baseNames);
            $nameWithIndex = $baseName . ' ' . $i;

            Resource::create([
                'company_id' => $company->id,
                'name' => $nameWithIndex,
                'slug' => Str::slug($slug . '-' . $nameWithIndex),
                'type' => fake()->randomElement($resourceTypes),
                'status' => fake()->randomElement($statuses),
                'quantity' => fake()->numberBetween(1, 10),
            ]);
        }
    }
}
