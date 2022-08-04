import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import BlogItem from '@/Components/BlogItem';
import NavBar from '@/Components/NavBar';
import GridList from './Blog/GridList';

export default function Welcome(props) {
    const { blogs } = props;

    return (
        <>
            <NavBar />
            <div className="py-12">
                <Head title="Welcome" />
                    
                <GridList blogs={blogs} />
            </div>
        </>
    );
}
