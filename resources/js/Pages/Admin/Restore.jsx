import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { CheckCircleIcon,XCircleIcon,PaperAirplaneIcon } from '@heroicons/react/24/solid'

export default function Restore(props) {

    async function apiquest(correo) {
      try {
        const response = await fetch(
          '/call/'+correo, {
          method: "GET", // or 'PUT'
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
          }
        });
        const result = await response.json();

        if(result.displayName && result.mail && result.mail == validarData.correo){
            setValidarData(validarData => ({
                ...validarData,
                existe:true,
                office_data:{
                    nombre: result.displayName,
                    correo: result.mail,
                }
            }))
        }else{
            setValidarData(validarData => ({
                ...validarData,
                existe:false,
            }))
        }
      } catch (error) {
        console.error("Error:", error);
        setValidarData(validarData => ({
            ...validarData,
            existe:false,
        }))
      }
    }

    async function reset(correo) {
        try {
          const response = await fetch(
            '/call/resetPassword/'+correo, {
            method: "GET", // or 'PUT'
            mode: 'cors',
            headers: {
              "Content-Type": "application/json",
            }
          });
          const result = await response.json();
          if(result.newPassword){
            setValidarData(validarData => ({
                ...validarData,
                nueva_contraseña: result.newPassword,
                error_contraseña: false
            }))
          }else{
            setValidarData(validarData => ({
                ...validarData,
                error_contraseña: true
            }))
          }
        } catch (error) {
          console.error("Error:", error);
          setValidarData(validarData => ({
            ...validarData,
            error_contraseña: true
        }))
        }
      }

    const [validarData,setValidarData] = useState({
        nombres:'',
        correo:'',
        celular:'',
        codigo:'',
        dni:'',
        dni_url:'',
        existe: null,
        nueva_contraseña:null,
        error_contraseña:null,
        office_data:{
            nombre: '',
            correo: '',
        }
    })

    const [validarModal,setValidarModal] = useState(false)

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Solicitudes de Soporte</h2>}
        >
            <Head title="Solicitudes" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className='w-full'>
                                <thead>
                                    <tr className='border-b'>
                                        <th>N°</th>
                                        <th>Estudiante</th>
                                        <th>Correo Electrónico</th>
                                        <th>Problema</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.solicitudes.map((soli,index)=>
                                            <tr key={index} className='border-b'>
                                                <th>{index+1}</th>
                                                <th>{soli.ap_paterno+" "+soli.ap_materno+" "+soli.nombres}</th>
                                                <th>{soli.correo}</th>
                                                <th>{soli.problema}</th>
                                                <th>
                                                    <button className='border px-2 rounded-md m-1'
                                                        onClick={(e)=>{setValidarData(validarData => ({
                                                            ...validarData,
                                                            nombres: soli.ap_paterno+" "+soli.ap_materno+" "+soli.nombres,
                                                            correo: soli.correo,
                                                            celular: soli.celular,
                                                            codigo: soli.cod_estudiante,
                                                            dni: soli.dni,
                                                            dni_url: soli.documento_url,
                                                        }));
                                                        setValidarModal(true)
                                                        }}
                                                    >
                                                        Atender
                                                    </button>
                                                </th>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={validarModal}>
                <div className='w-full flex justify-between border-b-2 bg-gray-100'>
                    <div className='p-2 uppercase font-bold text-center w-11/12 text-green-800'>
                        Validar Solicitud
                    </div>
                    <button className='m-0 h-full p-2 w-1/12 bg-red-600 text-white font-bold'
                        onClick={(e)=>{
                            setValidarModal(false);
                            setValidarData({
                                nombres:'',
                                correo:'',
                                celular:'',
                                codigo:'',
                                dni:'',
                                dni_url:'',
                                existe: null,
                                nueva_contraseña:null,
                                office_data:{
                                    nombre: '',
                                    correo: '',
                                }
                            })
                        }}
                    >
                        X
                    </button>
                </div>
                <div className='px-4 py-2'>
                    <h2 className='uppercase font-bold text-green-900'>
                        Datos del Estudiante
                    </h2>
                    <div className='w-full flex border-b-2 pl-4'>
                        <p className='w-1/3 font-bold'>
                            Apellidos y Nombres
                        </p>
                        <p>
                            {validarData.nombres}
                        </p>
                    </div>

                    <div className='w-full flex border-b-2 pl-4'>
                        <p className='w-1/3 font-bold'>
                            Correo Institucional
                        </p>
                        <p>
                            {validarData.correo}
                        </p>
                    </div>

                    <div className='w-full flex border-b-2 pl-4'>
                        <p className='w-1/3 font-bold'>
                            Número de Celular
                        </p>
                        <p>
                            {validarData.celular}
                        </p>
                    </div>

                    <div className='w-full flex border-b-2 pl-4'>
                        <p className='w-1/3 font-bold'>
                            Código de Estudiante
                        </p>
                        <p>
                            {validarData.codigo}
                        </p>
                    </div>

                    <div className='w-full flex border-b-2 pl-4'>
                        <p className='w-1/3 font-bold'>
                            Número de DNI
                        </p>
                        <p>
                            {validarData.dni}
                        </p>
                    </div>

                    <div className='w-full flex border-b-2 pl-4'>
                        <p className='w-1/3 font-bold'>
                            Foto de DNI o Carnet
                        </p>
                        <button
                            onClick={(e)=>{
                                e.preventDefault();
                                window.open(props.url_path+validarData.dni_url)
                            }}
                            className='border border-green-700 px-2 rounded-md bg-green-50 text-green-900 font-bold'
                        >
                            Abrir Archivo
                        </button>
                    </div>
                </div>
                <div className='px-4'>
                    <h2 className='text-green-900 uppercase font-bold'>
                        Acciones
                    </h2>

                    <div className='w-full flex border-b-2 pl-4'>
                        <div className='w-1/3 p-1'>
                            <button
                                onClick={(e)=>{
                                    e.preventDefault();
                                    apiquest(validarData.correo)
                                }}
                                className='border border-green-700 px-2 rounded-md bg-green-50 text-green-900 font-bold w-4/5 uppercase'
                            >
                                Validar si Existe el correo
                            </button>
                        </div>
                        <div className='px-4 flex items-center'>
                            {
                                validarData.existe == true && (
                                    <p className='flex border-green-500 border-2 p-1 text-green-900 rounded-md'>
                                        <CheckCircleIcon className='h-6 text-green-600'></CheckCircleIcon>
                                        Existe
                                    </p>
                                )
                            }
                            {
                                validarData.existe == false && (
                                    <p className='flex border-red-500 border-2 p-1 text-red-900 rounded-md'>
                                        <XCircleIcon className='h-6 text-red-600'/>
                                        No Existe
                                    </p>
                                )
                            }
                        </div>
                    </div>
                    {
                        validarData.existe == true && (
                            <div className='w-full flex border-b-2 pl-'>
                                <div className='w-1/3 p-1'>
                                <p>
                                    Nombre en Office 365
                                </p>
                                </div>
                                <div className='px-4 flex items-center'>
                                    {validarData.office_data.nombre}
                                </div>
                            </div>
                        )
                    }

                    {
                        validarData.existe == true && (
                            <div className='w-full flex border-b-2 pl-4'>
                                <div className='w-1/3 p-1'>
                                    <button
                                        onClick={(e)=>{
                                            e.preventDefault();
                                            reset(validarData.correo)
                                        }}
                                        className='border border-green-700 px-2 rounded-md bg-green-50 text-green-900 font-bold w-4/5 uppercase'
                                        >
                                        Restablecer Contraseña
                                    </button>
                                </div>
                                <div className='px-4 flex items-center'>
                                    {
                                        validarData.error_contraseña == false && (
                                            <p className='flex border-green-500 border-2 p-1 text-green-900 rounded-md'>
                                                <CheckCircleIcon className='h-6 text-green-600'></CheckCircleIcon>
                                                Correcto
                                            </p>
                                        )
                                    }
                                    {
                                        validarData.error_contraseña == true && (
                                            <p className='flex border-red-500 border-2 p-1 text-red-900 rounded-md'>
                                                <XCircleIcon className='h-6 text-red-600'/>
                                                Hubo un error
                                            </p>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }

                    {
                        validarData.error_contraseña == false && (
                            <div className='w-full flex border-b-2 pl-'>
                                <div className='w-1/3 p-1'>
                                <p>
                                    Nueva Contraseña
                                </p>
                                </div>
                                <div className='px-4 flex items-center justify-between w-2/3 py-1'>
                                    {validarData.nueva_contraseña}
                                    <button
                                        onClick={(e)=>{
                                            e.preventDefault();
                                            window.open("https://api.whatsapp.com/send/?phone=+51"+validarData.celular+"&text=Tu contraseña fue restablecida, tu correo es: "+validarData.correo+" y tu nueva contraseña es: "+validarData.nueva_contraseña)
                                        }}
                                        className='flex border-green-500 border-2 p-1 text-green-900 rounded-md'
                                    >
                                        <PaperAirplaneIcon className='w-4 text-green-600'/>
                                        Enviar por Whatsapp
                                    </button>
                                </div>
                            </div>
                        )
                    }

                </div>
                <div className='p-2 bt-2 w-full bg-gray-100 flex justify-end'>
                    <SecondaryButton
                        onClick={(e)=>{
                            setValidarModal(false);
                            setValidarData({
                                nombres:'',
                                correo:'',
                                celular:'',
                                codigo:'',
                                dni:'',
                                dni_url:'',
                                existe: null,
                                nueva_contraseña:null,
                                office_data:{
                                    nombre: '',
                                    correo: '',
                                }
                            })
                        }}
                    >
                        Cancelar
                    </SecondaryButton>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
