<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subscription extends Model
{
    protected $fillable = [
        'company_id',
        'user_id',
        'plan',
        'trial_ends_at',
        'billing_date',
        'status',
        'amount',
        'currency',
        'stripe_subscription_id',
        'stripe_customer_id',
        'cancelled_at',
        'ends_at',
    ];

    protected $casts = [
        'trial_ends_at' => 'datetime',
        'billing_date' => 'datetime',
        'cancelled_at' => 'datetime',
        'ends_at' => 'datetime',
    ];

    /**
     * Get the company that owns the subscription.
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get the user that owns the subscription.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if subscription is on trial
     */
    public function onTrial(): bool
    {
        return $this->trial_ends_at && now()->lessThanOrEqualTo($this->trial_ends_at);
    }

    /**
     * Check if subscription is active
     */
    public function isActive(): bool
    {
        return $this->status === 'active' && (!$this->ends_at || now()->lessThanOrEqualTo($this->ends_at));
    }

    /**
     * Check if user can access resources
     */
    public function canAccessResources(): bool
    {
        // Free tier users can access
        if ($this->plan === 'free') {
            return true;
        }

        // Paid users can access if active or on trial
        return $this->isActive() || $this->onTrial();
    }

    /**
     * Get resource limit based on plan
     */
    public function getResourceLimit(): int
    {
        return match($this->plan) {
            'free' => 50,
            'professional' => 500,
            'enterprise' => PHP_INT_MAX,
            default => 50,
        };
    }

    /**
     * Get user limit based on plan
     */
    public function getUserLimit(): int
    {
        return match($this->plan) {
            'free' => 1,
            'professional' => 5,
            'enterprise' => PHP_INT_MAX,
            default => 1,
        };
    }
}
