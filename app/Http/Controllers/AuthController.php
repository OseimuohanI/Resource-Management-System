<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed',
            'role' => 'required|string'
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
            'role' => $fields['role'],
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        // store token on the user record and in session for Inertia frontend
        $user->remember_token = $token;
        $user->save();

        $request->session()->put('sanctum_token', $token);

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function login(Request $request) {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        //Check email
        $user = User::where('email', $fields['email'])->first();

        //Check Password
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Bad Credential'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        // store token on the user record and in session for Inertia frontend
        $user->remember_token = $token;
        $user->save();

        $request->session()->put('sanctum_token', $token);

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function logout(Request $request) {
        $request->user()->tokens()->delete();

        // clear sanctum token from session
        $request->session()->forget('sanctum_token');

        return [
            'message' => 'Logged Out'
        ];
    }

    public function listCompanyUsers(Request $request)
    {
        $authUser = $request->user();
        $company = $authUser->company;

        if ($authUser && $authUser->role === 'admin') {
            $users = User::select('id', 'name', 'email', 'role', 'created_at')
                ->orderBy('created_at')
                ->get();

            return response()->json([
                'users' => $users,
                'plan' => null,
                'user_limit' => null,
                'used_seats' => $users->count(),
                'remaining_seats' => null,
                'is_unlimited_seats' => true,
            ]);
        }

        if (!$company) {
            return response()->json([
                'message' => 'User must belong to a company to view members.',
            ], 403);
        }

        $users = $company->users()
            ->select('id', 'name', 'email', 'role', 'created_at')
            ->orderBy('created_at')
            ->get();

        $subscription = $company->subscription;
        $plan = $subscription?->plan ?? 'free';
        $userLimit = $subscription ? $subscription->getUserLimit() : 1;
        $usedSeats = $users->count();
        $isUnlimitedSeats = $userLimit === PHP_INT_MAX;
        $remainingSeats = $isUnlimitedSeats ? null : max($userLimit - $usedSeats, 0);

        return response()->json([
            'users' => $users,
            'plan' => $plan,
            'user_limit' => $userLimit,
            'used_seats' => $usedSeats,
            'remaining_seats' => $remainingSeats,
            'is_unlimited_seats' => $isUnlimitedSeats,
        ]);
    }

    public function registerCompanyUser(Request $request)
    {
        $authUser = $request->user();
        $company = $authUser->company;

        if (!$company) {
            return response()->json([
                'message' => 'User must belong to a company to add members.',
            ], 403);
        }

        $subscription = $company->subscription;

        if ($subscription) {
            $limit = $subscription->getUserLimit();
            $currentCount = $company->users()->count();

            if ($currentCount >= $limit) {
                return response()->json([
                    'message' => "User limit reached for your {$subscription->plan} plan. Please upgrade to add more users.",
                ], 403);
            }
        }

        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|confirmed',
            'role' => 'required|string|in:user,manager',
        ]);

        $newUser = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
            'role' => $fields['role'],
            'company_id' => $company->id,
        ]);

        return response()->json([
            'user' => $newUser,
        ], 201);
    }
}
