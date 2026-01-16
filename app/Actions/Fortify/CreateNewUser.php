<?php

namespace App\Actions\Fortify;

use App\Models\User;
use App\Models\Company;
use App\Models\Subscription;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'company_name' => ['nullable', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
            'plan' => ['nullable', 'string', 'in:free,professional,enterprise'],
        ])->validate();

        return DB::transaction(function () use ($input) {
            $plan = $input['plan'] ?? 'free';

            $companyName = $input['company_name'] ?? ($input['name'] . "'s Company");
            $baseSlug = Str::slug($companyName);
            $slug = $baseSlug;
            $count = 1;

            while (Company::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $count;
                $count++;
            }

            $company = Company::create([
                'name' => $companyName,
                'slug' => $slug,
            ]);

            $user = User::create([
                'name' => $input['name'],
                'email' => $input['email'],
                'password' => $input['password'],
                'company_id' => $company->id,
                'role' => 'manager',
            ]);

            $company->update(['owner_id' => $user->id]);

            Subscription::create([
                'company_id' => $company->id,
                'user_id' => $user->id,
                'plan' => $plan,
                'status' => 'active',
                'trial_ends_at' => now()->addDays(14),
            ]);

            $token = $user->createToken('myapptoken')->plainTextToken;

            $user->remember_token = $token;
            $user->save();

            return $user;
        });
    }
}
