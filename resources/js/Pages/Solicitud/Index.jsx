import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index(props) {

    const {data,setData,post,reset,progress} = useForm({
        id:'',
        nombres:'',
        apellido_paterno:'',
        apellido_materno:'',
        correo:'',
        celular:'',
        dni:'',
        archivo_dni:null,
        codigo_estudiante:'',
        problema:'',
        detalles:'',
    })

    const submit = (e) => {
        e.preventDefault();
        post(route('solicitud.store'), { onSuccess: () => {reset()} });
    };

    function validarCorreo(text){
        if(text.slice(-12) != '@uncp.edu.pe'){
            return(
                <p className='text-red-500 font-bold text-sm'>
                    El correo debe terminar con "@uncp.edu.pe".
                </p>
            )
        }
        return(
            <p className='text-green-500 font-bold text-sm'>
                Correcto.
            </p>
        )
    }

    return (
        <div className="w-[100vw] h-[100vh] bg-[#a2c7f4] flex justify-center sm:items-center">
            <Head title='Formulario para correo electrónico'>
            </Head>
            <div className='max-w-6xl w-full sm:h-5/6 flex flex-col sm:flex-row sm:pr-6'>
                <div className='sm:w-1/2 sm:pl-6 sm:py-6 min-h-[300px] overflow-hidden'>
                    <div className='h-full relative shadow-lg shadow-blue-900 rounded-l-md overflow-hidden'>
                        <img src="/img/uncp.jpg" alt="" className='object-cover w-full h-full object-center z-50'/>
                        <div className='w-full h-full absolute top-0 bg-blue-900/60 backdrop-blur-sm p-12 flex flex-col justify-end text-white'>
                            <h1 className='text-4xl font-bold'>
                                Soporte para Correo Institucional - UNCP
                            </h1>
                            <p>
                                Rellena el formulario con los datos necesarios para ayudarte
                            </p>
                        </div>
                    </div>
                </div>
                <div className='sm:w-1/2 bg-white p-4 rounded-md shadow-md shadow-blue-500 max-h-[80vh]'>
                    <h1 className='uppercase font-bold text-xl text-center text-blue-800 h-[28px]'>
                        Rellena el formulario
                    </h1>
                    <form action="" className='flex flex-col max-w-[650px] z-50 overflow-y-scroll overflow-hidden max-h-[70vh]'>
                            <div className='w-full px-1 py-1'>
                                <InputLabel value={'Apellido Paterno'}></InputLabel>
                                <TextInput
                                    value={data.apellido_paterno}
                                    onChange={e=>setData('apellido_paterno',e.target.value)}
                                    className='w-full h-8 !rounded-full px-4 border-blue-200'>
                                </TextInput>
                                <InputError message={props.errors.apellido_paterno}></InputError>
                            </div>
                            <div className='w-full px-1 py-1'>
                                <InputLabel value={'Apellido Materno'}></InputLabel>
                                <TextInput
                                    value={data.apellido_materno}
                                    onChange={e=>setData('apellido_materno',e.target.value)}
                                    className='w-full h-8 !rounded-full px-4 border-blue-200'>
                                </TextInput>
                                <InputError message={props.errors.apellido_materno}></InputError>
                            </div>
                            <div className='w-full px-1 py-1'>
                                <InputLabel value={'Nombres'}></InputLabel>
                                <TextInput
                                    value={data.nombres}
                                    onChange={e=>setData('nombres',e.target.value)}
                                    className='w-full h-8 !rounded-full px-4 border-blue-200'>
                                </TextInput>
                                <InputError message={props.errors.nombres}></InputError>
                            </div>
                            <div className='w-full px-1 py-1'>
                                <InputLabel value={'Correo Electrónico'}></InputLabel>
                                <TextInput
                                    value={data.correo}
                                    onChange={e=>setData('correo',e.target.value)}
                                    className='w-full h-8 !rounded-full px-4 border-blue-200'>
                                </TextInput>
                                {
                                    validarCorreo(data.correo)
                                }
                                <InputError message={props.errors.codigo_estudiante}></InputError>
                            </div>
                            <div className='w-full px-1 py-1'>
                                <InputLabel value={'Código de Estudiante'}></InputLabel>
                                <TextInput
                                    value={data.codigo_estudiante}
                                    onChange={e=>setData('codigo_estudiante',e.target.value)}
                                    className='w-full h-8 !rounded-full px-4 border-blue-200'>

                                </TextInput>
                                <InputError message={props.errors.codigo_estudiante}></InputError>
                            </div>

                            <div className='w-full px-1 py-1'>
                                <InputLabel value={'Número de Celular'}></InputLabel>
                                <TextInput
                                    value={data.celular}
                                    onChange={e=>setData('celular',e.target.value)}
                                    className='w-full h-8 !rounded-full px-4 border-blue-200'>
                                </TextInput>
                                <InputError message={props.errors.celular}></InputError>
                            </div>
                            <div className='w-full px-1 py-1'>
                                <InputLabel value={'Número de DNI'}></InputLabel>
                                <TextInput
                                    value={data.dni}
                                    onChange={e=>setData('dni',e.target.value)}
                                    className='w-full h-8 !rounded-full px-4 border-blue-200'>

                                </TextInput>
                                <InputError message={props.errors.dni}></InputError>
                            </div>
                            <div className='w-full px-1 py-1'>
                                <InputLabel value={'Foto de DNI o de Carnet'}></InputLabel>
                                <TextInput
                                    onChange={e=>setData('archivo_dni',e.target.files[0])}
                                    className='w-full h-8 block text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-800 hover:file:bg-violet-100'
                                    type={'file'}
                                >
                                </TextInput>
                                <InputError message={props.errors.archivo_dni}></InputError>
                            </div>
                            <div className='w-full px-1 py-1'>
                                <InputLabel value={'Tipo de Problema'}></InputLabel>
                                <select
                                    onChange={e=>setData('problema',e.target.value)}
                                    className='w-full h-8 !rounded-full px-4 py-1 border-blue-200'>
                                    <option disabled selected>Seleccione el tipo de problema</option>
                                    <option>Restablecimiento de Contraseña ADESA</option>
                                    <option>Restablecimiento de Contraseña Correo Electrónico</option>
                                    <option>Configuración de Autenticador</option>
                                    <option>Actualización de Número de Verificación</option>
                                    <option>Otro</option>
                                </select>
                                <InputError message={props.errors.problema}></InputError>
                            </div>
                            <div className='w-full px-1 py-1'>
                                <InputLabel value={'Detalle su problema (Opcional)'}></InputLabel>

                                <TextInput
                                    value={data.detalles}
                                    onChange={e=>setData('detalles',e.target.value)}
                                    className='w-full h-8 !rounded-full px-4 border-blue-200'>

                                </TextInput>
                                <InputError message={props.errors.detalles}></InputError>
                            </div>
                            <div className='w-full px-1 py-2 flex justify-center items-center'>
                                <button
                                    onClick={submit}
                                    className='p-1 px-6 rounded-full bg-blue-800 text-white font-bold'>
                                    Enviar Solicitud
                                </button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
