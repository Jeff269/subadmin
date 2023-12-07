import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">INICIO</h2>}
        >
            <Head title="INICIO" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 text-xl">¡Bienvenido!</div>
                        <div className='w-full bg-blue-900 p-6 text-white text-center uppercase text-xl'>
                            Tienes {props.pendientes} solicitudes por atender
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
