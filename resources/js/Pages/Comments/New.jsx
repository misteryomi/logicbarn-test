import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import TextEditor from '@/Components/TextEditor';
import { getEventValue } from '@/Utils/helpers';
import { useForm } from '@inertiajs/inertia-react'
import Error from '@/Components/Error';

export default function Comment(props) {

  const { blog } = props;

  const { data, setData, post, processing, errors } = useForm({
    guest_name: '',
    guest_email: '',
    comment: '',
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

    post(route('comments.store', {blog}), data);
  }
  
  return (
    <>
      <h3 className="font-semibold text-xl text-gray-800 leading-tight mb-2">Add New Comment</h3>

      <form action="#" onSubmit={handleSubmit} method="POST" className="space-y-3 bg-white shadow p-4 rounded-md">
        {Object.keys(errors).length > 0  && <Error errors={errors} />}

          <Input required defaultValue={data.guest_name} name="guest_name" placeholder="Name" handleChange={handleChange} className="w-full" />

          <Input required defaultValue={data.guest_email} name="guest_email" placeholder="Email Address" handleChange={handleChange} className="w-full" />

          <div className="my-4">
              <Label className="font-bold mb-2" value="Comment" />
              <TextEditor name="details" defaultValue={data.comment} handleChange={(value) => handleChange(null, 'comment', value)} />
          </div>

          <Button type="submit" processing={processing}>Submit</Button>
      </form>
    </>
  )
}
