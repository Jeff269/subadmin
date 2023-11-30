<?php

namespace App\Http\Controllers;

use App\Models\Solicitud;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard(){
        return Inertia::render('Admin/Dashboard',[

        ]);
    }

    public function restore(){

        $solicitudes = Solicitud::where('atendido','0')->get();

        return Inertia::render('Admin/Restore',[
            'solicitudes' => $solicitudes,
            'url_path' => env('AWS_SUBDOMAIN_NAME'),
        ]);
    }

    public function users(){
        return Inertia::render('Admin/Users',[

        ]);
    }
}
