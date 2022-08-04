import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { usePage } from '@inertiajs/inertia-react';

export default function TextEditor({defaultValue, handleChange}) {

  const { tiny_mce_key } = usePage().props;
  
  const editorRef = useRef(null);

  return (
    <>
      <Editor
        onEditorChange={handleChange}
        apiKey={tiny_mce_key}
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={defaultValue}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </>
  );
}
