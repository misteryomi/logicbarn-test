import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, usePage } from '@inertiajs/inertia-react';
import List from '../Pages/Blog/List';

export default function Dashboard({title, children}) {

    const { auth, errors } = usePage().props;

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={title && <h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>}
        >
            <Head title={title ?? 'Welcome'} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-2">
                        {children}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
