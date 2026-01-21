<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Resource extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'slug',
        'name',
        'type',
        'status',
        'quantity'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function usageHistory(): HasMany
    {
        return $this->hasMany(ResourceUsage::class)->latest();
    }
}
