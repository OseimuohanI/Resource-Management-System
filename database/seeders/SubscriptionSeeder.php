<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Subscription;
use Illuminate\Database\Seeder;

class SubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create subscriptions for existing users
        User::all()->each(function (User $user) {
            Subscription::firstOrCreate(
                ['user_id' => $user->id],
                [
                    'plan' => 'free',
                    'status' => 'active',
                    'trial_ends_at' => now()->addDays(14),
                ]
            );
        });
    }
}
