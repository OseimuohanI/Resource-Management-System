<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\AuthController;
// use App\Http\Middleware\CheckRole;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Protected resource routes (require Sanctum auth)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/resources', [ResourceController::class, 'index']);
    Route::get('/resources/{id}', [ResourceController::class, 'show']);
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware(['auth:sanctum'])->group(function () {
    
    Route::get('/company/users', [AuthController::class, 'listCompanyUsers'])->middleware('role:manager,admin');
    Route::post('/company/users', [AuthController::class, 'registerCompanyUser'])->middleware('role:manager,admin');
    
    Route::post('/resources', [ResourceController::class, 'store'])->middleware('role:manager,admin');
    Route::put('/resources/{id}', [ResourceController::class, 'update'])->middleware('role:manager,admin');
    Route::patch('/resources/{id}', [ResourceController::class, 'update'])->middleware('role:manager,admin');
    
    Route::delete('/resources/{id}', [ResourceController::class, 'destroy'])->middleware('role:admin');
});
