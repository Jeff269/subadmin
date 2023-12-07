<?php

namespace App\Http\Controllers;

use App\Models\Solicitud;
use App\Models\User;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard(){
        return Inertia::render('Admin/Dashboard',[
            'pendientes' => Solicitud::where('atendido',0)->count()
        ]);
    }

    public function restore(){

        $solicitudes = Solicitud::where('atendido','0')->get();
        return Inertia::render('Admin/Restore',[
            'solicitudes' => $solicitudes,
            'url_path' => env('AWS_SUBDOMAIN_NAME'),
        ]);
    }

    public function restored(){

        $solicitudes = Solicitud::where('atendido','1')->get();

        return Inertia::render('Admin/Restore',[
            'solicitudes' => $solicitudes,
            'url_path' => env('AWS_SUBDOMAIN_NAME'),
        ]);
    }

    public function users(){
        return Inertia::render('Admin/Users',[
            'users' => User::get(),
        ]);
    }

    public function createUser(Request $request){
        User::create([
            'name' => $request->nombres,
            'email' => $request->correo,
            'password' => bcrypt('rand'),
        ]);

        return redirect()->back();
    }

    public function deleteUser(Request $request){
        $user = User::find($request->id);
        $user->delete();
        return redirect()->back();
    }


    public function correo(){
        $to = 'oti01@uncp.edu.pe';
        $subject = 'Asunto del Correo';
        $body = 'Contenido del mensaje';

        try{
            Mail::send([], [], function ($message) use ($to, $subject, $body) {
                $message->to($to)
                        ->subject($subject)
                        ->setBody($body, 'text/plain'); // Puedes usar 'text/plain' para texto plano
            });
        }catch(Error $e){
            return $e;
        }

        return 'Correo enviado con éxito.';
    }
}
