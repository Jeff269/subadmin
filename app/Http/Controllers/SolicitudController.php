<?php

namespace App\Http\Controllers;

use App\Models\Solicitud;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SolicitudController extends Controller
{
    public function index(){
        return Inertia::render('Solicitud/Index',[
        ]);
    }

    public function success(){
        return Inertia::render('Solicitud/Successful',[

        ]);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'nombres' => 'required',
            'apellido_paterno' => 'required',
            'apellido_materno' => 'required',
            'celular' => 'required|string|max:9|min:9|',
            'correo' => 'required',
            'dni' => 'required|string|max:8|min:8',
            'archivo_dni' => 'required|file',
            'codigo_estudiante' => 'required|string|max:11|min:11',
            'problema' => 'required',
        ]);

        if($request->hasFile('archivo_dni')){
            $file = $request->file('archivo_dni');
            $file_name = $file->hashName();
            $path = $file->storeAs(
                'DATA_SOLICITUDES',
                $file_name,
                's3'
            );

            $solicitud = Solicitud::create([
                'nombres' => $validated['nombres'],
                'ap_paterno' => $validated['apellido_paterno'],
                'ap_materno' => $validated['apellido_materno'],
                'correo' => $validated['correo'],
                'celular' => $validated['celular'],
                'dni' => $validated['dni'],
                'documento_url' => $path,
                'documento_hash' => $file_name,
                'cod_estudiante' => $validated['codigo_estudiante'],
                'problema' => $validated['problema'],
                'detalles' => $request['detalles'],
            ]);
        }

        return redirect()->route('solicitud.sucess');

    }
}


