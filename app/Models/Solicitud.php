<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solicitud extends Model
{
    use HasFactory;

    protected $table = 'requests';
    protected $fillable = [
        'nombres',
        'ap_paterno',
        'ap_materno',
        'celular',
        'correo',
        'dni',
        'documento_url',
        'documento_hash',
        'cod_estudiante',
        'problema',
        'detalles',
        'atendido',
    ];

    protected $attributes = [
        'atendido' => 0,
        'detalles' => '',
    ];
}
