import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Dashboard(props) {


    const {data,setData,post,reset,progress} = useForm({
        id:'',
        nombres:'',
        correo:'',
    })

    const submitCreate = () => {
        post(route('user.create'), { onSuccess: () => {reset();setShowCreate(false)} });
    };

    const submitDelete = () => {
        post(route('user.delete'), { onSuccess: () => {reset();setShowDelete(false)} });
    };

    const [showCreate,setShowCreate] = useState(false);
    const [showDelete,setShowDelete] = useState(false);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">USUARIOS ADMINISTRADORES</h2>}
        >
            <Head title="USUARIOS ADMINISTRADORES" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className='w-full flex justify-end'>
                                <SecondaryButton
                                    onClick={(e)=>{
                                        setShowCreate(true)

                                    }}
                                >
                                    Registrar un nuevo Administrador
                                </SecondaryButton>
                            </div>
                            <table className='w-full mt-6'>
                                <thead>
                                    <tr className='border-b-2 border-blue-800 uppercase font-bold text-blue-900'>
                                        <th>N°</th>
                                        <th>Apellidos y Nombres</th>
                                        <th>Correo</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.users.map((user,index) =>
                                            <tr key={user.id}>
                                                <th>
                                                    {index+1}
                                                </th>
                                                <th className='uppercase'>
                                                    {user.name}
                                                </th>
                                                <th>
                                                    {user.email}
                                                </th>
                                                <th>
                                                    <SecondaryButton
                                                        onClick={(e)=>{
                                                            e.preventDefault();
                                                            setData({
                                                                'id': user.id,
                                                                'nombres': user.name,
                                                            })
                                                            setShowDelete(true)
                                                        }}
                                                    >
                                                        Eliminar
                                                    </SecondaryButton>
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

            <Modal show={showCreate}>
                <div className='w-full flex justify-between border-b-2 bg-gray-100'>
                    <div className='p-2 uppercase font-bold text-center w-11/12 text-green-800'>
                        Registrar un nuevo Administrador
                    </div>
                    <button className='m-0 h-full p-2 w-1/12 bg-red-600 text-white font-bold'
                        onClick={(e)=>{
                            setShowCreate(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <form action="">
                    <div className='w-full'>
                        <div className='flex w-full my-2'>
                            <InputLabel className='w-[250px] text-right px-6'>
                                Nombres
                            </InputLabel>
                            <TextInput className='w-full h-6'
                                value={data.nombres}
                                onChange={(e)=>{
                                    e.preventDefault();
                                    setData('nombres',e.target.value)
                                }}
                            >
                            </TextInput>
                        </div>
                        <div className='flex w-full my-2'>
                            <InputLabel className='w-[250px] text-right px-6'>
                                Correo
                            </InputLabel>
                            <TextInput className='w-full h-6' type={'email'}
                                value={data.correo}
                                onChange={(e)=>{
                                    e.preventDefault();
                                    setData('correo',e.target.value)
                                }}
                            >
                            </TextInput>
                        </div>
                    </div>
                    <div className='p-2 bt-2 w-full bg-gray-100 flex justify-end'>
                        <SecondaryButton
                            className='!text-white !bg-green-600 mx-2'
                            onClick={(e)=>{
                                e.preventDefault();
                                submitCreate()
                            }}
                            type='submit'
                        >
                            Registrar
                        </SecondaryButton>
                        <SecondaryButton
                            onClick={(e)=>{
                                setShowCreate(false);
                            }}
                        >
                            Cancelar
                        </SecondaryButton>
                    </div>
                </form>
            </Modal>
            <Modal show={showDelete}>
                <div className='w-full flex justify-between border-b-2 bg-gray-100'>
                    <div className='p-2 uppercase font-bold text-center w-11/12 text-green-800'>
                        Eliminar un Administrador
                    </div>
                    <button className='m-0 h-full p-2 w-1/12 bg-red-600 text-white font-bold'
                        onClick={(e)=>{
                            setShowDelete(false);
                        }}
                    >
                        X
                    </button>
                </div>

                <div className='flex justify-center px-4 flex-col items-center'>
                    <p className='text-red-600'>
                        ¿Seguro que quiere eliminar a este administrador?
                    </p>
                    <h3>
                        {data.nombres}
                    </h3>
                </div>
                <div className='p-2 bt-2 w-full bg-gray-100 flex justify-end'>
                    <SecondaryButton
                        className='!text-white !bg-green-600 mx-2'
                        onClick={(e)=>{
                            e.preventDefault();
                            submitDelete()
                        }}
                        type='submit'
                    >
                        Eliminar
                    </SecondaryButton>
                    <SecondaryButton
                        onClick={(e)=>{
                            setShowDelete(false);
                        }}
                    >
                        Cancelar
                    </SecondaryButton>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
