import Button from '@/Components/Button';
import Error from '@/Components/Error';
import Input from '@/Components/Input';
import Dashboard from '@/Layouts/Dashboard';
import { formatDate } from '@/Utils/helpers';
import { CalendarIcon, UserIcon } from '@heroicons/react/solid'
import { Link, useForm } from '@inertiajs/inertia-react';
import Import from './Import';

export default function List({ blogs }) {

  const { data, setData, post, patch, processing, errors, setError } = useForm({
    file: null,
  })

  const handleUpload = (e) => {
    setData({
        file: e.target.files[0]
    })
  }

  const handleImport = (e) => {
    e.preventDefault();

    post(route('blogs.import'), data);

  }

  return (
    <Dashboard
        title="Blog Posts"
    >
    {Object.keys(errors).length > 0  && <Error errors={errors} />}
    <div className="sm:flex sm:items-center justify-end">

        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link
                href={route('blogs.new')}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
            Add Blog Post
            </Link>
            <Import handleErrors={setError}/>
        </div>
    </div>

    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-2">
      <ul role="list" className="divide-y divide-gray-200">
        {blogs.length > 0 ?
            blogs.map((blog, index) => {
                return (
                    <li key={index}>
                        <a href={route('blogs.show', {blog})} className="block hover:bg-gray-50">
                        <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-green-600 truncate">{blog.title}</p>
                            <div className="ml-2 flex-shrink-0 flex">
                                <Link href={route('blogs.edit', {blog})} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Edit
                                </Link>
                            </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                                <p className="flex items-center text-sm text-gray-500">
                                <UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                {blog.user?.name}
                                </p>        
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <p>
                                Created on <time dateTime={blog.application_deadline}>{formatDate(blog.created_at)}</time>
                                </p>
                            </div>
                            </div>
                        </div>
                        </a>
                    </li>    
                )
            })
        :
            <p className="p-4">No record found</p>    
        }
      </ul>
    </div>
    </Dashboard>
  )
}
