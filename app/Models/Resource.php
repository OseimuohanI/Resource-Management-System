<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
