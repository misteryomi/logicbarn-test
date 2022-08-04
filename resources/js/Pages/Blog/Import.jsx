import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Dashboard from '@/Layouts/Dashboard';
import { formatDate } from '@/Utils/helpers';
import { CalendarIcon, UserIcon } from '@heroicons/react/solid'
import { Link, useForm } from '@inertiajs/inertia-react';
import { useEffect } from 'react';

export default function Import({ blogs, handleErrors }) {

  const { data, setData, post, processing, errors } = useForm({
    file: null,
  })


  useEffect(() => {
    handleErrors(errors);
  }, [errors])

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
    <form className="inline-flex items-center justify-center ml-2" onSubmit={handleImport}>
        <Input type="file" handleChange={handleUpload} required accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"  />
        <Button
            onClick={handleUpload}
            processing={processing}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
        Import Bulk
        </Button>                    
    </form>
  )
}
