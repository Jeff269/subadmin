import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index(props) {

    return (
        <div className="w-[100vw] h-[100vh] sm:bg-[#a2c7f4] flex justify-center sm:items-center">
            <Head title='Formulario para correo electrónico'>
            </Head>
            <div className='max-w-6xl w-full sm:h-5/6 flex flex-col sm:flex-row sm:pr-6'>
                <div className='sm:w-1/2 sm:pl-6 sm:py-6 min-h-[300px] overflow-hidden'>
                    <div className='h-full relative sm:shadow-lg sm:shadow-blue-900 rounded-l-md overflow-hidden'>
                        <img src="/img/uncp.jpg" alt="" className='object-cover w-full h-full object-center z-50'/>
                        <div className='w-full h-full absolute top-0 bg-blue-900/60 backdrop-blur-sm p-12 flex flex-col justify-end text-white'>
                            <h1 className='text-4xl font-bold'>
                                Soporte para Correo Institucional - UNCP
                            </h1>
                        </div>
                    </div>
                </div>
                <div className='sm:w-1/2 bg-white p-4 rounded-md sm:shadow-md sm:shadow-blue-500 flex flex-col items-center justify-center'>
                    <h2 className='uppercase text-[#cc2828] font-bold text-2xl text-center'>
                        ¡Su solicitud no se registró!
                    </h2>
                    <div className='my-4 w-[300px] h-[300px] rounded-full overflow-hidden border-[20px] border-[#cc2828]'>
                        <img src="/assets/error.gif" alt="" className='w-full h-full' />
                    </div>
                    <p className='px-24 text-center'>
                        Ya tiene una solicitud registrada actualmente, vuelva a intentarlo en 6 horas.
                    </p>
                </div>
            </div>
        </div>
    );
}
