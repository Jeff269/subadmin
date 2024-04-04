import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
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

        if(result.displayName && result.mail){
            setValidarData(validarData => ({
                ...validarData,
                existe:true,
                office_id:result.id,
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

    async function resetPassword(correo) {
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
        id:'',
        nombres:'',
        correo:'',
        celular:'',
        codigo:'',
        problema:'',
        detalles:'',
        fecha:'',
        dni:'',
        dni_url:'',
        existe: null,
        nueva_contraseña:null,
        error_contraseña:null,
        office_id:null,
        office_data:{
            nombre: '',
            correo: '',
        }
    })

    const [validarModal,setValidarModal] = useState(false)
    const [updatePhone,setUpdatePhone] = useState(false)
    const [updateAdesa,setUpdateAdesa] = useState(false)


    const {data,setData,post,reset} = useForm({
        id:'',
    })

    const submit = (e) => {
        post(route('solicitud.update',data.id), {onSuccess: () => {
            reset();
            setValidarModal(false);
            setValidarData({
                nombres:'',
                correo:'',
                celular:'',
                codigo:'',
                fecha:'',
                dni:'',
                dni_url:'',
                existe: null,
                nueva_contraseña:null,
                office_data:{
                    nombre: '',
                    correo: '',
                }
            });
        } });
    };

    function formatDate(date){
        let d = new Date(date)
        return (d.toLocaleString())
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <div className='flex justify-between'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight uppercase">
                        {
                            window.location.pathname == '/restored' &&(
                                'Solicitudes Atendidas'
                            )
                        }
                        {
                            window.location.pathname == '/restore' &&(
                                'Solicitudes por Atender'
                            )
                        }
                    </h2>
                    {
                        window.location.pathname == '/restored' &&(
                            <Link
                                href='/restore'
                            >
                                <SecondaryButton>
                                    Ver Solicitudes por Atender
                                </SecondaryButton>
                            </Link>
                        )
                    }
                    {
                        window.location.pathname == '/restore' &&(
                            <Link
                                href='/restored'
                            >
                                <SecondaryButton>
                                    Ver Solicitudes Atendidas
                                </SecondaryButton>
                            </Link>
                        )
                    }
                </div>
            }
        >
            <Head title="Solicitudes" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className='w-full'>
                                <thead>
                                    <tr className='border-b-2 border-blue-800 uppercase font-bold text-blue-900'>
                                        <th className='w-1/12'>N°</th>
                                        <th className='w-3/12'>Estudiante</th>
                                        <th className='w-3/12'>Correo Electrónico</th>
                                        <th className='w-2/12'>Problema</th>
                                        <th className='w-2/12'>Fecha y Hora</th>
                                        <th className='w-1/12'>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.solicitudes.data.map((soli,index)=>
                                            <tr key={index} className='border-b hover:bg-slate-100'>
                                                <th>{props.solicitudes.per_page*(props.solicitudes.current_page-1)+ index+1}</th>
                                                <th className='uppercase'>{soli.ap_paterno+" "+soli.ap_materno+" "+soli.nombres}</th>
                                                <th>{soli.correo}</th>
                                                <th>{soli.problema}</th>
                                                <th>{formatDate(soli.created_at)}</th>
                                                <th>
                                                    <button className='border px-2 rounded-md m-1 border-blue-700'
                                                        onClick={(e)=>{setValidarData(validarData => ({
                                                            ...validarData,
                                                            id:soli.id,
                                                            nombres: soli.ap_paterno+" "+soli.ap_materno+" "+soli.nombres,
                                                            correo: soli.correo,
                                                            celular: soli.celular,
                                                            problema: soli.problema,
                                                            detalles: soli.detalles,
                                                            fecha: formatDate(soli.created_at),
                                                            codigo: soli.cod_estudiante,
                                                            dni: soli.dni,
                                                            dni_url: soli.documento_url,
                                                        }));
                                                        setValidarModal(true);
                                                        setData('id',soli.id);
                                                        setUpdatePhone(false);
                                                        setUpdateAdesa(false);
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

                            <div className='flex justify-center p-4 w-full'>
                                {
                                    props.solicitudes.links.map((link,index)=>
                                        <Link key={index} className='w-8 border mx-1 text-center' href={link.url}>
                                            {
                                                link.label == "&laquo; Previous" && "<"
                                            }
                                            {
                                                link.label == "Next &raquo;" && ">"
                                            }
                                            {
                                                link.label != "&laquo; Previous" && link.label != "Next &raquo;" && (
                                                    link.label
                                                )
                                            }
                                        </Link>
                                    )
                                }
                            </div>
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
                                fecha:'',
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
                    {
                        validarData.dni_url &&
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
                    }


                    <div className='w-full flex border-b-2 pl-4'>
                        <p className='w-1/3 font-bold'>
                            Fecha
                        </p>
                        <p>
                            {validarData.fecha}
                        </p>
                    </div>

                    <h2 className='uppercase font-bold text-green-900 mt-4'>
                        Datos de Solicitud
                    </h2>
                    <div className='w-full flex border-b-2 pl-4'>
                        <p className='w-1/3 font-bold'>
                            Problema
                        </p>
                        <p className='w-2/3'>
                            {validarData.problema}
                        </p>
                    </div>
                    <div className='w-full flex border-b-2 pl-4'>
                        <p className='w-1/3 font-bold'>
                            Detalles
                        </p>
                        <p className='w-2/3'>
                            {validarData.detalles}
                        </p>
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
                                    navigator.clipboard.writeText(validarData.codigo);
                                    setUpdateAdesa(true)
                                    window.open('https://erpintranet.uncp.edu.pe/academico/alumnos')
                                }}
                                className='border border-blue-700 px-2 rounded-md bg-blue-50 text-blue-900 font-bold w-4/5 uppercase mt-2'
                                >
                                Actualizar Contraseña de ADESA
                            </button>
                        </div>
                        {
                            updateAdesa && (
                                <div className='flex items-center'>
                                    <button
                                        onClick={(e)=>{
                                            e.preventDefault();
                                            window.open(`https://api.whatsapp.com/send/?phone=+51${validarData.celular}&text=¡Buen día! 👋%0ATe saluda el Equipo de Soporte ADESA 💻. Queremos informarte que tu contraseña ha sido restablecida con éxito.%0AA continuación, te proporcionamos tus nuevos datos de acceso:%0A- 📧 Usuario: ${validarData.codigo.toUpperCase()}%0A- 🔑 Contraseña: ${validarData.dni}A%0ARecuerda que si tienes alguna pregunta o necesitas más asistencia, estamos aquí para ayudarte.%0A¡Que tengas un excelente día! 🌟👍🏻`)
                                        }}
                                        className='flex items-center border-blue-500 border-2 p-1 text-blue-900 rounded-md'
                                    >
                                        <PaperAirplaneIcon className='w-4 text-blue-600'/>
                                        Enviar por Whatsapp
                                    </button>
                                </div>
                            )
                        }
                        
                    </div>

                    <div className='w-full flex border-b-2 pl-4'>
                        <div className='w-1/3 p-1'>
                            <button
                                className='border border-orange-700 px-2 rounded-md bg-orange-50 text-orange-900 font-bold w-4/5 uppercase mt-2'
                                >
                                Configurar Autenticador
                            </button>
                        </div>
                        {
                            (
                                <div className='flex items-center'>
                                    <button
                                        onClick={(e)=>{
                                            e.preventDefault();
                                            window.open(`https://api.whatsapp.com/send/?phone=+51${validarData.celular}&text=¡Buen día! 👋%0ATe saluda el Equipo de Soporte de Correo 💻. Queremos informarte que para configurar tu autenticador tienes que realizar los pasos que indica el siguiente video: %0A ▶ https://youtu.be/uWG0O2O8jBY %0ARecuerda que si tienes alguna pregunta o necesitas más asistencia, estamos aquí para ayudarte.%0A¡Que tengas un excelente día! 🌟👍🏻`)
                                        }}
                                        className='flex items-center border-orange-500 border-2 p-1 text-orange-900 rounded-md'
                                    >
                                        <PaperAirplaneIcon className='w-4 text-orange-600'/>
                                        Enviar por Whatsapp
                                    </button>
                                </div>
                            )
                        }
                        
                    </div>


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
                            {
                                validarData.existe == false && (
                                <button
                                        onClick={(e)=>{
                                            e.preventDefault();
                                            window.open(`https://api.whatsapp.com/send/?phone=+51${validarData.celular}&text=Buen día 👋,%0ALamentablemente, no hemos podido localizar tu correo institucional en nuestro sistema 😞🥲. Por favor, asegúrate de que has digitado el correo institucional correctamente e intenta nuevamente.%0ASi sigues teniendo dificultades para recuperar tu cuenta, por favor contáctanos directamente para que podamos asistirte de manera personalizada.%0AGracias por tu comprensión y quedamos a tu disposición para cualquier otra consulta.%0ASaludos cordiales,%0AEquipo de Soporte Correo`)
                                        }}
                                        className='flex border-green-500 border-2 p-1 text-green-900 rounded-md'
                                    >
                                        <PaperAirplaneIcon className='w-4 text-green-600'/>
                                        Enviar por Whatsapp
                                    </button>
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
                                            navigator.clipboard.writeText(validarData.celular);
                                            setUpdatePhone(true)
                                            window.open('https://entra.microsoft.com/#view/Microsoft_AAD_UsersAndTenants/UserProfileMenuBlade/~/UserAuthMethods/userId/'+validarData.office_id+'/hidePreviewBanner~/true?Microsoft_AAD_IAM_legacyAADRedirect=true')
                                        }}
                                        className='border border-green-700 px-2 rounded-md bg-green-50 text-green-900 font-bold w-4/5 uppercase mt-2'
                                        >
                                        Actualizar número
                                    </button>
                                </div>
                                {
                                    updatePhone && (
                                        <div className='flex items-center'>
                                            <button
                                                onClick={(e)=>{
                                                    e.preventDefault();
                                                    window.open(`https://api.whatsapp.com/send/?phone=+51${validarData.celular}&text=¡Buen día! 👋%0ASomos el Equipo de Soporte Correo 💻.%0AQueremos informarte que hemos recibido tu solicitud para modificar tu número de celular asociado a tu cuenta de correo institucional.%0AA continuación, te proporcionamos tu número de celular actualizado: ${validarData.celular} %0ASi necesitas más asistencia o tienes alguna pregunta adicional, no dudes en contactarnos. ¡Gracias y que tengas un excelente día! 👍🏻🙂`)
                                                }}
                                                className='flex items-center border-green-500 border-2 p-1 text-green-900 rounded-md'
                                            >
                                                <PaperAirplaneIcon className='w-4 text-green-600'/>
                                                Enviar por Whatsapp
                                            </button>
                                        </div>
                                    )
                                }
                                
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
                                            resetPassword(validarData.correo)
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
                                            window.open(`https://api.whatsapp.com/send/?phone=+51${validarData.celular}&text=¡Buen día! 👋%0ATe saluda el Equipo de Soporte Correo 💻. Queremos informarte que tu contraseña ha sido restablecida con éxito.%0AA continuación, te proporcionamos tus nuevos datos de acceso:%0A- 📧 Correo: ${validarData.correo}%0A- 🔑 Contraseña: ${validarData.nueva_contraseña}%0ARecuerda que si tienes alguna pregunta o necesitas más asistencia, estamos aquí para ayudarte.%0A¡Que tengas un excelente día! 🌟👍🏻`)
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
                        className='!text-white !bg-green-600 mx-2'
                        onClick={(e)=>{
                            e.preventDefault()
                            submit()
                        }}
                    >
                        Finalizar
                    </SecondaryButton>
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
