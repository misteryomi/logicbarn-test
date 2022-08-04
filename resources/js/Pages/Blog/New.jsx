import Button from '@/Components/Button';
import Error from '@/Components/Error';
import Input from '@/Components/Input';
import TextEditor from '@/Components/TextEditor';
import Dashboard from '@/Layouts/Dashboard';
import { getEventValue } from '@/Utils/helpers';
import { useForm } from '@inertiajs/inertia-react'

export default function New(props) {
  const { isEdit, blog } = props;

  const { data, setData, post, patch, processing, errors } = useForm({
    title: isEdit ? blog.title : '',
    details: isEdit ? blog.details : '',
  })

  const handleChange = (event, field = null, value = null) => {
    let _data = data;

    if(field) {
      _data[field] = value ?? getEventValue(event);
    } else {
      _data[event.target.name] = value ?? getEventValue(event);
    }
  
    setData(_data);    
  };    

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
        patch(route('blogs.update', {blog}), data)
    } else {
        post(route('blogs.store'), data)
    }
  }
  
  return (
    <Dashboard
        title={isEdit ? "Edit Blog Post: " + blog.title : "New Blog Post"}
    >
      <form action="#" onSubmit={handleSubmit} method="POST">
      {Object.keys(errors).length > 0  && <Error errors={errors} />}

          <Input required defaultValue={data.title} name="title" placeholder="Title" handleChange={handleChange} className="w-full text-lg" />

          <div className="my-4">
              <TextEditor name="details" defaultValue={data.details} handleChange={(value) => handleChange(null, 'details', value)} />
          </div>

          <Button type="submit" processing={processing}>Submit</Button>
      </form>
    </Dashboard>
  )
}
