<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SolicitudController;
use Illuminate\Foundation\Application;
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

Route::get('/error', function () {
    return 'error';
})->name('error');

Route::get('/signin', 'AuthController@signin')->name('signin');

Route::get('/',[SolicitudController::class,'index'])->name('solicitud.index');

Route::get('/error',[SolicitudController::class,'error'])->name('solicitud.error');

Route::get('/success',[SolicitudController::class,'success'])->name('solicitud.sucess');

Route::post('/formulario',[SolicitudController::class,'store'])->name('solicitud.store');

Route::get('/signout', 'AuthController@signout');
Route::get('/calendar', 'CalendarController@calendar');
Route::get('/calendar/new', 'CalendarController@getNewEventForm');
Route::post('/calendar/new', 'CalendarController@createNewEvent');

Route::get('/callback', 'AuthController@callback');

Route::middleware('ensureAuth')->group(function () {

    Route::get('/admin',[AdminController::class,'dashboard'])->name('dashboard');
    Route::get('/restore',[AdminController::class,'restore'])->name('restore.index');

    Route::get('/restored',[AdminController::class,'restored'])->name('restored.index');

    Route::get('/users',[AdminController::class,'users'])->name('users.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/userss', 'UsersController@index');

    Route::post('solicitud/update/{solicitud}',[SolicitudController::class,'updateState'])->name('solicitud.update');


    Route::post('create/user',[AdminController::class,'createUser'])->name('user.create');

    Route::post('delete/user',[AdminController::class,'deleteUser'])->name('user.delete');

    //API
    Route::get('call/{user}',[ApiController::class,'consulta']);
    Route::get('call/resetPassword/{user}',[ApiController::class,'reset']);
    Route::get('call/updateNumber/{user}',[ApiController::class,'updateNumber']);
});

require __DIR__.'/auth.php';
