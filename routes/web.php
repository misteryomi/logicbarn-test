<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [BlogController::class, 'index'])->name('index');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [BlogController::class, 'list'])->name('dashboard');

        Route::resource('blogs', BlogController::class)->except('index');
        // Route::get('/new', [BlogController::class, 'new'])->name('new');
        // Route::post('/store', [BlogController::class, 'store'])->name('store');
        // Route::get('/{blog}', [BlogController::class, 'show'])->name('show');
        // Route::get('/{blog}/edit', [BlogController::class, 'edit'])->name('edit');
        // Route::patch('/{blog}/update', [BlogController::class, 'update'])->name('update');

        Route::post('/import', [BlogController::class, 'import'])->name('blogs.import');
    
    Route::prefix('comments')->name('comments.')->group(function() {
        Route::post('/{blog}/store', [CommentController::class, 'store'])->name('store');
    });

});

require __DIR__.'/auth.php';
