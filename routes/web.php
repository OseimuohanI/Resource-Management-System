<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\CheckSubscriptionAccess;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('pricing', function () {
    return Inertia::render('pricing');
})->name('pricing');

Route::get('faq', function () {
    return Inertia::render('faq');
})->name('faq');

Route::get('features', function () {
    return Inertia::render('features');
})->name('features');

Route::get('security', function () {
    return Inertia::render('security');
})->name('security');

Route::get('about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::get('blog', function () {
    return Inertia::render('blog');
})->name('blog');

Route::get('careers', function () {
    return Inertia::render('careers');
})->name('careers');

Route::get('privacy', function () {
    return Inertia::render('legal/privacy');
})->name('privacy');

Route::get('terms', function () {
    return Inertia::render('legal/terms');
})->name('terms');

Route::get('cookies', function () {
    return Inertia::render('legal/cookies');
})->name('cookies');

Route::get('sitemap', function () {
    return Inertia::render('sitemap');
})->name('sitemap');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('resources', function () {
        return Inertia::render('resources/index');
    })->middleware(CheckSubscriptionAccess::class)->name('resources.index');
    Route::get('team', function () {
        return Inertia::render('team/index');
    })->name('team.index');
    Route::get('company/users', [AuthController::class, 'listCompanyUsers'])
        ->name('company.users');
});

require __DIR__.'/settings.php';
